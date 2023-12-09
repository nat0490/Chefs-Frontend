import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//IMPÖRT DES SCREENS
import BookDateScreen from './screens/BookDateScreen';
import ConfigureOrderScreen from './screens/ConfigureOrderScreen';
import DishScreen from './screens/DishScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import OrderScreen from './screens/OrderScreen';
import ProfilScreen from './screens/ProfilScreen';
import SearchScreen from './screens/SearchScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});