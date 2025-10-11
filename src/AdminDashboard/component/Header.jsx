import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { logout } from '../../lib/auth';

export default function Header() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleLogout = () => {
      logout()
      
      .then(() => {
        console.log("Logout successful");
        Alert.alert(t("success"), t("logout.success"));

        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <Appbar.Header style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Appbar.Content titleStyle={{ color: '#000' }} title={t("header.title")} />
      <Appbar.Action icon="plus" color="#000" onPress={() => navigation.navigate("AddPage")} accessibilityLabel={t("header.addNew")} />
      <Appbar.Action icon="logout" color="#000" onPress={handleLogout} accessibilityLabel={t("header.logout")} />
    </Appbar.Header>
  );
}
