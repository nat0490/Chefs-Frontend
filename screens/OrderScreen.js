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

    // stock number of persons booked
  const [chefId, setChefId] = useState('658019be85ac5cd2de446d8e');
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ nbPers, setNbPers ] = useState(0);


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

    // managing button to confirm order handleConfirmation
    const handleConfirmation = () =>{
      navigation.navigate('BookDate')
     };

     useEffect(() => {
      fetch(`http://localhost:3000/recipes/${chefId}`)
      .then(response => response.json())
      .then(data => {
        setTotalAmount(data.prix);

        const person = data.person && data.person.map((person, index) => {
          <TouchableOpacity key={index} activeOpacity={1}>
            <Text>{person.prix}</Text>
          </TouchableOpacity>
        })
        setNbPers(nbPers)
      }); 
     }, []);


      
  return (
    <KeyboardAvoidingView  behavior="padding">
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.nav_bar_color}></View>
      <View style={styles.container}>
          {/* header section */}
        <View style={styles.topHead}>
          <View style={styles.containeur_fleche}>
            <FontAwesome name='arrow-left' size={22} />
            <Text style={styles.orderTitle}>Order details</Text>
        </View>
      </View>

          {/* --- TOP SECTION --- */}
        <View style={styles.page}>
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
          </View>

            {/* addresses */}
        <View style={styles.containerAdresse}> 
          <View style={styles.containerConfirm}>
            <View>
              <TextInput
                placeholder="Entrez votre adresse"
                onChangeText={(address) => setUserAddress(address)}
                value={userAddress}
                style={styles.fullWidthInput}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={handleAddressConfirmation}
                activeOpacity={1}
                style={styles.confirmButton}
              >
                <Text style={{ fontSize: 12, color: 'white' }} >Confirme ton addresse</Text>
              </TouchableOpacity>
              </View>
          </View>
        </View>

        {/* ---- MIDDLE SECTION ---- */}
        <View style={styles.bottom_boxSection}>
          <View style={styles.bottom_box}> 
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
        <View >
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
          <Text>{nbPers} </Text>
        </View>
      </View>

          {/* Bouton de connexion */}
        <TouchableOpacity  onPress={handleConfirmation} style={[styles.button, { marginTop: 20}]} >
          <Text style={styles.buttonText}>Je valide !</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(146, 146, 254, 0.15)',
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  containeur_fleche: {
    width: "80%",
  },

  orderTitle: {
    color: '#5959F0',
    fontSize: 20,
    paddingLeft: 60,
    fontWeight: '700',
    marginBottom: 10,
  },


  // ---- TOP SECTION ----

  ContainMap: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  mapContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  map: {
    width: '100%',
    height: 250,
    backgroundColor: 'rgba(146, 146, 254, 0.25)',
  },

  // addresses

  containerAdresse: {
    alignItems: 'center',
    justifyContent: 'space-between', 
  },

  containerConfirm: {
    justifyContent: 'space-between',  
    alignItems: 'center',
  },

  fullWidthInput: {
  width: 300,
  margin: 3,
  borderBottomWidth: 1,  // Use borderBottomWidth instead of borderWidth
  borderColor: '#9292FE',  // Set the border color
  paddingVertical: 8,  // Adjust vertical padding for better appearance
  paddingHorizontal: 0, 
  },

  confirmButton: {
    backgroundColor: '#9292FE',
    marginTop: 10,
    padding: 10,
    borderRadius: 50,  // Makes it round
    alignItems: 'center',
    justifyContent: 'center', 
  },

  bottom_box: {
    width:'100%',
    height: '70%',
    marginTop: 20,
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

    // --- MIDDLE SECTION --- 

  bottom_boxSection: { 
    height: 80,
    marginTop: 10,
  },

  section_box: {
    alignItems: 'center',
    paddingVertical: 20,
    height: 230,
  },

  buttonText: {
    color: '#9292FE',
    fontSize: 16,
    textAlign: 'center',
  },

  txt_h1: {
    color: '#5959F0',
    fontSize: 18,
  },
  
});
