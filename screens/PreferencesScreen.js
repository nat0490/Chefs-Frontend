import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ScrollView, Text, View ,TouchableOpacity, Alert} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export default function OrderScreen() {
  const navigation = useNavigation();

  // État pour suivre si le bouton a été cliqué
  const [buttonClicked, setButtonClicked] = useState(false);

  // État pour stocker les données de préférence
  const [preferenceData, setPreferenceData] = useState([]);

  // État pour suivre les couleurs actives des préférences
  const [activeColors, setActiveColors] = useState(preferenceData.map(() => false));

  // État pour stocker les ID sélectionnés
  const [selectedIds, setSelectedIds] = useState([]);

  // Fonction pour gérer le clic sur une préférence
  const handlePress = (id_preferences) => {
    setSelectedIds([...selectedIds, id_preferences]);
  }

  // Import des REDUCER
  const user = useSelector((state) => state.user.value);
  const typeCuisine = useSelector((state) => state.typeCuisine.value);
  
  //console.log(typeCuisine);




 

  // Fonction pour soumettre les préférences sélectionnées
  const handleSubmit = () => {
    fetch(`https://chefs-backend-amber.vercel.app/users/profil/add-preference/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPreference: [...selectedIds] }),
    })
      .then(response => response.json())
      .then(data => {
        setSelectedIds([]);
        setActiveColors([])
        Alert.alert('Parfait, nous avons ajouté vos informations à vos préférences');
        navigation.navigate('Terms');
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  

  //tris des type par ordre alphabétique
const newlisteType = [... typeCuisine] 
newlisteType.sort((a, b) => {
    const cuisineA = a.cuisine.toUpperCase(); // ignore la casse
    const cuisineB = b.cuisine.toUpperCase(); // ignore la casse
    if (cuisineA < cuisineB) {
      return -1;
    }
    if (cuisineA > cuisineB) {
      return 1;
    }
    return 0;
  });


  // AFFICHAGE DES PREFERENCES
  const preferences = newlisteType.map((data, i) => (
    <TouchableOpacity
      key={i}
      onPress={() => {
        handlePress(data.id);
        const updatedColors = [...activeColors];
        updatedColors[i] = !updatedColors[i];
        setActiveColors(updatedColors);
      }}
      activeOpacity={1}
      style={[
        styles.btn_sign_up,
        { backgroundColor: activeColors[i] ? '#5959F0' : 'white' },
      ]}
    >
      <FontAwesome name='arrow-left' size={22} />
      <Text
        style={[
          styles.buttonText_sign_up,
          { color: activeColors[i] ? 'white' : '#5959F0' },
        ]}
      >
        {data.cuisine}
      </Text>
    </TouchableOpacity>
  ));


  // Rendu de l'écran de commande

    return (
      <View style={styles.container}>
        <View style={styles.nav_bar_color}></View>
        <View style={styles.container_box_width}>
  
  
            {/* Fleche revenir sur la page précédente  */}
            <View style={styles.containeur_fleche}>
              <FontAwesome name='arrow-left' size={22}  />
            </View>
  
  
            {/* Box de navigation */}
            <View style={styles.containeur_navigation_view}> 
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.detailContainer}>
                  <View style={{height: 5,width: '100%',backgroundColor: '#E9EBEE',marginBottom: 5}}></View>
                  <Text style={styles.txt_p_bold}>Detail</Text>
                </View>
                <View style={styles.detailContainer}>
                <View style={{height: 5,width: '100%',backgroundColor: '#9292FE',marginBottom: 5}}></View>
                  <Text style={styles.txt_p_bold}>Preferences</Text>
                </View>
                <View style={styles.detailContainer}>
                <View style={{height: 5,width: '100%',backgroundColor: '#E9EBEE',marginBottom: 5}}></View>
                  <Text style={styles.txt_p_bold}>Submit</Text>
                </View>
              </View>
            </View>
  
  
            <Text style={styles.txt_h1}>Your interests</Text>
  
            <Text style={[styles.txt_p_regulard, styles.marginTop]}>Select a few of your favorite kitchens and let us know about it</Text>
  
  
                  <ScrollView contentContainerStyle={styles.scrollViewContainer}    
                      horizontal={false} // Définir la ScrollView en mode vertical
                      showsVerticalScrollIndicator={false} 
                      showsHorizontalScrollIndicator={false}
                      automaticallyAdjustContentInsets={true}
                  >
  
                    <View style={styles.containeur_preferencise}>
                     {preferences}
                      
                    </View>
                </ScrollView>
  
  
            <TouchableOpacity onPress={handleSubmit}style={[styles.button, styles.marginTop]}>
                      <Text style={{ color:'white'}}>Confirmer</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
 

  //---------------Import uiKit----------------------
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  container_box_width:{
    width: "80%",
    flex:1,

    alignItems: 'center',
  },
  marginTop:{
    margin : 20,
  },
  //---------------Fleche revenir a la page pre----------------------
  containeur_fleche: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },

  
//------------ Navigation page details - preference - Submit -------------

     // Navigation View Styles
     containeur_navigation_view: {
      width: "100%",
      marginTop: 20,
      marginBottom: 20,
    },
  
  
    // Detail Container Styles
    detailContainer: {
      width: '32%',
      alignItems: 'center',
    },
  
    // Text Styles
    txt_p_bold: {
      color: '#615DEC',
      fontSize: 16,
      fontWeight: 'bold',
    },

//------------ Police size -------------
    txt_h1 : {
      color: '#5959F0',
      fontSize: 30,
  },
  txt_p_regulard: {
    color: '#5959F0',
    fontSize: 12,
    textAlign: 'center', // Pour centrer horizontalement
    textAlignVertical: 'center', // Pour centrer verticalement si plusieurs lignes
},


//------------ Box preferences scroll View -------------

scrollViewContainer: {
  width: "100%"
},
containeur_preferencise:{
  width:'100%',
  gap:12,
  justifyContent:'space-evenly',
  flexDirection: 'row',
  flexWrap : 'wrap'
},
btn_sign_up : {
  paddingVertical: 10, // 10 units of padding at the top and bottom
  alignItems:'center',
  flexDirection:'row',
  justifyContent: 'space-around',
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#615DEC',
  width: "47%",
  backgroundColor: '#fff',
},
buttonText_sign_up:{
  color:'#615DEC'
},

button: {
  backgroundColor: '#9292FE',
  width: "100%",
  alignItems:'center',
  paddingVertical: 20,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginTop: 40,
},


});