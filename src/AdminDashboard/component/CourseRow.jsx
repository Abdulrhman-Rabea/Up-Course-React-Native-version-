import React from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const themeColors = {
  primary: "#FF6F00", 
  secondary: "#F0F0F0", 
  text: "#333333", 
  textLight: "#FFFFFF", 
  border: "#DDDDDD", 
};

export default function CourseRow({ course, onDelete }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      const courseDocRef = doc(db, "courses", course.id);
      await deleteDoc(courseDocRef);
      onDelete(course.id);
    } catch (error) {
      Alert.alert(t("error"), error.message);
    }
  };

  const handleGoToCourse = () => {
    navigation.navigate("Edit", { courseId: course.id });
  };
  
  return (
    <View style={styles.card}>
     
      <ImageBackground
        source={{ uri: course.imageUrl || "https://via.placeholder.com/400x200" }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{course.price}$</Text>
        </View>
      </ImageBackground>

   
      <View style={styles.contentContainer}>
       
        {course.category && (
           <View style={styles.categoryContainer}>
             <Text style={styles.categoryText}>{course.category}</Text>
           </View>
        )}
       
     
        <Text style={styles.title}>{course.title}</Text>

        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGoToCourse}>
            <Text style={styles.primaryButtonText}>{t("coursesTable.Go to course")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleDelete}>
            <Text style={styles.secondaryButtonText}>{t("coursesTable.Remove")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden", 
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageBackground: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  priceContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  priceText: {
    color: themeColors.textLight,
    fontWeight: "bold",
    fontSize: 14,
  },
  contentContainer: {
    padding: 16,
  },
  categoryContainer: {
    backgroundColor: themeColors.secondary,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: themeColors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeColors.text,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: themeColors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1, 
    marginRight: 8,
  },
  primaryButtonText: {
    color: themeColors.textLight,
    fontWeight: "bold",
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: themeColors.textLight,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: themeColors.border,
    flex: 1, 
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: themeColors.text,
    fontWeight: "bold",
    fontSize: 14,
  },
});