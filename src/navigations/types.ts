export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  BiometricSetup: undefined;
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 