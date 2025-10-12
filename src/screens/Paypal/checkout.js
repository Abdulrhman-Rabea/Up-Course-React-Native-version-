import React, { useEffect, useCallback } from "react";
import { View, Alert, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";

// Firestore
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function PayPalCheckoutNoRedux() {
  const navigation = useNavigation();
  const route = useRoute();
  const { course } = route.params || {};

  const onPaymentSuccess = useCallback(async (details) => {
    const user = auth?.currentUser;
    if (!user?.uid) {
      Alert.alert("Login Required", "please login first");
      return;
    }

    try {
      const uid = user.uid;
      const ref = doc(db, "users", uid, "enrolledCourses", String(course?.id || "unknown"));

      await setDoc(ref, {
        courseId: course?.id,
        title: course?.title || "",
        imageUrl: course?.imageUrl || "",
        price: Number(course?.price || 0),
        paymentId:
          details?.id ||
          details?.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
          "N/A",
        payerName: details?.payer?.name?.given_name || "",
        payerEmail: details?.payer?.email_address || "",
        enrolledAt: serverTimestamp(), 
        status: "enrolled",
      }, { merge: true });

      Alert.alert("Payment Successful", `Couese added to My Courses`);
      navigation.navigate("My Courses") || navigation.goBack();
    } catch (e) {
      console.log(e);
      Alert.alert("Saved but…", "payment is success but not saved");
    }
  }, [course, navigation]);

  const onPaymentError = useCallback((message) => {
    Alert.alert("Payment Error", message || "Unknown error");
  }, []);

  const handleWebViewMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event?.nativeEvent?.data || "{}");
      if (data.status === "success") {
        onPaymentSuccess(data.details);
      } else if (data.status === "error") {
        onPaymentError(data.message);
      }
    } catch (err) {
      console.log("Error parsing message:", err);
    }
  }, [onPaymentSuccess, onPaymentError]);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const handler = (evt) => {
      try {
        const data = typeof evt.data === "string" ? JSON.parse(evt.data) : evt.data;
        if (data?.status === "success") onPaymentSuccess(data.details);
        else if (data?.status === "error") onPaymentError(data.message);
      } catch {}
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onPaymentSuccess, onPaymentError]);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <iframe
          width="100%"
          height="100%"
          src="https://mustafa1mohamed.github.io/hostedPage/"
          title="PayPal Checkout"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <WebView
          source={{ uri: "https://mustafa1mohamed.github.io/hostedPage/" }}
          onMessage={handleWebViewMessage}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          thirdPartyCookiesEnabled
          sharedCookiesEnabled
          renderLoading={() => (
            <ActivityIndicator size="large" style={{ flex: 1, alignSelf: "center" }} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#cd2323ff", flex: 1 },
});
