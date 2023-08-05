import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomHeader from '../Components/CustomHeader ';
import { Button, ScrollView } from 'native-base';

const UserDetails = ({ route ,navigation }) => {
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
              <CustomHeader route={user} navigation={navigation} />
              <Text style={styles.title}>User Details</Text>
              <View style={styles.userInfoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.text}>{user.Name}</Text>
                <Text style={styles.label}>Family:</Text>
                <Text style={styles.text}>{user.Family}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{user.Email}</Text>
              </View>
        
              <ScrollView style={styles.taskList}>
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
          deleteButton: {
            paddingHorizontal: 10,
            backgroundColor: 'red',
            borderRadius: 4,
          },
          deleteButtonLabel: {
            fontSize: 16,
            color: '#fff',
          },
        });
        
        
        export default UserDetails;