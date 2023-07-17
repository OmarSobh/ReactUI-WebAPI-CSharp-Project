import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://omarsobh.bsite.net/api/tasks');

      if (response.ok) {
        const data = await response.json();
        setTasks(data); // Update the state with the fetched tasks
        console.log(data)
      } else {
        const errorText = await response.text();
        console.log('Error:', response.status, errorText); // Handle network errors and display more information about the error
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <Text key={task.id}>{task.name}</Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Text>Client side</Text>
      <Button onPress={fetchTasks} title="Get All Tasks" />
      {renderTasks()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
