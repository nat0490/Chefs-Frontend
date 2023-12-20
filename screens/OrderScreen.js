import axios from 'axios'; 
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, ScrollView, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function OrderScreen() {
  const navigation = useNavigation();
  // managing the comments 
  const [commentaireVisible, setCommentaireVisible] = useState(true); //
  const [commentaire, setCommentaire] = useState('');
  // managing map and addresses
  const [userAddress, setUserAddress] = useState(''); // stores user's input 
  const [confirmedAddress, setConfirmedAddress] = useState(null); // stores confirmed address after press button
  const [userCoordinates, setUserCoordinates] = useState(null); // stores coordinates of user's lat and long
  const [mapRegion, setMapRegion] = useState({
    // initialising region view of the map
    latitude: 50.8476,
    longitude: 4.3572,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

    // call function when presses button confirm address
  const handleAddressConfirmation = async () => {
    setConfirmedAddress(userAddress); // updating variables when confirming user's input

    try { // code might throw exceptions 
      // make the function waits until we have a Promise
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${userAddress}`);
      // console.log('Response data:', response.data);

      if (response.data.length > 0) { // means that the API found location data related to the entered address
        const { lat, lon } = response.data[0]; // extracts the lati and longi from the first element of the response
        // we update our state with the new value to use it later with the marker 
        // parsefloat function used to convert stirng values to decimal numbers by creating new object 
        setUserCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        console.error('No coordinates found for the input address');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };


     // managing the comments 
     const handleComment = (text) => { // calling the function when text input chages 
      setCommentaire(text);
      if (text.length > 0) {
        setCommentaireVisible('false')
      } else {
        setCommentaireVisible('true')
      }
    }

  return (
    <KeyboardAvoidingView  behavior="padding">
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.nav_bar_color}></View>
      <View style={styles.container}>
        <View style={styles.topHead}>
          <View style={styles.containeur_fleche}>
            <FontAwesome name='arrow-left' size={22} />
            <Text style={{marginLeft: 70 }}>Order details</Text>
        </View>
      </View>


          {/* --- TOP SECTION --- */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={mapRegion}
          >
            {confirmedAddress && (
              <Marker
                coordinate={{
                  latitude: userCoordinates?.latitude || mapRegion.latitude,
                  longitude: userCoordinates?.longitude || mapRegion.longitude,
                }}
                title="Ton addresse"
                description={confirmedAddress}
              />
            )}
          </MapView>
        </View>


            {/* addresses */}
        <View style={styles.containerAdresse}> 
          <View>
            <View>
              <TextInput
                placeholder="Entrez votre adresse"
                onChangeText={(address) => setUserAddress(address)}
                value={userAddress}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={handleAddressConfirmation}
                activeOpacity={1}
                style={styles.boxAddress}
              >
                <Text style={{fontSize: 10}}>Confirme ton addresse</Text>
              </TouchableOpacity>
              </View>
          </View>
        </View>

        {/* ---- MIDDLE SECTION ---- */}
        <View style={styles.bottom_boxSection}>
          <View> 
            <TextInput
              style={styles.commentaire}
              placeholder="Ajoute un commentaire pour ton chef (allergens, besoins spéciaux, etc"
              value={commentaire}
              onChangeText={handleComment}
            />
          </View>
        </View>

        <View
            style={{
              borderBottomColor: '#9292FE',
              borderBottomWidth: 2,
              marginVertical: 5, 
            }}
          />
        <View style={styles.section_box}>
        <View style={styles.box_titre}>
            {/*<FontAwesome name='heart' size={22}/> */}
            <Text style={styles.txt_h1}>Voir les détails de ma commande :</Text>
        </View>
        <View
            style={{
              borderBottomColor: '#9292FE',
              borderBottomWidth: 2,
              width : 260,
              marginVertical: 5,
            }}
          />

        <View>
          <Text>Je valide ! </Text>
        </View>
      </View>
    </View>
      <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  
  nav_bar_color: {
    backgroundColor: '#9292FE',
    width: '100%',
    height: 65,
  },

  container: {
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '10%',
    marginRight: '10%',
  },

  topHead: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },

  containeur_fleche: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
  },

  orderTitle: {
    color: '#5959F0',
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    alignItems: "flex-start",
    paddingBottom: 10,
  },

  // ---- TOP SECTION ----

  // map 
  mapContainer: {
    marginVertical: 0,
    alignItems: 'center',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 300,
  },

  // addresses

  containerAdresse: {
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: 'blue',
  },

  boxAddress: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
  },

    // --- MIDDLE SECTION --- 

  bottom_boxSection: { 
    height: '10%',
    backgroundColor: 'red',
  },
  
  bottom_box: {
    height: 60, // Ajustez la hauteur selon vos besoins (ou toute autre valeur fixe)
    marginTop: 10,
    backgroundColor: 'rgba(146, 146, 254, 0.19)',
    borderWidth: 0.5,
    borderColor: 'rgba(189, 189, 189, 0.00)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },


  section_box: {
    marginTop: 20,
    alignItems :  'center',
  },

  box_titre: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-around'
  },

  txt_h1: {
    color: '#5959F0',
    fontSize: 18,
  },
  
});
