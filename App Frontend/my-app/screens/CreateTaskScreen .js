import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import CustomHeader from '../Components/CustomHeader ';

const CreateTaskScreen = ({ navigation, route }) => {
  // State to store the task title and description
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Access the user object from route.params.user
  const { user } = route.params;

  // Function to handle saving the new task
  const handleSaveTask = () => {
    const newTask = {
      Title: title,
      Description: description,
      CreatedDate: new Date().toISOString(), // Use the current date as the created date
      UserID: user.Id, // Replace with the actual user ID (if your app has user authentication)
    };

    // Perform API call to create the task
    fetch('https://omarsobh.bsite.net/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          // Task created successfully, navigate back to the TaskScreen
          navigation.navigate('Tasks', { user: user });
        } else {
          // Handle error response (if possible)
          console.error('Error Response:', response);
          throw new Error('Failed to create task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary, e.g., show an error message to the user
      });
  };

  return (
    <View style={styles.container}>
            <CustomHeader navigation={navigation} route={user}></CustomHeader>

      <Text style={styles.title}>Create New Task</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task Title"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Task Description"
        multiline
      />
      <Button mode="contained" onPress={handleSaveTask} style={styles.saveButton}>
        Save Task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f0f0f0',
    marginTop:0,
    marginBottom:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
});

export default CreateTaskScreen;
