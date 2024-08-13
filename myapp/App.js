import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Start Screen');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/logo.webp')}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

function StartScreen ({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}> 
        <Button
          title = "Log in"
          onPress={() => navigation.navigate('LogInScreen')} 
        />
      </View>
    </View>
  );
};

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
  <View style={styles.container}> 
    <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"

        value={email}
        onChangeText={setEmail}
      />  
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      <View style ={styles.buttonContainer}>
        <Button
          title = "Continue"
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
  </View>
  );
}

const HomeScreen = () => {
  return (
  <View style={styles.container}> 
    <Text>
      Home Screen
    </Text>
  </View>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Start Screen" component={StartScreen} options = {{headerShown:false}} />
      <Stack.Screen name="LogInScreen" component={LogInScreen} options = {{headerShown:false}} />
      <Stack.Screen name="Home Screen" component={HomeScreen} options = {{headerShown:false}} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    backgroundColor: '#c2d6f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10, 
    padding: 10,
  },

  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});