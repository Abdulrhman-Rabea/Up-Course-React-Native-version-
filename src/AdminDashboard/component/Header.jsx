import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Appbar.Header style={{ backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Appbar.Content title={t("header.title")} />
      <Appbar.Action icon="plus" onPress={() => navigation.navigate("AddPage")} accessibilityLabel={t("header.addNew")} />
    </Appbar.Header>
  );
}
