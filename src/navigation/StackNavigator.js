import { createNativeStackNavigator } from "@react-navigation/native-stack";

// لا نحتاج NavigationContainer هنا
// import { NavigationContainer } from "@react-navigation/native";

import AddCoursePage from "../AdminDashboard/AddPage";
import AdminPage from "../AdminDashboard/Home";
import Login from "../login/Login";
import Registration from "../Registration/Registration";

// يفضل تسمية المكون بحرف كبير في البداية
function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    // ✨ تم حذف NavigationContainer من هنا
    <Stack.Navigator initialRouteName="Login">
      {/* Auth screens */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
      {/* App/Admin screens */}
      <Stack.Screen
        name="AdminPage"
        component={AdminPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPage"
        component={AddCoursePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;