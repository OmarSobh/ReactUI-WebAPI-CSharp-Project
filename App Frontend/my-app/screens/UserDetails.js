import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, ScrollView } from 'native-base';
import CustomHeader from '../Components/CustomHeader ';

const UserDetails = ({ route, navigation }) => {
  const { user } = route.params;
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
        // Handle error if necessary
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
    // Perform API call to mark the task as completed
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
        // Handle error if necessary
      });
  };

  const handleSaveTask = () => {
    const newTask = {
      Title: title,
      Description: description,
      CreatedDate: new Date().toISOString(),
      UserID: user.Id,
    };

    fetch('https://omarsobh.bsite.net/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          fetchTasks();
          setTitle('');
          setDescription('');
        } else {
          console.error('Error Response:', response);
          throw new Error('Failed to create task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error if necessary
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader route={user} navigation={navigation} />
      <ScrollView style={styles.taskList}>
        <Text style={styles.title}>User Details</Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{user.Name}</Text>
          <Text style={styles.label}>Family:</Text>
          <Text style={styles.text}>{user.Family}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.Email}</Text>
        </View>
        <View style={styles.addTaskContainer}>
          <Text style={styles.addTaskHeader}>Add New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Button
            mode="contained"
            onPress={handleSaveTask}
            style={styles.saveButton}
            labelStyle={styles.saveButtonLabel}
          >
            Save Task
          </Button>
        </View>
        <Text style={styles.tasksHeader}>{user.Name} Tasks</Text>
        {tasks.length === 0 ? (
          <Text style={styles.noTasksText}>No tasks available.</Text>
        ) : (
          tasks.map((task) => (
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
          ))
        )}
      </ScrollView>
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
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  tasksHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 10,
    elevation: 2,
  },
  taskDetails: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  taskDescription: {
    fontSize: 16,
    color: '#555',
  },
  completeButton: {
    paddingHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  completeButtonLabel: {
    fontSize: 16,
    color: '#fff',
  },
  addTaskContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  addTaskHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  saveButtonLabel: {
    fontSize: 16,
    color: '#fff',
  },
});

export default UserDetails;
