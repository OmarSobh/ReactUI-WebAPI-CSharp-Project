import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Text } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Perform form validation here if needed
    if (!name || !family || !email || !password) {
      Alert.alert('Validation Error', 'Please fill in all the fields.');
      return;
    }

    // Prepare the user data to send to the API
    const userData = {
      Name: name,
      Family: family,
      Email: email,
      Password: password,
    };

    // Send the user data to the API
    fetch('https://omarsobh.bsite.net/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Sign Up Successful');
          navigation.navigate('Tasks', { user: data });
        } else {
          Alert.alert('Sign Up Failed', 'Unable to sign up. Please try again later.');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'An error occurred. Please try again later.');
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Family"
        onChangeText={(text) => setFamily(text)}
        value={family}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.linkText}>Already have an account?</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
});

export default SignUpScreen;
