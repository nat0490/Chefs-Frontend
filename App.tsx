//import 'react-native-gesture-handler'; 
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

//IMPÖRT DES SCREENS
//For LOG
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
//For Home
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import WishlistScreen from './screens/WishlistScreen';
//For Profil
import EditProfilScreen from '../frontend/screens/Profil/EditProfilScreen';
import SupportScreen from '../frontend/screens/Profil/SupportScreen';
import NotificationScreen from '../frontend/screens/Profil/NotificationScreen';
import PastOrderScreen from '../frontend/screens/Profil/PastOrderScreen';
import ReportProblemScreen from '../frontend/screens/Profil/ReportProblemScreen';
import SecurityScreen from '../frontend/screens/Profil/SecurityScreen';

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
//import { useDispatch, useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
//const dispatch = useDispatch();


const store = configureStore({
  reducer: { user },
})

/*
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

export default App; */




const TabNavigatorForHome = () => {
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

const DrawerNavigatorForProfil = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
        <Drawer.Screen name="EditProfil" component={EditProfilScreen} />
        <Drawer.Screen name="Notification" component={NotificationScreen} />
        <Drawer.Screen name="Security" component={SecurityScreen} />
        <Drawer.Screen name="PastOrder" component={PastOrderScreen} />
        <Drawer.Screen name="HelpSupport" component={SupportScreen} />
        <Drawer.Screen name="Problem" component={ReportProblemScreen}  />
      </Drawer.Navigator>
/*
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EditProfil" component={EditProfilScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="PastOrder" component={PastOrderScreen} />
        <Stack.Screen name="HelpSupport" component={SupportScreen} />
        <Stack.Screen name="Problem" component={ReportProblemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    */
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="DrawerNavigatorForProfil" component={DrawerNavigatorForProfil} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign_up" component={SignUpScreen} />
        <Stack.Screen name="Sign_in" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


