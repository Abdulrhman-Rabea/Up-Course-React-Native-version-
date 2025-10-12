








































































    












    
    




























































import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import CourseRow from "./CourseRow";
import { useTheme } from "react-native-paper";

export default function CoursesTable() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole(null);
        setIsLoading(false);
        return;
      }
      setUser(currentUser);
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);
        setRole(snap.exists() ? snap.data().role || null : null);
      } catch (err) {
        console.error("Error fetching role:", err);
      } finally {
        setIsLoading(false);
      }
    });
    return () => unsub();
  }, []);

  
  useEffect(() => {
    if (!user) return;

    const coursesCollection = collection(db, "courses");
    let q;

    if (role === "admin") {
      q = query(
        coursesCollection,
        where("ownerUid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(coursesCollection, orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching courses in real-time: ", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [role, user]);

  const handleDeleteCourse = (idToDelete) => {
    setCourses((prev) => prev.filter((c) => c.id !== idToDelete));
  };

  if (isLoading) {
    return (
      <View className="center" style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>{t("myCourses.loading")}</Text>
      </View>
    );
  }

  if (courses.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={{ color: colors.onSurfaceDisabled }}>
          {t("coursesTable.empty")}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseRow course={item} onDelete={handleDeleteCourse} />
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
