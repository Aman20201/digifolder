import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const ScanScreen = () => {
  const theme = useTheme();
  const [isScanning, setIsScanning] = useState(false);

  const handleCameraScan = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      setIsScanning(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Handle the scanned image
        console.log('Scanned image:', result.assets[0].uri);
        // TODO: Process and save the scanned document
      }
    } catch (error) {
      console.error('Error scanning document:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (result.assets !== null && result.assets.length > 0 ) {
        // Handle the picked document
        console.log('Picked document:', result.assets[0].uri);
        // TODO: Process and save the picked document
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall" style={styles.title}>
        Scan or Import Document
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCameraScan}
          loading={isScanning}
          style={styles.button}
        >
          Scan with Camera
        </Button>

        <Button
          mode="outlined"
          onPress={handleDocumentPick}
          style={styles.button}
        >
          Import from Files
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    marginBottom: 8,
  },
});

export default ScanScreen; 