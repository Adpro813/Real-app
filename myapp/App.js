import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
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

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <View style = {styles.logoContainer}>
      <Image
        source={require('./images/logo.webp')}
        style={{ width: 180, height: 170,}}
      />
      </View>
      <View style = {styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.logInText}>Log in</Text>
      </TouchableOpacity>

      <Text
        style={styles.guestText}
        onPress={() => navigation.navigate("HomeScreen")}
      >
      Guest
      </Text>
      <Text style={styles.signUpText}
      onPress = {() => navigation.navigate('SignUpScreen')}>
        Sign Up
      </Text>
      </View>
    </View>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text>Home Screen</Text>
    </View>
  );
}

const SignUpScreen = ({navigation}) => {
return(
  <View style={[styles.container, { backgroundColor: 'white' }]}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('InformationScreen')}
      >
        <Text style={styles.logInText}>Set Up Account</Text>
      </TouchableOpacity>
  </View>
);
}

const InformationScreen = ({navigation}) => {
  const [birthday, setBirthday] = useState('');
  return(
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={birthday}
        onChangeText={setBirthday}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('UsernamePasswordScreen')}
      >
        <Text style={styles.logInText}>Continue</Text>
      </TouchableOpacity>
  </View>
  );
}

const UsernamePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  return(
  <View style={[styles.container, { backgroundColor: 'white' }]}>
    <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Start Screen')}
      >
        <Text style={styles.logInText}>Continue</Text>
      </TouchableOpacity>
  </View>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Start Screen" component={LogInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="InformationScreen" component={InformationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UsernamePasswordScreen" component={UsernamePasswordScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20, // Adds padding at the bottom, pushing everything up
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 15
  },
  logInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: 200,
    width: 200,
    backgroundColor: 'rgb(135,206,235)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop:20
  },
  guestText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    bottom: 0,
    left: 20
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 1,
    padding: 10,
    marginBottom: 10,
  },
  signUpText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
});