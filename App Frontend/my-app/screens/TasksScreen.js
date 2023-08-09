import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import CustomHeader from '../Components/CustomHeader ';

const TaskScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

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
      });
  };

  const handleCompleteTask = (taskId) => {
    Alert.alert(
      'Complete Task',
      'Are you sure you want to mark this task as completed?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Complete',
          style: 'destructive',
          onPress: () => completeTask(taskId),
        },
      ],
      { cancelable: true }
    );
  };

  const completeTask = (taskId) => {
    fetch(`https://omarsobh.bsite.net/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchTasks();
        } else {
          throw new Error('Failed to complete task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDeleteTask = (taskId) => {
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
          onPress: () => deleteTask(taskId),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteTask = (taskId) => {
    fetch(`https://omarsobh.bsite.net/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchTasks();
        } else {
          throw new Error('Failed to delete task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} route={user}></CustomHeader>

      <Text style={styles.title}>Task Screen</Text>
      <ScrollView>
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
            
            <Button
              mode="contained"
              onPress={() => handleCompleteTask(task.ID)}
              style={styles.completeButton}
              labelStyle={styles.completeButtonLabel}
            >
              Complete
            </Button>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginRight: 5,
  },
  deleteButtonLabel: {
    color: '#dc3545',
  },
  completeButton: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 5,
  },
  completeButtonLabel: {
    color: '#fff',
  },
});

export default TaskScreen;
