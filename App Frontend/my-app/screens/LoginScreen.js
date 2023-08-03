import { Icon, Input, Pressable } from 'native-base';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const logoImage = require('../assets/app-logo.png'); // Update the image path accordingly

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);


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
        if (email === 'john@example.com' && password === '123456') {
          // Directly navigate to the desired screen
          navigation.navigate('Admin', { user:  data ,navigation:navigation });
          return;
        }
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

      <Input
        w={{
          base: "75%",
          md: "25%"
        }}
        h={12} // Adjust the height to make the input bigger
        mb={4} // Add margin at the bottom to create a gap between inputs
        InputLeftElement={
          <Icon as={<MaterialIcons name="mail" />}
          size={5} ml="2" color="muted.400"
          />}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        w={{
          base: "75%",
          md: "25%"
        }}
        h={12} // Adjust the height to make the input bigger
        mb={4} // Add margin at the bottom to create a gap between inputs
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
            size={5} mr="2" color="muted.400"
            />
          </Pressable>
        }
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        type={show ? "text" : "password"}
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
