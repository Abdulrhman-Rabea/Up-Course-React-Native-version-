
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import "./src/localization/i18n";
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import './src/localization/i18n';

import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const useDrawer = true;

  return (

    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>



  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});