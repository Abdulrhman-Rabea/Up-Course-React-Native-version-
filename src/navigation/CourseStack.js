import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoursesScreen from '../screens/CoursesScreen';
import CourseDetailsScreen from '../screens/CourseDetailsScreen';

const Stack = createStackNavigator();

export default function CourseStack() {
    return (
        <Stack.Navigator initialRouteName="CoursesList">
            <Stack.Screen
                name="CoursesList"
                component={CoursesScreen}
                options={{ title: 'Courses' }}
            />
            <Stack.Screen
                name="CourseDetails"
                component={CourseDetailsScreen}
                options={{ title: 'Course Details' }}
            />
        </Stack.Navigator>
    );
}
