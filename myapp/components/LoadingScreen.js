// components/LoadingScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuthStatus = () => {
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
        source={require('../images/logo.webp')}
        style={{ width: 200, height: 200 }}
      />
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
});

export default LoadingScreen;
