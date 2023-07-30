import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const backgroundImage = require('../assets/Background.jpg');
const logoImage = require('../assets/app-logo.png');

const LunchScreenLoggedIn = ({ navigation, route }) => {
  // Get the user object from the route params
  const { user } = route.params;

  useEffect(() => {
    // Navigate to the tasks screen after a time delay (e.g., 2 seconds)
    const timer = setTimeout(() => {
      navigation.navigate('Tasks', { user: user });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, user]);

  return (
    <View style={styles.backgroundContainer}>
      {/* Display the background image */}
      <Image source={backgroundImage} style={styles.backgroundImage} resizeMode="cover" />

      <View style={styles.container}>
        {/* Display the logo */}
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />

        {/* Display the welcome message with the user's name */}
        <Text style={styles.welcomeText}>Hi, Welcome Back {user.Name}!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
});

export default LunchScreenLoggedIn;
