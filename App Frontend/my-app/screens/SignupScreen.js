import { Icon, Input, Pressable, Button as NativeBaseButton, Text } from 'native-base';
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
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
          Alert.alert('Sign Up Succesful , You Can Login Now!');
          navigation.navigate('Login');
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

      <Text style={styles.welcomeText}>Hi, Welcome to Sign Up! 👋</Text>

      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        h={12}
        mb={4}
        InputLeftElement={
          <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
        }
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />

      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        h={12}
        mb={4}
        InputLeftElement={
          <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
        }
        placeholder="Family"
        onChangeText={(text) => setFamily(text)}
      />

      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        h={12}
        mb={4}
        InputLeftElement={
          <Icon as={<MaterialIcons name="mail" />} size={5} ml="2" color="muted.400" />
        }
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        h={12}
        mb={4}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        type={show ? 'text' : 'password'}
      />

      {/* Sign Up Button */}
      <NativeBaseButton style={styles.signUpButton} onPress={handleSignUp}>
        Sign Up
      </NativeBaseButton>

      <Text style={styles.linkText}>Already have an account?</Text>

      {/* Sign In Button */}
      <NativeBaseButton
        style={styles.signInButton}
        onPress={() => navigation.navigate('Login')}
      >
        Sign In
      </NativeBaseButton>
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
  signUpButton: {
    width: '75%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green', // Customize the button color
    borderRadius: 8,
    marginBottom: 10,
  },
  signInButton: {
    width: '75%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue', // Customize the button color
    borderRadius: 8,
  },
  linkText: {
    marginTop: 10,
    color: 'blue',
  },
});

export default SignUpScreen;
