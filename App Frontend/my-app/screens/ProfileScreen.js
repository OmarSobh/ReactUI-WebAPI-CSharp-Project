// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const handleViewTasks = () => {
    navigation.navigate('Tasks', { user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <Text style={styles.label}>Name: </Text>
      <Text style={styles.value}>{user.Name}</Text>

      <Text style={styles.label}>Family: </Text>
      <Text style={styles.value}>{user.Family}</Text>

      <Text style={styles.label}>Email: </Text>
      <Text style={styles.value}>{user.Email}</Text>

      <Button title="View Tasks" onPress={handleViewTasks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;
