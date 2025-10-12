import { createDrawerNavigator } from "@react-navigation/drawer";


import AboutScreen from '../screens/CoursesScreen';
import HomeScreen from '../screens/HomeScreen';
import AdminPage from "../AdminDashboard/pages/Home";
import AddCoursePage from "../AdminDashboard/pages/AddPage";
import AboutUsScreen from "../screens/AboutUsScreen";
import WishlistScreen from "../screens/WishListScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (

    <Drawer.Navigator initialRouteName="Home">
      {/* <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Courses" component={AboutScreen} />
      <Drawer.Screen name="My Courses" component={AboutScreen} />
      <Drawer.Screen name="Wishlist" component={WishlistScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Contact" component={AboutScreen} />
    </Drawer.Navigator>
  );

}

function AdminNavigator(){
    return (
        <Drawer.Navigator initialRouteName="AdminDashboard" >
            <Drawer.Screen name="AdminDashboard" component={AdminPage}   />
            <Drawer.Screen name="AddPage" component={AddCoursePage} />
        </Drawer.Navigator>
    );
}


export {DrawerNavigator, AdminNavigator};