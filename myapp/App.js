import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
/*
TODO ADITYA: 
-figure out how to redner the api call. (check if the api call even works

)
TODO ANSH: 
-figure out new styling methods
-figure out how to make the text and confirmation tingy look better
-maybe dabble in some shadows things. not sure if that will imporve. 
TODO IN GENERAL:
-have the wholle searching situation work
-make it so they can inpiut a list of ings (not just one), right now were using a string as an input
-blend the whole stylkng together
-make the output look better (the layout of the homescreen)

*/


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
    const checkAuthStatus = async () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.replace('HomeScreen');
        } else {
          navigation.replace('Start Screen');
        }
      });

      return () => unsubscribe();
    };

    checkAuthStatus();
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
//no need to touch 
function LogInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error("Login error: ", error.message);
    }
  };

  const defineVisiblity = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./images/logo.webp')}
          style={{ width: 180, height: 170 }}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={defineVisiblity}>
            <Icon
              name="visibility"
              size={20}
              color='gray'
            />
          </TouchableOpacity>
        </View>
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
          Guest
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
//Home screen, where most of the work is done, currently workng on it right now
const HomeScreen = () => {
  const [ingredient, setIngredient] = useState('')
  const [recipes, setRecipes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  //api call to get the recipes in a array
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&apiKey=1486f6ee64af433c9fb1d20d41e49e2a`);
      const data = await response.json();
      console.log(response);
      console.log(data);
      setRecipes(data);
    } catch (error) {
      console.log("Error fetching recipes:", error.message);
    }
  };
  
  useEffect(() => {
    let timeoutID;
    if (showAddedMessage) {
      timeoutID = setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [showAddedMessage]);

  useEffect(() => {
    if (ingredient) {
      fetchRecipes();
    }
  }, [ingredient]);

  function searchRecipes() {
    setIngredient(inputText);
    setInputText('');
    setShowAddedMessage(true);
  }

  return (
    <View style={styles.homeScreenContainer}>
      <View style={[styles.searchBarContainer, { backgroundColor: 'white' }]}>
        <View style={styles.searchBar}>
          <TextInput
            style={[styles.input, { paddingLeft: 30 }]}
            placeholder="Search Ingredient"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={searchRecipes}
          />
          <Icon
            style={[styles.iconContainer, { right: 312 }]}
            name="search"
            size={20}
            color='gray'
          />
        </View>
      </View>
      {/*This is the bigger recipeContainer, aditya work here */}
      <View style={styles.recipeContainer}>
      {recipes.map((recipe) => (
          <View key={recipe.id}>
            <Image source={{ uri: recipe.image }}>
            </Image>
          </View>
        ))}
        {/* This is the conformation, ansh work here */}
        {ingredient && showAddedMessage ? (
          <View style={styles.conformationContainer}>
            <Text style={styles.conformationText}>
              {ingredient} added
            </Text>
          </View>

        ) : null}
      </View>
    </View>
  );
}

//styling aspects

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
  inputContainer: {
    position: 'relative',
    width: 200,
    marginBottom: 7,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 1,
    padding: 10,
    paddingRight: 40,
  },
  signUpText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  iconContainer: {
    padding: 10,
    position: 'absolute',
    right: 5,
  },
  searchBarContainer: {
    flex: 2,
    backgroundColor: '#FAF0E6',
    alignItems: 'flex-left',
    justifyContent: 'flex-top',
    paddingTop: 35,
    paddingLeft: 11,
  },
  searchBar: {
    position: 'relative',
    width: 350,
    marginBottom: 7,
  },
  subTitle: {
    fontSize: 23,
    color: '#666',
    marginTop: 55,
    paddingLeft: 13,
    letterSpacing: 0.25,
  },
  conformationContainer: {
    position: 'absolute',
    bottom: 20,
    height: 40,
    width: 170,
    borderRadius: 10,
    borderColor: '#4CAF50',
    backgroundColor: '#2E6F40', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conformationText: {
    position: 'relative',
    fontSize: 18,
    color: "#FCFBF4",
  },
  homeScreenContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  recipeContainer: {
    flex: 4,
    justifyContent: 'flex-bottom',
    alignItems: 'center'
  }
});

const UsernamePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');


  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Start Screen');
    } catch (error) {
      console.error("Sign-up error: ", error.message);
    }
  };

  const defineVisiblity = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={defineVisiblity}>
          <Icon
            name="visibility"
            size={24}
            color='gray'
          />
        </TouchableOpacity>
      </View>
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
