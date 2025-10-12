import * as React from 'react';
import { Button } from 'react-native-paper';

export default function LogoutButton({ children, onPress }) {
  
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={{ borderRadius: 8 }}
      contentStyle={{ paddingVertical: 10 }}
      labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
      buttonColor="#f97316" 
    >
      {children}
    </Button>
  );
}
