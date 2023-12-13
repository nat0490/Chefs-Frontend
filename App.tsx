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
//For Home
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import WishlistScreen from './screens/WishlistScreen';
//For Profil
import EditProfilScreen from './screens/Profil/EditProfilScreen';
import SupportScreen from './screens/Profil/SupportScreen';
import NotificationScreen from './screens/Profil/NotificationScreen';
import PastOrderScreen from './screens/Profil/PastOrderScreen';
import ReportProblemScreen from './screens/Profil/ReportProblemScreen';
import SecurityScreen from './screens/Profil/SecurityScreen';
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
//const Drawer = createDrawerNavigator();
//const dispatch = useDispatch();



const HomeTabs = () => (
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
    
    <Tab.Screen name="Main" component={MainScreen} />
   
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Wishlist" component={WishlistScreen} /> 
{/*
    <Tab.Screen name="EditProfil" component={EditProfilScreen} />
    <Tab.Screen name="PastOrder" component={PastOrderScreen} />
    */}
  </Tab.Navigator>
);

const store = configureStore({
  reducer: { user },
})

/*
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="EditProfil" component={EditProfilScreen} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
      <Drawer.Screen name="Security" component={SecurityScreen} />
      <Drawer.Screen name="PastOrder" component={PastOrderScreen} />
      <Drawer.Screen name="HelpSupport" component={SupportScreen} />
      <Drawer.Screen name="Problem" component={ReportProblemScreen} />
    </Drawer.Navigator>
  );
}
*/


//BESOIN:
//dispatch(login({ username: signInUsername, token: data.token, id: data.id })); sur la page signin/signup
export default function App() {
  // Récupérer l'état d'authentification du store Redux
  useEffect(()=> {
    //const userToken = useSelector((state : UserState) => state.user.value || null);
   // console.log(userToken); 
    
  },[]);
  
  //const userToken = false;

  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {false ? (
            <>
              <Stack.Screen name="HomeTabs" component={HomeTabs} />

            </>
          ) : (
            <>
              
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Sign_in" component={SignInScreen} />
              <Stack.Screen name="Sign_up" component={SignUpScreen} />
              <Stack.Screen name="Preference" component={PreferencesScreen} />
              <Stack.Screen name="EditProfil" component={EditProfilScreen} />
              
            </>
          )}
          {/*<Stack.Screen name="EditProfil" component={EditProfilScreen} /> */}
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Security" component={SecurityScreen} />
          <Stack.Screen name="PastOrder" component={PastOrderScreen} />
          <Stack.Screen name="HelpSupport" component={SupportScreen} />
          <Stack.Screen name="Problem" component={ReportProblemScreen} /> 
        </Stack.Navigator>
        

      </NavigationContainer>
    </Provider>
  );
};



