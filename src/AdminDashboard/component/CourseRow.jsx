// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "../../lib/firebase";
// import { useTranslation } from "react-i18next";
// import { useNavigation } from "@react-navigation/native";

// const EditIcon = () => <Text>✏️</Text>;
// const DeleteIcon = () => <Text>🗑️</Text>;

// export default function CourseRow({ course, onDelete }) {
//   const { t } = useTranslation();
//   const navigation = useNavigation();

//   const handleDelete = async () => {
//     try {
//       const courseDocRef = doc(db, "courses", course.id);
//       await deleteDoc(courseDocRef);
//       onDelete(course.id);
//     } catch (error) {
//       console.error("Error removing document: ", error);
//     }
//   };

//   return (
//     <View className="flex-row items-center border-b border-gray-100 p-3">
//       {/* Image */}
//       <Image
//         source={{ uri: course.imageUrl }}
//         className="h-14 w-14 rounded-md mr-3"
//         resizeMode="cover"
//         onError={(e) => {
//           e.nativeEvent.target.style = { display: "none" };
//         }}
//       />

//       {/* Title + Description */}
//       <View className="flex-1">
//         <Text
//           className="text-gray-800 font-semibold"
//           numberOfLines={1}
//           ellipsizeMode="tail"
//         >
//           {course.title}
//         </Text>
//         <Text className="text-gray-600" numberOfLines={1}>
//           {course.description}
//         </Text>
//       </View>

//       {/* Price */}
//       <Text className="text-gray-700 font-medium mr-4">
//         {course.price} $
//       </Text>

//       {/* Actions */}
//       <View className="flex-row items-center gap-2">
//         {/* Edit Button */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate("EditCourse", { id: course.id })}
//           className="h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white"
//         >
//           <EditIcon />
//         </TouchableOpacity>

//         {/* Delete Button */}
//         <TouchableOpacity
//           onPress={handleDelete}
//           className="h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white"
//         >
//           <DeleteIcon />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }



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
            onPress={() => navigation.navigate("EditCourse", { id: course.id })}
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
