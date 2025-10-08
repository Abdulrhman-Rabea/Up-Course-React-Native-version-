import React from 'react';
<<<<<<< HEAD
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return <DrawerNavigator />;
=======
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import 'react-native-url-polyfill/auto';
import "./src/localization/i18n";


export default function App() {
  return (
    
    <StackNavigator />
    
  );
>>>>>>> main
}
