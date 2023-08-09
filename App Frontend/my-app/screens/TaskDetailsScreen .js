import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import CustomHeader from '../Components/CustomHeader ';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.Title);
  const [editedDescription, setEditedDescription] = useState(task.Description);

  const handleSaveChanges = () => {
    // Perform API call to update the task with editedTitle and editedDescription
    const updatedTask = {
      ...task,
      Title: editedTitle,
      Description: editedDescription,
    };
    // Make an API call to update the task
    fetch(`https://omarsobh.bsite.net/api/tasks/${task.ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (response.ok) {
          // Refresh the task after successful update
          fetchTaskDetails(); // Call a function to fetch updated task details
          setIsEditMode(false); // Exit edit mode after saving changes
          // You can also add a success message or some feedback to the user
        } else {
          throw new Error('Failed to update task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary, e.g., show an error message to the user
      });
  };

  
  const handleDeleteTask = () => {
    // Show an alert before deleting the task
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteTask = () => {
    // Perform API call to delete the task
    fetch(`https://omarsobh.bsite.net/api/tasks/${task.ID}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Navigate back to the TaskScreen after successful deletion
          navigation.navigate('TaskScreen');
          // You can also add a success message or some feedback to the user
        } else {
          throw new Error('Failed to delete task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary, e.g., show an error message to the user
      });
  };

  const fetchTaskDetails = () => {
    // Fetch the task details again from the API to get updated data
    fetch(`https://omarsobh.bsite.net/api/tasks/${task.ID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        // Update the task details in the component state with the fetched data
        setEditedTitle(data.Title);
        setEditedDescription(data.Description);
        // You can also update any other relevant data you may have in the task object
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} route={route}></CustomHeader>

      <View style={styles.taskCard}>
        <Text style={styles.title}>{task.Title}</Text>
        <Text style={styles.description}>{task.Description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Task ID: {task.ID}</Text>
          <Text style={styles.infoText}>Created Date: {task.CreatedDate}</Text>
          {/* Show updated date here */}
          {task.UpdatedDate && <Text style={styles.infoText}>Updated Date: {task.UpdatedDate}</Text>}
        </View>
      </View>
      {isEditMode ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Edit Task Title"
          />
          <TextInput
            style={styles.editInput}
            value={editedDescription}
            onChangeText={setEditedDescription}
            placeholder="Edit Task Description"
            multiline
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(true)}>
            <Text style={styles.editButtonText}>Edit Task</Text>
          </TouchableOpacity>
        </View>
      )}
      {isEditMode && (
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSaveChanges} labelStyle={styles.buttonLabel}>
            Save Changes
          </Button>
          <Button mode="outlined" onPress={handleDeleteTask} labelStyle={styles.deleteButtonLabel}>
            Delete Task
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f0f0f0',
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    color: '#888',
  },
  editContainer: {
    marginBottom: 10,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginVertical: 10,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default TaskDetailsScreen;
