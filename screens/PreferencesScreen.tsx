import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ScrollView, Text, View ,TouchableOpacity, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function OrderScreen() {
  const navigation = useNavigation();

  // État pour suivre si le bouton a été cliqué
  const [buttonClicked, setButtonClicked] = useState(false);

  // État pour stocker les données de préférence
  const [preferenceData, setPreferenceData] = useState<any[]>([]);

  // État pour suivre les couleurs actives des préférences
  const [activeColors, setActiveColors] = useState(Array(preferenceData.length).fill(false));

  // État pour stocker les ID sélectionnés
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  // Fonction pour gérer le clic sur une préférence
  const handlePress = (id_preferences) => {
    setSelectedIds([...selectedIds, id_preferences]);
  }

  // ID utilisateur fictif (à remplacer par la logique d'authentification)
  const user = '6578aabacc005455755192fa';

  // Fonction pour soumettre les préférences sélectionnées
  const handleSubmit = () => {
    fetch(`http://172.20.10.5:3000/users/profil/add-preference/${user}`, {
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

  // Utilisez useEffect pour charger les préférences une seule fois à l'initialisation
  useEffect(() => {
    fetch('http://172.20.10.5:3000/userPreference/display_preference')
      .then(response => response.json())
      .then(data => {
        setPreferenceData([...data.data]);
      });
  }, []);

  // Créez des composants de préférences à partir des données
  const preferences = preferenceData.map((data, i) => (
    <TouchableOpacity
      key={i}
      onPress={() => {
        handlePress(data._id);
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
        {data.typeCuisine}
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