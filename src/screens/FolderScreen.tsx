import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigations/AppNavigator';

type FolderScreenRouteProp = RouteProp<RootStackParamList, 'Folder'>;

const FolderScreen = () => {
  const theme = useTheme();
  const route = useRoute<FolderScreenRouteProp>();
  const { folderId } = route.params;

  // Temporary mock data
  const documents = [
    { id: '1', name: 'Passport.pdf', date: '2024-01-15', size: '2.5 MB' },
    { id: '2', name: 'Resume.docx', date: '2024-02-20', size: '1.2 MB' },
    { id: '3', name: 'Contract.pdf', date: '2024-03-10', size: '3.1 MB' },
  ];

  const renderDocument = ({ item }: { item: typeof documents[0] }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <View style={styles.documentInfo}>
          <Text variant="bodySmall">{item.date}</Text>
          <Text variant="bodySmall">{item.size}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={documents}
        renderItem={renderDocument}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  documentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default FolderScreen; 