import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCoursePage from "../AdminDashboard/pages/AddPage";
import AdminPage from "../AdminDashboard/pages/Home";

const Stack = createNativeStackNavigator();



import Login from "../login/Login";
import Registration from "../Registration/Registration";
import Courses from "../AdminDashboard/pages/Home";
import HomeScreen from "../screens/HomeScreen";
import EditCourseScreen from "../AdminDashboard/pages/EditCourseScreen";

function StackNavigator() {
  return (


    <Stack.Navigator initialRouteName="Login">
      {/* Auth screens */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Courses" component={Courses} options={{ headerShown: false }} />
      <Stack.Screen name="Edit" component={EditCourseScreen} options={{ headerShown: false }} />
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









