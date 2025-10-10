import { createNativeStackNavigator } from "@react-navigation/native-stack";


import AddCoursePage from "../AdminDashboard/AddPage";
import AdminPage from "../AdminDashboard/Home";
import Login from "../login/Login";
import Registration from "../Registration/Registration";
import HomeScreen from "../screens/HomeScreen";
import DrawerNavigator from "./DrawerNavigator";

function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />
      <Stack.Screen name="AddPage" component={AddCoursePage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StackNavigator;