import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BiometricAuth } from '../components/BiometricAuth';
import * as Keychain from 'react-native-keychain';
import { RootStackParamList } from '../navigations/types';
import { useTheme } from '../contexts/ThemeContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { theme } = useTheme();
  const [hasBiometricSetup, setHasBiometricSetup] = useState(false);

  useEffect(() => {
    checkBiometricSetup();
  }, []);

  const checkBiometricSetup = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      setHasBiometricSetup(!!credentials);
    } catch (error) {
      setHasBiometricSetup(false);
    }
  };

  const handleSuccess = () => {
    navigation.navigate('Home');
  };

  const handleError = (error: string) => {
    Alert.alert('Authentication Failed', error);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Welcome Back
      </Text>
      {hasBiometricSetup ? (
        <>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            Please authenticate to continue
          </Text>
          <BiometricAuth onSuccess={handleSuccess} onError={handleError} />
        </>
      ) : (
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          No authentication method set up. Please sign in with your credentials.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
}); 