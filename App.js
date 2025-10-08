
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import './src/localization/i18n';

// --- الإضافة الأولى: استيراد NavigationContainer ---
import { NavigationContainer } from '@react-navigation/native';
// import navigators
import DrawerNavigator from './src/navigation/DrawerNavigator';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const useDrawer = true;

  return (
    // --- الإضافة الثانية: تغليف StackNavigator ---
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>



    // <View style={styles.container}>
    //   {useDrawer ? <DrawerNavigator /> : <StackNavigator />}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});