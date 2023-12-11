import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
import WishlistScreen from './screens/WishlistScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

//REDUX
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
//import { useDispatch, useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//const dispatch = useDispatch();


const store = configureStore({
  reducer: { user },
})


const NavigationContent = ({ isLoggedIn }) => {
  //const user = useSelector((state) => state.user.value);
  return (
    <Provider store={store}> 
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = '';

              if (route.name === 'Home') {
                iconName = 'home';
              }
               else if (route.name === 'Search') {
                iconName = 'search';
              } 
              else if (route.name === 'Wishlist') {
                iconName = 'heart';
              }
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#e8be4b',
            tabBarInactiveTintColor: '#b2b2b2',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Wishlist" component={WishlistScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Sign_up" component={SignUpScreen} />
          <Stack.Screen name="Sign_in" component={SignInScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </Provider>
  );
};

const App = () => {
  const userIsLoggedIn = false; // Remplacez ceci par votre logique d'authentification

  return <NavigationContent isLoggedIn={userIsLoggedIn} />;
};

export default App;


/*

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string = '';

        if (route.name === 'Home') {
          iconName = 'house';
        } else if (route.name === 'Search') {
          iconName = 'magnifying-glass';
        } else if (route.name === 'Wishlist') {
          iconName = 'heart';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#e8be4b',
      tabBarInactiveTintColor: '#b2b2b2',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen}/>
    </Tab.Navigator>
  );
};
*/
/*
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign_up" component={SignUpScreen} />
        <Stack.Screen name="Sign_in" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

*/
