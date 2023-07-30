import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { Text } from 'react-native-paper';

const logoImage = require('../assets/app-logo.png'); // Update the image path accordingly

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform form validation here if needed
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all the fields.');
      return;
    }

    // Prepare the login data to send to the API
    const loginData = {
      Email: email,
      Password: password,
    };

    // Send the login data to the API
    fetch('https://omarsobh.bsite.net/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Login successful, navigate to the tasks screen with the user data
          navigation.navigate('LunchLoggedIn', { user: data });
          // navigation.navigate('Tasks', { user: data });
        } else {
          // Login failed, display an error message
          Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'An error occurred. Please try again later.');
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Display the logo at the top */}
      <Text style={styles.welcomeText}>Login Screen</Text>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />

      <Text style={styles.welcomeText}>Hi, Welcome Back! 👋</Text>

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
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.linkText}>Don't have an account?</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30, // Adjust the margin based on your layout
  },
  linkText: {
    marginTop: 10,
    color: 'blue',
  },welcomeText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default LoginScreen;
