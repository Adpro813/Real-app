/* components/LoadingScreen.js */

import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

/*
  loading screen component

  this screen shows a logo while checking if the user is logged in.
  depending on the auth status, it navigates to the home screen or the start screen
*/
const LoadingScreen = ({ navigation }) => {
  
  /* useEffect runs when the component mounts
  * it checks the authentication status of the user
  */
  useEffect(() => {
    const checkAuthStatus = () => {
      // listen for auth state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // if user is logged in, go to home screen
          navigation.replace('HomeScreen');
        } else {
          navigation.replace('Start Screen');
        }
      });

      // clean up the listener when the component unmounts
      return () => unsubscribe();
    };

    // call the auth check function
    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* display the logo image */}
      <Image
        source={require('../images/logo.webp')}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

/** 
* styles for the loading screen centers the logo and sets the background color
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});

export default LoadingScreen;