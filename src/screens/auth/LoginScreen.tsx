import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations/AuthNavigator';
import { useTheme } from '../../contexts/ThemeContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { theme } = useTheme();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement login logic with your backend
      console.log('Login attempt with:', { email, password });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top decorative shape */}
      <View style={[styles.topShape, { backgroundColor: theme.colors.primaryContainer }]} />
      
      <Animated.View style={styles.content}>
        <Text 
          variant="displayLarge" 
          style={[styles.title, { color: theme.colors.secondary }]}
        >
          Login
        </Text>
        <Text 
          variant="bodyLarge" 
          style={[styles.subtitle, { color: theme.colors.onSurface }]}
        >
          Please sign in to continue.
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            style={[styles.input, { backgroundColor: theme.colors.surface, ...theme.fonts.bodySmall }]}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            theme={{ colors: { primary: theme.colors.primary } }}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="flat"
            style={[styles.input, { backgroundColor: theme.colors.surface, ...theme.fonts.bodySmall }]}
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            theme={{ colors: { primary: theme.colors.primary } }}
          />

          <Button
            mode="text"
            onPress={() => console.log("Forgot")}
            style={styles.forgotButton}
            labelStyle={[styles.forgotButtonText, { color: theme.colors.primary, ...theme.fonts.bodyMedium }]}
          >
            Forgot password?
          </Button>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}
            labelStyle={[{ ...theme.fonts.bodyLarge }, styles.buttonLabel]}
          >
            LOGIN
          </Button>

          <View style={styles.footer}>
            <Text 
              variant="bodyMedium" 
              style={[styles.footerText, { color: theme.colors.onSurface, ...theme.fonts.bodySmall }]}
            >
              Don't have an account?
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Signup')}
              labelStyle={[styles.signupButtonText, { color: theme.colors.primary, ...theme.fonts.bodySmall }]}
            >
              Sign up
            </Button>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topShape: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    borderBottomLeftRadius: 100,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 24,
  },
  forgotButtonText: {
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    borderRadius: 30,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#666',
  },
  signupButtonText: {
    marginLeft: 0,
  },
});

export default LoginScreen; 