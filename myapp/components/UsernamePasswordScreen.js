/** components/UsernamePasswordScreen.js */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * This screen allows users to sign up by entering their email and password.
 * it includes functionality to show or hide the password and handles the sign-up process
 */
const UsernamePasswordScreen = ({ navigation }) => {
  // state variables for email, password, and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Tries to create a new user with email and password using firebase auth
   * navigates to the start screen upon successful sign-up
   * logs an error message if sign-up fails
   */
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Start Screen');
    } catch (error) {
      console.error("Sign-up error: ", error.message);
    }
  };

  /**
   * defineVisibility
   *
   * toggles the visibility of the password input
   */
  const defineVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      {/* email input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      {/* password input field with visibility toggle */}
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
          onPress={defineVisibility}>
          <Icon
            name="visibility"
            size={24}
            color='gray'
          />
        </TouchableOpacity>
      </View>
      
      {/* sign up button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSignUp}
      >
        <Text style={styles.logInText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * styles for the username and password screen
 *
 * defines the layout, positioning, colors, and text styles for the screen elements
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
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
  iconContainer: {
    padding: 10,
    position: 'absolute',
    right: 5,
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
  logInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UsernamePasswordScreen;