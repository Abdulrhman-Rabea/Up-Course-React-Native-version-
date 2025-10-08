import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import 'react-native-url-polyfill/auto';
import "./src/localization/i18n";
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    
    <NavigationContainer>
    <DrawerNavigator />
    </NavigationContainer>
    
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
