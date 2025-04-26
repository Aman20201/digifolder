import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations/AuthNavigator';
import { useTheme } from '../../contexts/ThemeContext';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { theme } = useTheme();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      // TODO: Show error message
      return;
    }
    
    setIsLoading(true);
    try {
      // TODO: Implement signup logic with your backend
      console.log('Signup attempt with:', { email, password });
      
      // After successful signup, navigate to biometric setup
      navigation.navigate('BiometricSetup');
    } catch (error) {
      console.error('Signup error:', error);
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
          Create Account
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            mode="flat"
            style={[styles.input, { backgroundColor: theme.colors.surface, ...theme.fonts.bodySmall }]}
            autoCapitalize="words"
            left={<TextInput.Icon icon="account" />}
            theme={{ colors: { primary: theme.colors.primary } }}
          />

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

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="flat"
            style={[styles.input, { backgroundColor: theme.colors.surface, ...theme.fonts.bodySmall }]}
            secureTextEntry={!showConfirmPassword}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon 
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={isLoading}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}
            labelStyle={[{...theme.fonts.bodyLarge}, styles.buttonLabel]}
          >
            SIGN UP
          </Button>

          <View style={styles.footer}>
            <Text 
              variant='bodySmall' 
              style={[styles.footerText, { color: theme.colors.onSurface }]}
            >
              Already have an account?
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              labelStyle={[styles.loginButtonText, { color: theme.colors.primary, ...theme.fonts.bodySmall }]}
            >
              Sign in
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
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
    borderRadius: 30,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 16,
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
  loginButtonText: {
    marginLeft: 0,
  },
});

export default SignupScreen; 