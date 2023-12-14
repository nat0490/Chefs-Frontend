import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Import des écrans
import EditProfilScreen from './EditProfilScreen';
import SupportScreen from './SupportScreen';
import NotificationScreen from './NotificationScreen';
import PastOrderScreen from './PastOrderScreen';
import ReportProblemScreen from './ReportProblemScreen';
import SecurityScreen from './SecurityScreen';


const Stack = createNativeStackNavigator();


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

export default function ProfilScreen() {
  return (
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