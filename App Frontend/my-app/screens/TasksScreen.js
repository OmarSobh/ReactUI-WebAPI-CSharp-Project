import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const TaskScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [tasks, setTasks] = useState([]);

  // Fetch tasks for the user
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks again whenever the component receives focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchTasks = () => {
    fetch(`https://omarsobh.bsite.net/api/tasks/user/${user.Id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary
      });
  };

  const handleDeleteTask = (taskId) => {
    // Perform API call to delete the task
    fetch(`https://omarsobh.bsite.net/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Refresh the task list after successful deletion
          fetchTasks();
        } else {
          throw new Error('Failed to delete task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary, e.g., show an error message to the user
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Screen</Text>
      {tasks.map((task) => (
        <TouchableOpacity
          key={task.ID}
          style={styles.taskItem}
          onPress={() => navigation.navigate('TaskDetails', { task })}
        >
          <View style={styles.taskDetails}>
            <Text style={styles.taskTitle}>{task.Title}</Text>
            <Text style={styles.taskDescription}>{task.Description}</Text>
          </View>
          {/* Delete Button */}
          <Button
            mode="outlined"
            onPress={() => handleDeleteTask(task.ID)}
            style={styles.deleteButton}
            labelStyle={styles.deleteButtonLabel}
          >
            Delete
          </Button>
        </TouchableOpacity>
      ))}
      {/* Navigate to ProfileScreen */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Profile', { user: user })}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Go to Profile
      </Button>

      {/* Navigate to CreateTaskScreen */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateTask', { user })}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Create Task
      </Button>
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
  taskItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskDetails: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
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

export default TaskScreen;
