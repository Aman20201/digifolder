import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BiometricAuth } from '../components/BiometricAuth';
import { RootStackParamList } from '../navigations/types';
import { useTheme } from '../contexts/ThemeContext';

type BiometricSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BiometricSetup'>;

export const BiometricSetupScreen: React.FC = () => {
  const navigation = useNavigation<BiometricSetupScreenNavigationProp>();
  const { theme } = useTheme();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleSuccess = () => {
    setIsSetupComplete(true);
    Alert.alert(
      'Setup Complete',
      'Your biometric authentication has been set up successfully.',
      [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const handleError = (error: string) => {
    Alert.alert('Error', error);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Set Up Security
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Choose your preferred authentication method
      </Text>
      <BiometricAuth onSuccess={handleSuccess} onError={handleError} />
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