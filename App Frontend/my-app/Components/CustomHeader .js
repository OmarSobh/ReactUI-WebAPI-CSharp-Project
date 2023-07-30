import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { IconButton, Drawer, Box, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const logoImage = require('../assets/app-logo.png');

const CustomHeader = ({ navigation, route }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen, { user: route });
    handleCloseDrawer();
  };

  const handleLogout = () => {
      setIsDrawerOpen(false);
      setIsLoggingOut(true);
  
      setTimeout(() => {
        setIsLoggingOut(false);
        navigation.navigate('Login');
      }, 500);
    };
  
    const showLogoutAlert = () => {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout', style:"destructive",
            onPress: () => handleLogout(),
          },
        ],
        { cancelable: false }
      );
    };
  return (
    <View>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        contentContainerStyle={styles.drawerContent}
      >
        <Box flex={1} p={4} bg="#007bff">
          <View style={styles.drawerHeader}>
            {/* Add your logo or header here */}
            <IconButton
              icon={<MaterialIcons name="close" size={24} color="#fff" />}
              onPress={handleCloseDrawer}
            />
            <Image source={logoImage} style={styles.logo} />
          </View>
          <View style={styles.drawerLinks}>
            <Text onPress={() => handleNavigation('Profile')} py={2} color="#fff">
              <MaterialIcons name="account-circle" size={24} color="#fff" /> Profile
            </Text>
            <Text onPress={() => handleNavigation('Tasks')} py={2} color="#fff">
              <MaterialIcons name="list" size={24} color="#fff" /> Tasks
            </Text>
            <Text onPress={() => handleNavigation('CreateTask')} py={2} color="#fff">
              <MaterialIcons name="add-circle" size={24} color="#fff" /> Create Task
            </Text>
            {/* Add other options here */}
          </View>
          <View style={styles.drawerFooter}>
          </View>
            <Text onPress={showLogoutAlert} py={2} color="#fff">
              <MaterialIcons name="logout" size={24} color="#fff" /> Logout
            </Text>
        </Box>
      </Drawer>
      <View style={styles.header}>
        {/* Back Icon */}
        <IconButton
          icon={<MaterialIcons name="arrow-back" size={32} color="#fff" />}
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        />
        {/* Logo */}
        <Image source={logoImage} style={styles.logo} />
        {/* Menu Icon */}
        <IconButton
          icon={<MaterialIcons name="menu" size={32} color="#fff" />}
          onPress={handleOpenDrawer}
          style={styles.menuIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    height: 120,
  },
  backIcon: {
    marginTop: 50,
  },
  menuIcon: {
    marginTop: 50,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 50,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  drawerLinks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    marginTop: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomHeader;
