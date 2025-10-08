// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import StackNavigator from './src/navigation/StackNavigator';
// import 'react-native-url-polyfill/auto';
// import "./src/localization/i18n";


// export default function App() {
//   return (
    
//     <StackNavigator />
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import 'react-native-url-polyfill/auto';
import "./src/localization/i18n";

// --- الإضافة الأولى: استيراد NavigationContainer ---
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    // --- الإضافة الثانية: تغليف StackNavigator ---
    <NavigationContainer>
      <StackNavigator />
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