// import { View, Text } from "react-native";
// import { useTranslation } from "react-i18next";
// import PrimaryButton from "./Button"; // لازم تعمله NativeWind button component
// import { useNavigation } from "@react-navigation/native";

// export default function Header() {
//   const { t } = useTranslation();
//   const navigation = useNavigation();

//   return (
//     <View className="bg-white p-6 border-b border-gray-200">
//       <View className="flex-row justify-between items-center">
//         <Text className="text-2xl font-bold text-gray-800">
//           {t("header.title")}
//         </Text>

//         <PrimaryButton onPress={() => navigation.navigate("AddCourse")}>
//           {t("header.addNew")}
//         </PrimaryButton>
//       </View>
//     </View>
//   );
// }



import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Appbar.Header style={{ backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Appbar.Content title={t("header.title")} />
      <Appbar.Action icon="plus" onPress={() => navigation.navigate("AddPage")} accessibilityLabel={t("header.addNew")} />
    </Appbar.Header>
  );
}
