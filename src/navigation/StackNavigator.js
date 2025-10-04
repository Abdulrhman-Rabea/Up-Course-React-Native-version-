import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCoursePage from "../AdminDashboard/AddPage";
import AdminPage from "../AdminDashboard/Home";



function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
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
    </NavigationContainer>
  );
}
export default StackNavigator;


