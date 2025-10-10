import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Button, Snackbar, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import {
  signInWithEmail,
  signInWithGoogle,
  resetPassword,
  mapLoginError,
} from '../lib/login';

function Login() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ emailErr: '', passErr: '' });
  const [message, setMessage] = useState({ visible: false, text: '', type: 'info' });
  const timerRef = useRef(null);

  const showMessage = ({ text, type = 'info', duration = 4000 }) => {
    setMessage({ visible: true, text, type });
    if (duration) {
      timerRef.current = setTimeout(() => {
        setMessage({ visible: false, text: '', type: 'info' });
      }, duration);
    }
  };
  const onDismissSnack = () => setMessage({ visible: false, text: '', type: 'info' });
  
  const emailRegex = /\S+@\S+\.\S+/;
  const passRegex = /^.{6,}$/;

  const validateEmail = (value) => {
    setEmail(value);
    if (!value) setErrors((p) => ({ ...p, emailErr: t('auth.validation.emailRequired') }));
    else if (!emailRegex.test(value)) setErrors((p) => ({ ...p, emailErr: t('auth.validation.emailInvalid') }));
    else setErrors((p) => ({ ...p, emailErr: '' }));
  };
  const validatePass = (value) => {
    setPass(value);
    if (!value) setErrors((p) => ({ ...p, passErr: t('auth.validation.passRequired') }));
    else if (!passRegex.test(value)) setErrors((p) => ({ ...p, passErr: t('auth.validation.passMin') }));
    else setErrors((p) => ({ ...p, passErr: '' }));
  };
  const handleSubmit = async () => {
    try {
      const user = await signInWithEmail({ email, password: pass, remember: rememberMe });
      const userDoc = await getDoc(doc(getFirestore(), 'users', user.uid));
      const userData = userDoc.data();
      if (userData.role === 'admin') {
        navigation.navigate('Admin');
      } else {
        navigation.navigate('Drawer');
      }
    } catch (error) {
      showMessage({ text: 'Login failed', type: 'error' });
    }
  };
  
  const handleGoogle = async () => {  };
  const onForgotPassword = async () => {  };
  const togglePasswordVisibility = () => setShowPassword((s) => !s);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      <Snackbar visible={message.visible} onDismiss={onDismissSnack} duration={4000}>
        {message.text}
      </Snackbar>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>{t('auth.login.title', 'Login')}</Text>
          <Text style={styles.subtitle}>{t('auth.login.welcome', 'Welcome back!')}</Text>
          
          <TextInput
            label={t('auth.login.email', 'Email')}
            value={email}
            onChangeText={validateEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {!!errors.emailErr && <Text style={styles.error}>{errors.emailErr}</Text>}

          <TextInput
            label={t('auth.login.password', 'Password')}
            value={pass}
            onChangeText={validatePass}
            style={styles.input}
            secureTextEntry={!showPassword}
            mode="outlined"
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
          />
          {!!errors.passErr && <Text style={styles.error}>{errors.passErr}</Text>}
          
          <View style={styles.optionsContainer}>
            <View style={styles.switchContainer}>
                <Switch value={rememberMe} onValueChange={setRememberMe} color="#F97316" />
                <Text style={styles.rememberText}>{t('auth.login.remember', 'Remember me')}</Text>
            </View>
            {/* <Button onPress={onForgotPassword} mode="text" labelStyle={styles.forgotPasswordText}>
                {t('auth.login.forgot', 'Forgot Password?')}
            </Button> */}
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.loginButton}
            labelStyle={styles.loginButtonText}
            disabled={!email || !pass || !!errors.emailErr || !!errors.passErr}
          >
            {t('auth.login.cta', 'Login')}
          </Button>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <Button
            mode="outlined"
            onPress={handleGoogle}
            style={styles.googleButton}
            labelStyle={styles.googleButtonText}
            icon="google"
          >
            {t('auth.login.google', 'Sign in with Google')}
          </Button>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('auth.login.noAccount', "Don't have an account?")} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.footerLink}>{t('auth.login.signup', 'Sign Up')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F9FAFB',
    marginTop: 8,
  },
  error: {
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 6,
    color: '#4B5563',
  },
  forgotPasswordText: {
    color: '#F97316',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#F97316',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#6B7280',
  },
  googleButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 8,
    borderColor: '#D1D5DB',
  },
  googleButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  footerLink: {
    color: '#F97316',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
});

export default Login;