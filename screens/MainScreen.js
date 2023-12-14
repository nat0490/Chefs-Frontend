<<<<<<< HEAD:screens/MainScreen.tsx
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { DrawerActions } from '@react-navigation/routers';
>>>>>>> b60cbfa2fbe89e456c6491d920e84df2f741bd9f:screens/MainScreen.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MainScreen() {
  const navigation = useNavigation();

  const openDrawer = () => {
    //navigation.openDrawer();
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.8503,
          longitude: 4.3517,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Ajoute un marqueur statique pour un emplacement */}
        <Marker
          coordinate={{
            latitude: 50.8503,
            longitude: 4.3517,
          }}
          title="Bruxelles"
          description="Ville de Bruxelles"
        />
        {/* Tu peux ajouter plusieurs marqueurs pour différents chefs */}
      </MapView>
    </View>
    <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} >
            <Text style={styles.buttonText_sign_in}>Sign in</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav_bar_color: {
    backgroundColor: '#9292FE',
    height: 65,
  },
  marginTop: {
    margin: 20,
  },
  map: {
    flex: 0.35, // Ajuste la hauteur à 25% de la page
  },
});
