import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import './src/localization/i18n';

// import navigators
import DrawerNavigator from './src/navigation/DrawerNavigator';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const useDrawer = true;

  return (
    <View style={styles.container}>
      {useDrawer ? <DrawerNavigator /> : <StackNavigator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
