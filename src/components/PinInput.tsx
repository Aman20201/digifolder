import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useTheme } from '../contexts/ThemeContext';

interface PinInputProps {
  onPinEntered: (pin: string) => void;
  onError: (error: string) => void;
}

export const PinInput: React.FC<PinInputProps> = ({ onPinEntered, onError }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSettingPin, setIsSettingPin] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    checkIfPinExists();
  }, []);

  const checkIfPinExists = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      setIsSettingPin(!credentials);
    } catch (error) {
      setIsSettingPin(true);
    }
  };

  const handlePinChange = (text: string) => {
    if (text.length <= 6) {
      setPin(text);
      if (text.length === 6) {
        if (isSettingPin) {
          setConfirmPin('');
        } else {
          onPinEntered(text);
        }
      }
    }
  };

  const handleConfirmPin = (text: string) => {
    if (text.length <= 6) {
      setConfirmPin(text);
      if (text.length === 6) {
        if (text === pin) {
          savePin(text);
        } else {
          onError('PINs do not match');
          setPin('');
          setConfirmPin('');
        }
      }
    }
  };

  const savePin = async (pinToSave: string) => {
    try {
      await Keychain.setGenericPassword('user', pinToSave);
      onPinEntered(pinToSave);
    } catch (error) {
      onError('Failed to save PIN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {isSettingPin ? 'Set your PIN' : 'Enter your PIN'}
      </Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        value={pin}
        onChangeText={handlePinChange}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
        placeholder="Enter 6-digit PIN"
        placeholderTextColor={theme.colors.text + '80'}
      />
      {isSettingPin && pin.length === 6 && (
        <>
          <Text style={styles.label}>Confirm your PIN</Text>
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            value={confirmPin}
            onChangeText={handleConfirmPin}
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry
            placeholder="Confirm 6-digit PIN"
            placeholderTextColor={theme.colors.text + '80'}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 8,
  },
}); 