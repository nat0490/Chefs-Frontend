import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faBowlFood, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const foodIcon = require('../assets/user.png');

export default function MainScreen() {

  const navigation = useNavigation();
  
  const [location, setLocation] = useState(null);
  const [chefAddresses, setChefAddresses] = useState([]);
//   //  état pour stocker les recettes du chef sélectionné
// const [selectedChefRecipes, setSelectedChefRecipes] = useState([]);


//ATTENTION!! 
//MODIF FAITE SUR LES USEEFFECT AFIN DEVITER LES MSG DERREURS
//VERSION PRECEDENTE LAISSE EN COMMENTAIRE


/*
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
}, []);*/

//V2 pour enlever les message d'erreur à l'arrivé sur la page (rajout du catch)
useEffect(() => {
  (async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error in location request:', error);
    }
  })();
}, []);


// // // Fonction pour récupérer les recettes du chef sélectionné
// // const fetchSelectedChefRecipes = async (chefId) => {
// //   try {
// //     // Récupérer les recettes du chef via une requête HTTP
// //     const response = await fetch(`http://192.168.1.58:3000/users/chef/${chefId}/recipes`, {
// //       method: 'GET',
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //     if (!response.ok) {
// //       throw new Error(`HTTP error! Status: ${response.status}`);
// //     }
// //     const data = await response.json();
// //     // Mettre à jour l'état des recettes du chef sélectionné
// //     setSelectedChefRecipes(data.recipes);
// //   } catch (error) {
// //     console.error('Erreur lors de la récupération des recettes du chef :', error);
// //   }
// };



// Hook useEffect pour charger les adresses des chefs au chargement initial de la page
/*useEffect(() => {
  const fetchChefAddresses = async () => {
    const response = await fetch('http://192.168.1.58:3000/users/chef/userchefs/addresses', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    // Filtrer les adresses sans coordonnées
    const filteredAddresses = data.filter(address => address.coordinates.latitude && address.coordinates.longitude);

   

    setChefAddresses(filteredAddresses);
  };

  fetchChefAddresses();
}, []);*/


//V2 POUR ENLEVER LES MESSAGE DERREUR A LARRIVE SUR LA PAGE (rajout du catch) + modif adresse (mis celle de vercel)

useEffect(() => {
  const fetchChefAddresses = async () => {
    try {
      const response = await fetch('https://chefs-backend-amber.vercel.app/users/chef/userchefs/addresses', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      // Filtrer les adresses sans coordonnées
      const filteredAddresses = data.filter(address => address.coordinates.latitude && address.coordinates.longitude);

      setChefAddresses(filteredAddresses);
    } catch (error) {
      console.error('Error fetching chef addresses:', error);
    }
  };

  fetchChefAddresses();
}, []);




// // Fonction pour gérer le clic sur un marqueur de chef
// const handleChefMarkerPress = (chefId) => {
//   fetchSelectedChefRecipes(chefId);
// };


     {/* <View style={styles.container_box_width}>
          <ScrollView contentContainerStyle={styles.containeur_box}>
           {selectedChefRecipes.map((recipe, index) => (
            <TouchableOpacity key={index} activeOpacity={1} style={styles.box}>
            <Image source={{ uri: recipe.image }} style={styles.photo} />
            <Text style={styles.margin_rigth}>{recipe.title}</Text>
            <View style={styles.box_description}>
            <FontAwesomeIcon icon={faBowlFood} />
            <Text> {recipe.type}</Text>
           </View>
           </TouchableOpacity>
           ))}
         </ScrollView>
       </View>
           */}

           // onPress={() => handleChefMarkerPress(address.chefId)} // Appel de la fonction pour récupérer les recettes du chef au clic

  

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

{/*NE PAS EFFACER! MERCI!! Acces à la page setting!! */}
      <View style={styles.accesSetting}> 
        <TouchableOpacity onPress={()=> navigation.navigate('Setting')} style={styles.btnSettingAcces}>
            <FontAwesomeIcon icon={faCircleUser} style={{color: "#5959f0",}} size={50} />
        </TouchableOpacity>
      </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.Réserve}>
            <Text style={styles.Réserve_maintenant}>Réserve maintenant !</Text>
          </TouchableOpacity>                   
        </View>
        <View style={styles.container_box_width}>
        <View style={styles.containeur_box}>
          <TouchableOpacity activeOpacity={1} style={styles.box}>
            <Image source={require('../assets/chefNaima.jpg')} style={styles.photo} />
              <Text style={styles.margin_rigth}>Nouille</Text>
              <View style={styles.box_description }>
              <FontAwesomeIcon icon={faBowlFood}/>
                <Text >  Italien</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.box}>
            <Image source={require('../assets/chefNaima.jpg')} style={styles.photo} />
              <Text style={styles.margin_rigth}>Pasta</Text>
              <View style={styles.box_description }>
              <FontAwesomeIcon icon={faBowlFood}/>
                <Text>  Italien</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.box}>
              <Image source={require('../assets/chefNaima.jpg')} style={styles.photo} />
              <Text style={styles.margin_rigth}>Pizza</Text>
                <View style={styles.box_description }>
                <FontAwesomeIcon icon={faBowlFood}/>
                  <Text >  Italien</Text>
                </View>
          </TouchableOpacity>
        </View>
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
    marginVertical: 0,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 500,
  },
  btnContainer: {
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    bottom: 20,

  },
  Réserve: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: '#9292FE',
    marginVertical: 10,
  },
  Réserve_maintenant: {
    fontSize: 15,
    color: '#fff',
  },

  container_box_width: {
    width: '80%',
    alignSelf: 'center', // Centre horizontalement
    
    flex: 1,
    alignItems: 'center', // Centre verticalement
    marginBottom: 20, // Ajoute un espacement en bas
    justifyContent : 'space-around',
  },

  photo:{
    width : "100%",
    height: 100
  },
  containeur_box: {
      height : 160,
      marginTop : 10,
      flexDirection: 'row',
      width: '100%',
      justifyContent : 'space-around',
      flexWrap: 'wrap',
  },
  box : {
    width : 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius : 10,
    borderWidth: 2,
    borderColor: '#5959F0',
    justifyContent : 'space-between',
    flexDirection: 'column',
  },
  box_description : {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft : 5,
  },
  margin_rigth:{
    marginLeft : 5,
  },
  photo_preferences :{
    width: 15,
    height: 15
  },
  txt_preferences : {
    fontSize: 8,
  },
//A EFFACER QUAND LA NAVIGATION VERS SETTING PAGE SERA FAITE

buttonText_sign_up: {
  fontSize : 15,
  color : '#9292FE',
  textAlign: 'center',
},
btnSettingAcces: {
  padding: 10,
  //backgroundColor: '#fff',
  },
accesSetting: {
 maxWidth: '15%'
  }
/////////////


});


