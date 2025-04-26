import { Platform } from 'react-native';

export const fontConfig = {
  displayLarge: {
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
    }),
    fontSize: 32,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: Platform.select({
      ios: 'Poppins-SemiBold',
      android: 'Poppins-SemiBold',
    }),
    fontSize: 24,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: Platform.select({
      ios: 'Poppins-SemiBold',
      android: 'Poppins-SemiBold',
    }),
    fontSize: 20,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: Platform.select({
      ios: 'Poppins-Medium',
      android: 'Poppins-Medium',
    }),
    fontSize: 18,
    letterSpacing: 0.15,
  },
  bodyLarge: {
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
    }),
    fontSize: 16,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
    }),
    fontSize: 14,
    letterSpacing: 0.25,
  },
  labelLarge: {
    fontFamily: Platform.select({
      ios: 'Poppins-Medium',
      android: 'Poppins-Medium',
    }),
    fontSize: 14,
    letterSpacing: 0.1,
  },
}; 