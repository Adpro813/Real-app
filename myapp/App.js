import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAw-YNYT_dLd2zzi4fP3x3Fzz4k1oojSFg",
  authDomain: "aroma-c1310.firebaseapp.com",
  databaseURL: "https://aroma-c1310-default-rtdb.firebaseio.com",
  projectId: "aroma-c1310",
  storageBucket: "aroma-c1310.appspot.com",
  messagingSenderId: "655198709057",
  appId: "1:655198709057:web:8074b6e7c5d9b734faedc0",
  measurementId: "G-62EM31RF55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error("Login error: ", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./images/logo.webp')}
          style={{ width: 180, height: 170 }}
        />
      </View>
      <View style={styles.formContainer}>
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

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleLogin}
        >
          <Text style={styles.logInText}>Log in</Text>
        </TouchableOpacity>

        <Text
          style={styles.guestText}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          Continue as Guest
        </Text>
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('UsernamePasswordScreen')}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const HomeScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text>Home Screen</Text>
    </View>
  );
}



const UsernamePasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Start Screen');
    } catch (error) {
      console.error("Sign-up error: ", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
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
      <TouchableOpacity
        style={styles.buttonContainer}
        
        onPress={handleSignUp}
      >
        <Text style={styles.logInText}>Sign Up</Text>
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
    paddingBottom: 20,
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
    marginTop: 15,
  },
  logInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: 200,
    backgroundColor: 'rgb(135,206,235)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  guestText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    bottom: 0,
    left: 5,
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
