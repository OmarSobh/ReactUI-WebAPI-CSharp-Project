import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import CustomHeader from '../Components/CustomHeader ';

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(user.Name);
  const [editedFamily, setEditedFamily] = useState(user.Family);
  const [editedEmail, setEditedEmail] = useState(user.Email);
  const [editedPassword, setEditedPassword] = useState(user.Password);

  const handleSaveChanges = () => {
    // Perform API call to update the user profile with edited details
    const updatedUser = {
      ...user,
      Name: editedName,
      Family: editedFamily,
      Email: editedEmail,
      Password: editedPassword,
    };

    // Make an API call to update the user profile
    fetch(`https://omarsobh.bsite.net/api/users/${user.Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          // Refresh the user profile after successful update
          fetchUserProfile();
          setIsEditMode(false); // Exit edit mode after saving changes
          // You can also add a success message or some feedback to the user
        } else {
          throw new Error('Failed to update user profile.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary, e.g., show an error message to the user
      });
  };

  const fetchUserProfile = () => {
    // Fetch the user profile again from the API to get updated data
    fetch(`https://omarsobh.bsite.net/api/users/${user.Id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        // Update the user profile details in the component state with the fetched data
        setEditedName(data.Name);
        setEditedFamily(data.Family);
        setEditedEmail(data.Email);
        setEditedPassword(data.Password);
        // You can also update any other relevant data you may have in the user object
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} route={user} />
      <Text style={styles.title}>Profile Information</Text>

      {isEditMode ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Name"
          />

          <Text style={styles.label}>Family:</Text>
          <TextInput
            style={styles.input}
            value={editedFamily}
            onChangeText={setEditedFamily}
            placeholder="Family"
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="Email"
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={editedPassword}
            onChangeText={setEditedPassword}
            placeholder="Password"
            secureTextEntry
          />
        </View>
      ) : (
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{editedName}</Text>

          <Text style={styles.label}>Family:</Text>
          <Text style={styles.value}>{editedFamily}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{editedEmail}</Text>

          <Text style={styles.label}>Password:</Text>
          <Text style={styles.value}>********</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {isEditMode ? (
          <>
            <Button mode="contained" onPress={handleSaveChanges} labelStyle={styles.buttonLabel}>
              Save Changes
            </Button>
            <Button mode="outlined" onPress={() => setIsEditMode(false)} labelStyle={styles.buttonLabel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button mode="contained" onPress={() => setIsEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </View>
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
  userInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default ProfileScreen;
