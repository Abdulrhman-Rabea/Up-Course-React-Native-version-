import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Button, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { signUpWithEmail, mapAuthError } from '../lib/auth'; 
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const MyButton = ({ children, disabled, onPress }) => (
  <Button
    mode="contained"
    onPress={onPress}
    disabled={!!disabled}
    style={styles.signUpButton}
    labelStyle={styles.signUpButtonText}
  >
    {children}
  </Button>
);

function Registration() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const db = getFirestore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitErr, setSubmitErr] = useState('');
  const [submitOk, setSubmitOk] = useState('');
  
  const handleSubmit = async () => {
    setSubmitErr('');
    setSubmitOk('');

    if (!name || !email || !pass || !rePass) {
      setSubmitErr('Please fill all required fields.');
      return;
    }
    if (pass !== rePass) {
      setSubmitErr('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await signUpWithEmail({ email, password: pass, displayName: name });
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        displayName: name,
        email,
        role: isAdmin ? 'admin' : 'student',
        createdAt: serverTimestamp(),
      });

      setSubmitOk('Correct! Account created successfully.');

      setTimeout(() => {
        const target = isAdmin ? 'AdminPage' : 'Home';
        navigation.replace(target);
      }, 2000);

    } catch (e) {
      const technicalError = `Error Code: ${e.code}\nMessage: ${e.message}`;
      setSubmitErr(technicalError);
      console.error("FIREBASE ERROR:", technicalError);
    } finally {
      setIsLoading(false);
    }
  };

  const disableSubmit = isLoading;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Create an account to unlock exclusive features.</Text>
            
            <TextInput label="Full Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />
            <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" mode="outlined" />
            <TextInput label="Password" value={pass} onChangeText={setPass} style={styles.input} secureTextEntry mode="outlined" />
            <TextInput label="Confirm Password" value={rePass} onChangeText={setRePass} style={styles.input} secureTextEntry mode="outlined" />

            <Text style={styles.roleTitle}>Select your role</Text>
            <View style={styles.roleContainer}>
                <View style={styles.switchContainer}>
                    <Text>Student</Text>
                    <Switch value={isStudent} onValueChange={(v) => { setIsStudent(v); if(v) setIsAdmin(false); }} color="#F97316" />
                </View>
                <View style={styles.switchContainer}>
                    <Text>Instructor</Text>
                    <Switch value={isAdmin} onValueChange={(v) => { setIsAdmin(v); if(v) setIsStudent(false); }} color="#F97316" />
                </View>
            </View>

            {isAdmin && (
                <TextInput label="Admin Code" value={adminId} onChangeText={setAdminId} style={styles.input} mode="outlined" />
            )}

            <MyButton onPress={handleSubmit} disabled={disableSubmit}>
                {isLoading ? 'Loading...' : 'Sign Up'}
            </MyButton>
            
            {!!submitErr && <Text style={styles.error}>{submitErr}</Text>}
            {!!submitOk && <Text style={styles.success}>{submitOk}</Text>}

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F3F4F6' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, width: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#1F2937' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#6B7280', marginBottom: 24 },
  input: { backgroundColor: '#F9FAFB', marginTop: 8 },
  error: { color: '#ef4444', marginTop: 12, textAlign: 'center', fontWeight: 'bold' },
  success: { color: '#22c55e', marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  roleTitle: { fontSize: 16, fontWeight: '500', color: '#4B5563', marginTop: 16, marginBottom: 8 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  signUpButton: { backgroundColor: '#F97316', borderRadius: 8, paddingVertical: 8, marginTop: 20 },
  signUpButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerText: { color: '#6B7280', fontSize: 14 },
  footerLink: { color: '#F97316', fontWeight: 'bold', fontSize: 14, marginLeft: 4 },
});

export default Registration;