//import 'react-native-gesture-handler';
import * as React from 'react';
//Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer';

//IMPÖRT DES SCREENS
//For LOG
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import PreferencesScreen from './screens/PreferencesScreen'
import TermsScreen from './screens/TermsScreen'
//For Home
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
//For Profil
import EditProfilScreen from './screens/Profil/EditProfilScreen';
import PastOrderScreen from './screens/Profil/PastOrderScreen';
import SettingScreen from './screens/Profil/SettingScreen';
import EditProfilChefScreen from './screens/Profil/EditProfilChef';
import AddNewRecipeScreen from './screens/Profil/AddNewRecipeScreen';

//A TRIER
import BookDateScreen from './screens/BookDateScreen';
import ConfigureOrderScreen from './screens/ConfigureOrderScreen';
import DishScreen from './screens/DishScreen';
import MainScreen from './screens/MainScreen';
import OrderScreen from './screens/OrderScreen';
import HomePlatScreen from './screens/Home_platsScreen';
import HomeChefScreen from './screens/Home_chefsScreen';
import OrderCheckProfile from './screens/OrderCheckProfile';
import ChefScreen from './screens/ChefScreen';
import PaymentScreen from './screens/PaymentScreen';


//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faHeart, 
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons'

//REDUX
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import typeCuisine from './reducers/typeCuisine';
import ustensil from './reducers/ustensils';
import chef from './reducers/chef';
import infoPourCommande from './reducers/infoPourCommande';


//const navigation = useNavigation();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// Écran principal de la tabBar
const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="Dish" component={DishScreen} options={{ tabBarVisible: true }}/>
    <Stack.Screen name="ChefScreen" component={ChefScreen} options={{ tabBarVisible: true }}/>
    
  </Stack.Navigator>
);

// Écran de la tabBar "Wishlist"
/*
const WishlistStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Wishlist" component={WishlistScreen} />
  </Stack.Navigator>
);*/



// Écran principal des onglets
const HomeTabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: () => {
      let iconName = '';
      if (route.name === 'Home') {
        iconName = faHouseChimney;
      } else if (route.name === 'Search') {
        iconName = faHeart;
      }
      return <FontAwesomeIcon icon={iconName} style={{ color: "#5959f0" }} />;
    },
    tabBarActiveTintColor: '#e8be4b',
    tabBarInactiveTintColor: '#b2b2b2',
    headerShown: false,
  })}>
    {/* Associez chaque onglet à sa pile de navigation respective */}
    
    <Tab.Screen name="MainStack" component={MainStack} />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
);


const store = configureStore({
  reducer: { user, typeCuisine, ustensil, chef, infoPourCommande },
})




export default function App() {
 
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/*PAGE DACCEUIL */}
          <Stack.Screen name="AcceuilLog" component={HomeScreen} />
          {/* PARTIE LOGIN/ ACCES AVANT CONNECTION */}
          <Stack.Screen name="Sign_in" component={SignInScreen} />
          <Stack.Screen name="Sign_up" component={SignUpScreen} />
          <Stack.Screen name="Preference" component={PreferencesScreen} />
          <Stack.Screen name="HomePlat" component={HomePlatScreen} />
          <Stack.Screen name="HomeChefs" component={HomeChefScreen} />
          <Stack.Screen name="Terms" component={TermsScreen}/>
          {/*ACCES APRES CONNECTION */}
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
         
          
          {/*PARTIE EDIT PROFIL */}
          <Stack.Screen name="Setting" component={SettingScreen} options={{ tabBarVisible: false }} />
          <Stack.Screen name="EditProfil" component={EditProfilScreen} options={{ tabBarVisible: false }} />
          <Stack.Screen name="EditProfilChef" component={EditProfilChefScreen} options={{ tabBarVisible: false }} />
          <Stack.Screen name="AddNewRecipe" component={AddNewRecipeScreen} options={{ tabBarVisible: false }} />
          <Stack.Screen name="PastOrder" component={PastOrderScreen} options={{ tabBarVisible: false }} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="OrderDetails" component={OrderScreen}  />
          
          <Stack.Screen name="BookDate" component={BookDateScreen} />
          <Stack.Screen name="CheckProfile" component={OrderCheckProfile} options={{ tabBarVisible: true }}/>
         
          <Stack.Screen name="ConfigureOrder" component={ConfigureOrderScreen} />
           
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}






