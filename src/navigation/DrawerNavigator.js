// src/navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AboutScreen from '../screens/CoursesScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: '#ff9500' },
                    headerTintColor: '#fff',
                    drawerActiveTintColor: '#ff9500',
                }}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen
                    name="Courses"
                    component={AboutScreen}

                />
                <Drawer.Screen name="My Courses" component={AboutScreen} />
                <Drawer.Screen name="Wishlist" component={AboutScreen} />
                <Drawer.Screen name="About" component={AboutScreen} />
                <Drawer.Screen name="Contact" component={AboutScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
