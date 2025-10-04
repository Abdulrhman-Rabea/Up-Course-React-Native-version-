import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

const HomeIcon = () => <Text>🏠</Text>;
const CoursesIcon = () => <Text>📚</Text>;
const StudentsIcon = () => <Text>👨‍🎓</Text>;
const SettingsIcon = () => <Text>⚙️</Text>;

export default function Sidebar() {
  const { t } = useTranslation();

  const navLinks = [
    { icon: <HomeIcon />, text: t("sidebar.home") },
    { icon: <CoursesIcon />, text: t("sidebar.courses"), active: true },
    { icon: <StudentsIcon />, text: t("sidebar.students") },
    { icon: <SettingsIcon />, text: t("sidebar.settings") },
  ];

  return (
    <View className="w-64 bg-white border-r border-gray-200 p-5">
      {/* Logo */}
      <View className="items-center justify-center mb-6">
        <Image
          source={require("../../assets/logo.png")}
          className="h-8 w-8 rounded-md"
          resizeMode="contain"
        />
      </View>

      {/* Links */}
      {navLinks.map((link) => (
        <TouchableOpacity
          key={link.text}
          className={`flex-row items-center p-3 rounded-lg mb-2 ${
            link.active
              ? "bg-orange-50 text-orange-500"
              : "text-gray-600"
          }`}
          onPress={() => console.log("Navigate to", link.text)}
        >
          <View className="mr-3">{link.icon}</View>
          <Text
            className={`${
              link.active ? "text-orange-500 font-bold" : "text-gray-600"
            }`}
          >
            {link.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
