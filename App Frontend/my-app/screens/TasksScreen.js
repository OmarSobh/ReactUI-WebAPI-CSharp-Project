// TaskScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const TaskScreen = ({ route }) => {
      const { user } = route.params;
      const [tasks, setTasks] = useState([]);

      // Fetch tasks for the user
      useEffect(() => {
            fetchTasks();
      }, []);

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

      return (
            <View style={styles.container}>
                  <Text style={styles.title}>Task Screen</Text>
                  {tasks.map((task) => (
                        <View key={task.Id} style={styles.taskItem}>
                              <Text style={styles.taskTitle}>{task.Title}</Text>
                              <Text style={styles.taskDescription}>{task.Description}</Text>
                        </View>
                  ))}
                  {/* Navigate to ProfileScreen */}
                  <Button title="Go to Profile" onPress={() => navigation.navigate('Profile', { user })} />
            </View>);
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
      },
      taskTitle: {
            fontSize: 18,
            fontWeight: 'bold',
      },
      taskDescription: {
            fontSize: 16,
      },
});

export default TaskScreen;
