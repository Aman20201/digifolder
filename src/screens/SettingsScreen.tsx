import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

const SettingsScreen = () => {
  const theme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          right={() => (
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
            />
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Security</List.Subheader>
        <List.Item
          title="App Lock"
          description="Enable PIN or biometric authentication"
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Document Encryption"
          description="Encrypt documents at rest"
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>About</List.Subheader>
        <List.Item
          title="Version"
          description="1.0.0"
        />
        <List.Item
          title="Privacy Policy"
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Terms of Service"
          right={() => <List.Icon icon="chevron-right" />}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen; 