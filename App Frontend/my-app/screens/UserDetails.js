import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../Components/CustomHeader ';

const UserDetails = ({ route ,navigation }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <CustomHeader route={user} navigation={navigation}/>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.text}>{user.Name}</Text>
      <Text style={styles.label}>Family:</Text>
      <Text style={styles.text}>{user.Family}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{user.Email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default UserDetails;
