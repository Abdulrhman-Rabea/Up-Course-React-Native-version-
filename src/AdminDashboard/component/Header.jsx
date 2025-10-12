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
    Alert.alert(
      t("logout.confirm"),
      t("logout.message"),
      [
        {
          text: t("cancel"),
          style: "cancel"
        },
        {
          text: t("ok"),
          onPress: () => {
            logout()
              .then(() => {
                navigation.navigate("Login");
              })
              .catch((error) => {
                console.log(error);
              });
             
          }
        }
      ]
    );
  };

  return (
    <Appbar.Header style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Appbar.Content titleStyle={{ color: '#000' }} title={t("header.title")} />
      <Appbar.Action icon="plus" color="#000" onPress={() => navigation.navigate("AddPage")} accessibilityLabel={t("header.addNew")} />
      <Appbar.Action icon="logout" color="#000" onPress={handleLogout} accessibilityLabel={t("header.logout")} />
    </Appbar.Header>
  );
}
