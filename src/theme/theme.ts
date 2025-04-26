import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import { fontConfig } from './fonts';

const baseTheme = {
  roundness: 30,
  fonts: configureFonts({ config: fontConfig }),
};

export const lightTheme = {
  ...MD3LightTheme,
  ...baseTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#F4B63F',
    primaryContainer: '#F4B63F20',
    secondary: '#333333',
    secondaryContainer: '#666666',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: '#B00020',
    text: '#333333',
    onSurface: '#666666',
    disabled: '#9E9E9E',
    placeholder: '#666666',
    backdrop: '#001529',
    notification: '#F4B63F',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  ...baseTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#F4B63F',
    primaryContainer: '#F4B63F20',
    secondary: '#FFFFFF',
    secondaryContainer: '#CCCCCC',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    text: '#FFFFFF',
    onSurface: '#CCCCCC',
    disabled: '#666666',
    placeholder: '#999999',
    backdrop: '#001529',
    notification: '#F4B63F',
  },
}; 