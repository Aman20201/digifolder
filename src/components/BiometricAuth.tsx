import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Keychain from 'react-native-keychain';
import { useTheme } from '../contexts/ThemeContext';
import { PinInput } from './PinInput';

interface BiometricAuthProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({ onSuccess, onError }) => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const { theme } = useTheme();
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricAvailable(hasHardware && isEnrolled);
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your files',
        fallbackLabel: 'Use PIN instead',
      });

      if (result.success) {
        animateSuccess();
        setIsAuthenticated(true);
        onSuccess();
      } else {
        setShowPinInput(true);
      }
    } catch (error) {
      onError('Biometric authentication failed');
    }
  };

  const handlePinSuccess = () => {
    animateSuccess();
    setIsAuthenticated(true);
    onSuccess();
  };

  const animateSuccess = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.authContainer, { transform: [{ scale: scaleAnim }] }]}>
        {!showPinInput ? (
          <>
            {isBiometricAvailable && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                onPress={handleBiometricAuth}
              >
                <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
                  Use Fingerprint
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.secondary }]}
              onPress={() => setShowPinInput(true)}
            >
              <Text style={[styles.buttonText, { color: theme.colors.onSecondary }]}>
                Use PIN
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <PinInput onPinEntered={handlePinSuccess} onError={onError} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 