import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return(
      <View style = {styles.container}> 
    <ImageLoader>
    </ImageLoader>
    <StatusBar style="auto" />
  </View>
  );
}
const ImageLoader =  () => {
  return(
    <View style={styles.container}>
      <Image
        source={require('./images/logo.webp')}
        style={{width: 200, height: 200}} />
    </View>
  );
  
}
const AppNavigator = () => {
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

