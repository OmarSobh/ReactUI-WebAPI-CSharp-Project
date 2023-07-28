import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const backgroundImage = require('../assets/Background.jpg');
const logoImage = require('../assets/app-logo.png');

const LunchScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the sign-up screen after a time delay (e.g., 2 seconds)
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.backgroundContainer}>
      {/* Background Image */}
      <Image source={backgroundImage} style={styles.backgroundImage} resizeMode="cover" />

      <View style={styles.container}>
        {/* Display the logo */}
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
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
});

export default LunchScreen;
