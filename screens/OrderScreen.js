import axios from 'axios'; 
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, ScrollView, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {addDate, addPrice, addAddress } from '../reducers/infoPourCommande';
import { useDispatch, useSelector } from 'react-redux'; 


export default function OrderScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoPourCommande = useSelector((state) => state.infoPourCommande.value);
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
// const [chefId, setChefId] = useState('658019be85ac5cd2de446d8e');
const [totalAmount, setTotalAmount ] = useState([]);
const chosenDate = useSelector(state => state.infoPourCommande.value.date);
const commande =  useSelector(state => state.infoPourCommande.value);
const [nbPeople, setNbPeople] = useState(1); 

const handleReturnLastPage = () => {
  navigation.navigate('BookDate');
}

const handleAddressConfirmation = async () => {
  setUserCoordinates(null); // Clear quand confirme again
  setConfirmedAddress(userAddress);

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
      navigation.navigate('PaymentScreen')
      dispatch(addAddress({ addresse: confirmedAddress }));
      // navigation.navigate('BookDate')
     };


     
     useEffect(() => {
      const fetchData = async () => {
        try {
          const chefId = '658019be85ac5cd2de446d8e';
          const response = await fetch(`https://chefs-backend-amber.vercel.app/recipes/${chefId}`);
          const data = await response.json();
          console.log(data);

          const basePrice = data.recipe.prix.minimum;
          const additionalPricePerPerson = data.recipe.prix.personneSup;
      
            // Calcul du total en fonction du nombre de personnes
      const calculatedTotal = basePrice + (additionalPricePerPerson * (nbPeople - 1));

      // Met à jour le state totalAmount avec le résultat du calcul
      setTotalAmount(calculatedTotal);

      // Dispatch du total dans le reducer
      dispatch(addPrice({ price: calculatedTotal }));
      

        } catch (error) {
          console.error('Error fetching data:', error)
        }
      };
  
      fetchData();
    }, [nbPeople, chosenDate]);

      
  return (
    <KeyboardAvoidingView  behavior="padding">
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.nav_bar_color}></View>
      <View style={styles.container}>
          {/* header section */}
        <View style={styles.topHead}>
          <View style={styles.containeur_fleche}>
          <FontAwesome onPress={handleReturnLastPage} name='arrow-left' size={22}  />
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

          {/* ---- BOTTOM SECTION ---- */}
        <View style={styles.section_box}>
        <View style={{ margin: 10}}>
            <Text style={styles.txt_h1}>Voir les détails de ma commande :</Text>
        </View>

        
        <Text style={{ margin: 10, color: '#5959F0'}}>{confirmedAddress} à {chosenDate}</Text>
        <View style={styles.recap}>
          <View style={styles.recapColumn1}>
            <Text style={{  color: '#5959F0'}}>Total : </Text>
        </View>
      <View style={styles.recapColumn2}>
          <Text style={{ fontWeight: 500, color: '#5959F0'}}>{commande.price}€ pour 2 personnes</Text> 
      </View>
      </View>

          {/* Bouton de connexion */}
        <TouchableOpacity  onPress={handleConfirmation} style={[styles.button, { marginTop: 20}]} >
          <Text style={styles.buttonText}>Je valide !</Text>
        </TouchableOpacity>
    </View>
    </View>
      <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
     }

const styles = StyleSheet.create({
  
  scrollContainer: {
    flexGrow: 0.8,
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
    //fontWeight: 700,
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
    borderRadius: 50,
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
    paddingVertical: 10,
    height: 200,
  },

  buttonText: {
      paddingVertical: 10, // 10 units of padding at the top and bottom
      paddingHorizontal: 25, // A
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#9292FE',
      backgroundColor: '#fff',
  },

  txt_h1: {
    color: '#5959F0',
    fontSize: 18,
  },
  
  basketDetail: {
    backgroundColor: 'red',
    flexDirection: 'row',
  },

  recap: {
    borderBottomColor: '#9292FE',
    borderBottomWidth: 2,
    width: 300,
    marginVertical: 5,
    flexDirection: 'row',
  },

  recapColumn1: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
  },

  recapColumn2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
  },

});
