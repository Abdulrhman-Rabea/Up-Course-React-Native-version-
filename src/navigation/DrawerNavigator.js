import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import AboutScreen from '../screens/CoursesScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutUsScreen from "../screens/AboutUsScreen";
import ChatbotScreen from "../AdminDashboard/pages/chatbot";
import { Alert } from 'react-native';
import { logout } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MyCourses from "../screens/Mycourses";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../login/Login";
import Registration from "../Registration/Registration";
import HomeScreen from '../screens/HomeScreen';
import CourseStack from "./CourseStack";
import MyCoursesScreen from "../screens/MyCoursesScreen";


const Drawer = createDrawerNavigator();


function DrawerNavigator() {
  return (

    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Chatbot" component={ChatbotScreen} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Registration" component={Registration} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Courses" component={CourseStack} options={{ headerShown: true }} />
      <Drawer.Screen name="MyCourses" component={MyCoursesScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );

}

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogout = () => {
    Alert.alert(
      t("logout.confirm"),
      t("logout.message"),
      [
        {
          text: t("cancel"),
          style: "cancel"
        },
        {
          text: t("ok"),
          onPress: () => {
            logout()
              .then(() => {
                navigation.navigate("Login");
              })
              .catch((error) => {
                console.log(error);
              });

          }
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}



export { DrawerNavigator, CustomDrawerContent };