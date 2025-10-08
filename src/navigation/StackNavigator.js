import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCoursePage from "../AdminDashboard/pages/AddPage";
import AdminPage from "../AdminDashboard/pages/Home";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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









