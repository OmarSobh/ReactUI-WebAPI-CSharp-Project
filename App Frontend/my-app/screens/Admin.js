import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import CustomHeader from '../Components/CustomHeader ';

const Admin = ({ route, navigation }) => {
  const { user } = route.params;
  const [users, setusers] = useState([]);

  // Fetch users for the user
  useEffect(() => {
    fetchusers();
  }, []);

  // Fetch users again whenever the component receives focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchusers();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchusers = () => {
    fetch(`https://omarsobh.bsite.net/api/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => setusers(data))
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary
      });
  };

  const handleDeleteuser = (userId) => {
      // Show a confirmation alert before deleting the user
      Alert.alert(
        'Delete User',
        'Are you sure you want to delete this user?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              // Perform API call to delete the user
              fetch(`https://omarsobh.bsite.net/api/users/${userId}`, {
                method: 'DELETE',
              })
                .then((response) => {
                  if (response.ok) {
                    // Refresh the user list after successful deletion
                    fetchusers();
                  } else {
                    throw new Error('Failed to delete user.');
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                  // Handle error if necessary, e.g., show an error message to the user
                });
            },
          },
        ],
        { cancelable: false }
      );
    };

  const handleUserDetails = (user) => {
    // Navigate to the User Details Screen with the selected user data
    navigation.navigate('UserDetails', {user ,navigation});
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} route={user} />

      <Text style={styles.title}>Admin Screen</Text>
      <Text style={styles.title}>Users list</Text>

      <ScrollView>
        {users.map((user) => (
          <TouchableOpacity
            key={user.Id}
            style={styles.userItem}
            onPress={() => handleUserDetails(user)} // Navigate to User Details Screen
          >
            <View style={styles.userDetails}>
              <Text style={styles.userTitle}>{user.Name} {user.Family}</Text>
              <Text style={styles.userDescription}>{user.Email}</Text>
            </View>

            <Button
              mode="outlined"
              onPress={() => handleDeleteuser(user.Id)}
              style={styles.deleteButton}
              labelStyle={styles.deleteButtonLabel}
            >
              Delete
            </Button>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f0f0f0',
    marginTop: 0,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
    marginRight: 10,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  buttonLabel: {
    color: '#fff',
  },
  deleteButton: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: '#dc3545',
    borderWidth: 1,
  },
  deleteButtonLabel: {
    color: '#dc3545',
  },
});

export default Admin;
