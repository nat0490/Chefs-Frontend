import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ScrollView, Text, View ,TouchableOpacity, Alert} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react';
import { useNavigation , useFocusEffect  } from '@react-navigation/native';
import { useSelector , useDispatch} from 'react-redux';
import { updatePreference} from '../reducers/user'

export default function OrderScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
    // Import des REDUCER
  const user = useSelector((state) => state.user.value);

  // État pour stocker les données de préférence
  const [preferenceData, setPreferenceData] = useState([]);

  // État pour suivre les couleurs actives des préférences
  // Cette ligne crée un tableau de la même longueur que preferenceData, où chaque élément est initialisé à false
  const [activeColors, setActiveColors] = useState(preferenceData.map(() => false)); 

  // État pour stocker les ID sélectionnés
  const [selectedIds, setSelectedIds] = useState([]);

  // Fonction pour gérer le clic sur une préférence
  const handlePress = (id_preferences) => {
    setSelectedIds([...selectedIds, id_preferences]);
  }

  // Import des REDUCER
  // const user = useSelector((state) => state.user.value);
  // const typeCuisine = useSelector((state) => state.typeCuisine.value);
  
  //console.log(typeCuisine);
  
 

  // // Fonction pour soumettre les préférences sélectionnées
  // const handleSubmit = () => {
  //   fetch(`https://chefs-backend-amber.vercel.app/users/profil/add-preference/${user.id}`, {
  // // ID utilisateur fictif (à remplacer par la logique d'authentification)


  // Fonction pour soumettre les préférences sélectionnées
  const handleSubmit = () => {
        dispatch(updatePreference({ userPreference : [...selectedIds]}))
        setSelectedIds([]);
        setActiveColors([]);
        setPreferenceData([]);
        Alert.alert('Parfait, nous avons ajouté tes informations à tes préférences');
        navigation.navigate('Terms');
  }

  

//   //tris des type par ordre alphabétique
// const newlisteType = [... typeCuisine] 
// newlisteType.sort((a, b) => {
//     const cuisineA = a.cuisine.toUpperCase(); // ignore la casse
//     const cuisineB = b.cuisine.toUpperCase(); // ignore la casse
//     if (cuisineA < cuisineB) {
//       return -1;
//     }
//     if (cuisineA > cuisineB) {
//       return 1;
//     }
//     return 0;
//   });


//   // AFFICHAGE DES PREFERENCES
//   const preferences = newlisteType.map((data, i) => (
//     <TouchableOpacity
//       key={i}
//       onPress={() => {
//         handlePress(data.id);
//         const updatedColors = [...activeColors];
//         updatedColors[i] = !updatedColors[i];
//         setActiveColors(updatedColors);
// Utilisez useEffect pour charger les préférences une seule fois à l'initialisation
const dataPreferences = user.userProfile.userPreference

// Utilisez useEffect pour charger les préférences une seule fois à l'initialisation
useFocusEffect(
  React.useCallback(() => {
    fetch('http://chefs-backend-amber.vercel.app/userPreference/display_preference')
    .then(response => response.json())
    .then(data => {
      setPreferenceData([...data.data]);
      console.log('je charge mes données ', data.data);
    });
  
}, [])); 

 let preferences 

// Utilisez useEffect pour charger les préférences lorsque je revient sur ma page 
useEffect(() => {
  if(dataPreferences.length > 0){
    // Je compare les id de ma db avec 
    const resultIndexes = dataPreferences.map((reducerItem) => {
      console.log("reducerItem._id:", reducerItem);
      const index = preferenceData.findIndex((prefItem) => {
        console.log("prefItem._id:", prefItem._id);
        return prefItem._id === reducerItem;
      });
    
      return index;
    });

    const updatedColors = []
  
    for (let i = 0; i < preferenceData.length; i++) {
      if (resultIndexes.includes(i)) {
        updatedColors[i] = true;
      }else{
        updatedColors[i] = false;
      }
    }

      console.log("updatedColors:", updatedColors);
      setActiveColors(updatedColors);
  }
}, [preferenceData]);


   // Je map sur ma reponse pour afficher toutes les preferences de ma db 
       preferences = preferenceData.map((data, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            console.log("Clicked on preference:", data.typeCuisine);
            console.log("Before handlePress, activeColors:", activeColors);
            handlePress(data._id); // Recupere l'id de ma preference au clic 
            const updatedColors = [...activeColors]; // Je recupere mon tableau de false 
            updatedColors[i] = !updatedColors[i]; // Inverse la valeur sur l'index de ma preferences
            console.log("After handlePress, updatedColors:", updatedColors)
            setActiveColors(updatedColors); // Je met a jour mon tableau modifier 
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
  
      
  
            {/* Box de navigation */}
            <View style={styles.containeur_navigation_view}> 
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.detailContainer}>
                  <View style={{height: 5,width: '100%',backgroundColor: '#E9EBEE',marginBottom: 5}}></View>
                  <Text style={styles.txt_p_bold}>Détails</Text>
                </View>
                <View style={styles.detailContainer}>
                <View style={{height: 5,width: '100%',backgroundColor: '#9292FE',marginBottom: 5}}></View>
                  <Text style={styles.txt_p_bold}>Préférences</Text>
                </View>
                <View style={styles.detailContainer}>
                <View style={{height: 5,width: '100%',backgroundColor: '#E9EBEE',marginBottom: 5}}></View>
                  <Text style={styles.txt_p_bold}>Envoyer</Text>
                </View>
              </View>
            </View>
  
  
            <Text style={styles.txt_h1}>Tes préférences</Text>
  
            <Text style={[styles.txt_p_regulard, styles.marginTop]}> Sélectionne tes plats favoris et fais-le nous savoir</Text>
  
  
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
      marginTop: 60,
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