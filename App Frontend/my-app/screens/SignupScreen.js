import { Icon, Input, Pressable } from 'native-base';
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Image } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const logoImage = require('../assets/app-logo.png'); // Update the image path accordingly

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

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
      <Text style={styles.welcomeText}>Sign Up Screen</Text>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />

      <Input
        w={{
          base: "75%",
          md: "25%"
        }}
        h={12} // Adjust the height to make the input bigger
        mb={4} // Add margin at the bottom to create a gap between inputs
        InputLeftElement={
          <Icon as={<MaterialIcons name="person" />}
          size={5} ml="2" color="muted.400"
          />}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />

      <Input
        w={{
          base: "75%",
          md: "25%"
        }}
        h={12} // Adjust the height to make the input bigger
        mb={4} // Add margin at the bottom to create a gap between inputs
        InputLeftElement={
          <Icon as={<MaterialIcons name="person" />}
          size={5} ml="2" color="muted.400"
          />}
        placeholder="Family"
        onChangeText={(text) => setFamily(text)}
      />

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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  linkText: {
    marginTop: 10,
    color: 'blue',
  },
});

export default SignUpScreen;
