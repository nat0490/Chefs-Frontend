//import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
   

//Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer';

//IMPÖRT DES SCREENS
//For LOG
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import PreferencesScreen from './screens/PreferencesScreen'
import TermsScreen from './screens/TermsScreen'
//For Home
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import WishlistScreen from './screens/WishlistScreen';
//For Profil
import EditProfilScreen from './screens/Profil/EditProfilScreen';
import PastOrderScreen from './screens/Profil/PastOrderScreen';
import SettingScreen from './screens/Profil/SettingScreen';
import EditProfilChefScreen from './screens/Profil/EditProfilCheef';
//A TRIER
import BookDateScreen from './screens/BookDateScreen';
import ConfigureOrderScreen from './screens/ConfigureOrderScreen';
import DishScreen from './screens/DishScreen';
import MainScreen from './screens/MainScreen';
import OrderScreen from './screens/OrderScreen';
//import ProfilScreen from './screens/Profil/ProfilScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

//REDUX
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

//const navigation = useNavigation();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName = '';
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Search') {
        iconName = 'search';
      } else if (route.name === 'Wishlist') {
        iconName = 'heart';
      }
      return <FontAwesome name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#e8be4b',
    tabBarInactiveTintColor: '#b2b2b2',
    headerShown: false,
  })}>
    
    <Tab.Screen name="Main" component={MainScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Wishlist" component={WishlistScreen} /> 
  </Tab.Navigator>
);

const store = configureStore({
  reducer: { user },
})



export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EditProfil" component={EditProfilScreen} />
          <Stack.Screen name="EditProfilChef" component={EditProfilChefScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="Sign_in" component={SignInScreen} />
          <Stack.Screen name="Sign_up" component={SignUpScreen} />
          <Stack.Screen name="Preference" component={PreferencesScreen} />
          <Stack.Screen name="Terms" component={TermsScreen}/>
          <Stack.Screen name="PastOrder" component={PastOrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};



