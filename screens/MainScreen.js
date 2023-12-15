import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const foodIcon = require('../assets/user.png');

export default function MainScreen() {

  const navigation = useNavigation();
  
  const [location, setLocation] = useState(null);
  const [chefAddresses, setChefAddresses] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  useEffect(() => {
    const fetchChefAddresses = async () => {
      const response = await fetch('http://192.168.154.247:3000/users/chef/userchefs/addresses', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      // Filtrer les adresses sans coordonnées
      const filteredAddresses = data.filter(address => address.coordinates.latitude && address.coordinates.longitude);


      // Placer le console.log ici pour vérifier les données avant de les utiliser
      console.log('Adresses des chefs : ', filteredAddresses);

      setChefAddresses(filteredAddresses);
    };

    fetchChefAddresses();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location ? location.coords.latitude : 50.8503,
              longitude: location ? location.coords.longitude : 4.3517,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {chefAddresses.map((address, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: address.coordinates.latitude,
                  longitude: address.coordinates.longitude,
                }}
                title={`Chef ${index + 1}`}
                description={address.address}
              />
            ))}
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Ma position"
                description="Je suis ici"
              >
                <Image source={foodIcon} style={{ width: 30, height: 30 }} />
              </Marker>
            )}
          </MapView>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.btn_sign_in}>
            <Text style={styles.buttonText_sign_in}>Réserve maintenant !</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.btn_sign_up} onPress={()=> navigation.navigate('Setting')}>
            <Text style={styles.buttonText_sign_up}>SETTING PAGE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav_bar_color: {
    backgroundColor: '#9292FE',
    height: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mapContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 300,
  },
  btnContainer: {
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    bottom: 20,
  },
  btn_sign_in: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: '#9292FE',
  },
  buttonText_sign_in: {
    fontSize: 15,
    color: '#fff',
  },
  btn_sign_up : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
    marginTop: 10,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText_sign_up: {
    fontSize : 15,
    color : '#9292FE',
    textAlign: 'center',
  }
});
