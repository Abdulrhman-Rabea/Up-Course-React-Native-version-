import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../login/Login";
import Registration from "../Registration/Registration";
import AdminPage from "../AdminDashboard/Home";
import AddCoursePage from "../AdminDashboard/AddPage";
// If you have a Courses screen, import it. Otherwise AdminPage can serve as placeholder.
import Courses from "../AdminDashboard/Home";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Registration" component={Registration} />
        <Drawer.Screen name="Courses" component={Courses} />
        <Drawer.Screen name="AdminPage" component={AdminPage} />
        <Drawer.Screen name="AddPage" component={AddCoursePage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
