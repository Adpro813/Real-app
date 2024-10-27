// components/UsernamePasswordScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const UsernamePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Start Screen');
    } catch (error) {
      console.error("Sign-up error: ", error.message);
    }
  };

  const defineVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          onPress={defineVisibility}>
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
};

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
