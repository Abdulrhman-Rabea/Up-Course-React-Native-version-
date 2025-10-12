import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import AboutScreen from '../screens/CoursesScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutUsScreen from "../screens/AboutUsScreen";
import WishlistScreen from "../screens/WishListScreen";
import ChatbotScreen from "../AdminDashboard/pages/chatbot";
import { Alert } from 'react-native';
import { logout } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
// import MyCourses from "../screens/Mycourses";


const Drawer = createDrawerNavigator();


function DrawerNavigator() {
  return (

      <Drawer.Navigator
      initialRouteName="Home"
      
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Courses" component={AboutScreen} />

      
      <Drawer.Screen name="Wishlist" component={WishlistScreen} />
      {/* <Drawer.Screen name="My Courses" component={MyCourses} /> */}
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Chatbot" component={ChatbotScreen} />

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



export {DrawerNavigator, CustomDrawerContent};