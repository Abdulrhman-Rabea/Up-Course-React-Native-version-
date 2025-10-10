import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../login/Login";
import Registration from "../Registration/Registration";
import AdminPage from "../AdminDashboard/Home";
import AddCoursePage from "../AdminDashboard/AddPage";
import AboutScreen from '../screens/CoursesScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Login">
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Registration" component={Registration} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Courses" component={AboutScreen} />
      <Drawer.Screen name="My Courses" component={AboutScreen} />
      <Drawer.Screen name="Wishlist" component={AboutScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Contact" component={AboutScreen} />
    </Drawer.Navigator>
  );

}
