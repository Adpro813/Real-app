// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './components/LoadingScreen';
import LogInScreen from './components/LoginScreen'; // Updated import to match casing
import HomeScreen from './components/HomeScreen';
import UsernamePasswordScreen from './components/UsernamePasswordScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Start Screen" component={LogInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UsernamePasswordScreen" component={UsernamePasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
