import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LunchScreen from './screens/LunchScreen';
import TaskScreen from './screens/TasksScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen ';
import CreateTaskScreen from './screens/CreateTaskScreen ';
import LunchScreenLoggedIn from './screens/LunchScreenLoggedIn';
import { NativeBaseProvider } from 'native-base';
import { PaperProvider } from 'react-native-paper';
import UserDetails from './screens/UserDetails';
import Admin from './screens/Admin';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lunch" screenOptions={({ route }) => ({
            headerShown: false,
            gestureEnabled: route.name === 'Lunch' ? false : true,
          })}>
            <Stack.Screen name="Lunch" component={LunchScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Tasks" component={TaskScreen} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
            <Stack.Screen name="LunchLoggedIn" component={LunchScreenLoggedIn} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default App;
