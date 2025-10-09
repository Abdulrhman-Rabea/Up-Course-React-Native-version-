import React from 'react';
import { Alert } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

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

  return (
    <List.Item
      title={course.title}
      description={course.description}
      left={props => <List.Image {...props} source={{ uri: course.imageUrl || "https://via.placeholder.com/150" }} style={{ borderRadius: 6 }} />}
      right={() => (
        <>
          <IconButton
            icon="pencil"
            onPress={() => navigation.navigate("Edit", { courseId: course.id })}
            accessibilityLabel={t("edit")}
          />
          <IconButton
            icon="delete"
            onPress={handleDelete}
            accessibilityLabel={t("delete")}
          />
          <List.Subheader>{course.price} $</List.Subheader>
        </>
      )}
      style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}
    />
  );
}
