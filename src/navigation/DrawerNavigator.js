import { createDrawerNavigator } from "@react-navigation/drawer";
import AddCoursePage from "../AdminDashboard/pages/AddPage";
import AdminPage from "../AdminDashboard/pages/Home";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
                name="Home"
                component={AdminPage}

            />
            <Drawer.Screen
                name="AddPage"
                component={AddCoursePage}

            />
         
        </Drawer.Navigator>
    );
}
export default DrawerNavigator;
