import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import "./src/localization/i18n";
import './src/localization/i18n';

import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/Store";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { loadWishlistFromStorage } from "./src/redux/wishlistSlice";

// ✅ مكوّن داخلي لتحميل البيانات من AsyncStorage عند التشغيل
function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWishlistFromStorage());
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
