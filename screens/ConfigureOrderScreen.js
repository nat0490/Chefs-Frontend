import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TouchableOpacity, ScrollView} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'
import { faStar, faPhone, faMessage } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';




export default function ConfigureOrderScreen() {
  useEffect(() => {
    // Utilisation de setTimeout pour déclencher la navigation après 5 secondes
    const timeoutId = setTimeout(() => {
      // Utilisation de navigation.navigate pour effectuer la navigation
      navigation.navigate('Main'); // Remplacez 'VotreEcranCible' par le nom de votre écran cible
    }, 10000); // Délai de 5000 millisecondes (5 secondes)

    // Il est important de nettoyer le timer pour éviter les fuites de mémoire
    return () => clearTimeout(timeoutId);
  }, []); // Le tableau vide [] en tant que deuxième argument signifie que cela s'exécute une seule fois lors du montage du composant

  

  const infoPourCommande = useSelector((state) => state.infoPourCommande.value);
  //console.log(infoPourCommande);
  const navigation = useNavigation();

      const [platsData , setPlatsData] = useState();
      const [ showOrderDetails, setShowOrderDetails ] = useState(false);
      const [ scrollOffset, setScrollOffset] = useState(0);

  const noteMoyenne = platsData && platsData.notes ? (platsData.notes.reduce((a, b) => a + b, 0) / platsData.notes.length).toFixed(2) :  "";
  //console.log(noteMoyenne);

         const stars = []
          for (let i = 0; i < 5; i++) {
            let style = {};
             //console.log(noteMoyenne)
             if (i < noteMoyenne - 1) {
               style = '#9292FE' 
              }else {
               style = '#B8B8B8'
             }
            stars.push(<FontAwesomeIcon key={i}  icon={faStar} name='star' size={10} color={style}/>);
          }
          useEffect(() => {
            (async () => {
              try {
                //const platId = '658016a2bded833448fc118a'
                const response = await fetch(`https://chefs-backend-amber.vercel.app/recipes/displayRecipes/${infoPourCommande.dishId}`);
                const data = await response.json();
          
                if (data.result) {
                  setPlatsData(data.recipe);
                }
              } catch (error) {
                console.error("Erreur lors de la récupération des données de la recette :", error);
              }
            })();
          }, []);

  if(!platsData) return <View><Text>Loading...</Text></View>

//CONVERSION TEMPS DE PREPARATION
const newTime = (time) => {
  const date = new Date(time);
  const formattedTime = `${date.getHours()} H ${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
  return formattedTime
};


//DETAILS DE LA COMMANDE
  const watchOrderDetails = infoPourCommande? <View style={styles.OrderDetailsBloc}>
    <View style={{width: '100%', marginBottom: 10, marginLeft: 20}}><Text style={{fontSize: 16}}>Récapitulatif de la commande</Text></View>
    { infoPourCommande.price? <Text>Montant: {infoPourCommande.price} €</Text> : null }
    { infoPourCommande.date? <Text>Date: {infoPourCommande.date}</Text> : null }
    { infoPourCommande.addresse? <Text>Adresse: {infoPourCommande.addresse}</Text> : null }
    { infoPourCommande.comments? <Text>Commentaire: {infoPourCommande.comments}</Text> : null }
  </View> : null;

  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      
      <View style={{...styles.container_box_width, marginTop: scrollOffset}}>
            {/* Il faut ecrire tous sont code ici la couleur rouge seras a enlever*/}
            <View style={{width: "100%" , alignItems:'center', marginTop : 40 , justifyContent:'space-between', flexDirection: 'row'}}> 
                
                   <Image source={require('../assets/configurateOrder.png')} style={styles.photo} />
                
                <View style={{alignItems:'center', marginRight: 30}}>
                    <Text style={styles.txt_h2}>Merci pour votre </Text>
                    <Text style={styles.txt_h2}>commande!</Text>
                </View>
            </View>

            <View style={{alignItems: 'center', marginTop : 40}}>
                <Text style={styles.txt_h1}>Votre chef.fe est </Text>
                <Text style={styles.txt_h1}>confirmé.e</Text>
            </View>



            <View style={{width: "100%" , alignItems:'center', marginTop : 40 ,justifyContent:'center', flexDirection: 'row' }}> 
            {/*
              <View style={{alignItems: 'center' ,width: "45%" }}>
                <Image source={require('../assets/configurateOrder.png')} style={styles.photo} />
                <View style={{alignItems: 'center' , height: 70, backgroundColor :'#9292FE47', marginTop: 10 , justifyContent: 'center', borderRadius: 15 , width:"100%"}}>
                  <Text>Chef : {platsData.userChef.userProfil.nom}</Text>
                  <View style={[styles.box_description, {marginTop : 10}]}>
                    <FontAwesomeIcon icon={faBowlFood}/>
                      <Text>{platsData.type}</Text>
                    </View>
                  </View>
  </View> */}


              <View style={{alignItems: 'center', width: "45%"}}>
                <Image source={{ uri: platsData.image }} style={styles.photoDish} />
                <View style={{alignItems: 'center' , height: 70, backgroundColor :'#9292FE47', marginTop: 10 , justifyContent: 'center', borderRadius: 15 ,width:"100%"}}>

                  <View style={{alignItems:'center'}}>
                      <Text style={{fontSize: 12}}>{platsData.title}</Text>
                      <Text style={{fontSize: 8, marginTop : 10}}>Temps de préparation : {newTime(platsData.time)}</Text>      
                  </View>
                  <View style={{ flexDirection: 'row', marginTop : 10}}>
                
                       {stars}

                  </View>
                 
                </View>
              </View>
            </View>

            <TouchableOpacity style={{marginVertical: 30}} onPress={()=> {setShowOrderDetails(!showOrderDetails), setScrollOffset(showOrderDetails ? 0 : -100)}}>
              <Text style={{textDecorationLine:'underline', padding: 10}}>Détails de ta commande</Text>
            </TouchableOpacity>

            {showOrderDetails ? watchOrderDetails : null}

            <View style={{width: "100%", }}>
                <Text>Ton chef.fe</Text>
                <View style={{flexDirection: 'row' , marginTop: 20, }}>
                  <View style={[styles.subContainer, { flex: 0.2 ,justifyContent: 'center'}]}>
                  <Image source={require('../assets/chefNaima.jpg')} style={styles.photoMini} />
                  </View>
                  <View style={[styles.subContainer, { flex: 0.5 , justifyContent: 'center'}]}>
                    <Text>{platsData.userChef.userProfil.nom} {platsData.userChef.userProfil.prenom}</Text>
                  </View>
                  <View style={ { flex: 0.3 , flexDirection:'row' , alignItems:'center', justifyContent:'space-around'}}>
                    <FontAwesomeIcon icon={faPhone} />
                    <FontAwesomeIcon icon={faMessage} />
                  </View>
                </View>
            </View>

            <View style={{width: "100%", flexDirection:'row', justifyContent:'space-between', alignItems: 'center', marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>  
                <View style={{justifyContent:'center'}}> 
                  <FontAwesomeIcon icon={faMessage} />
                </View>
                <View style={{flexDirection:'column', marginLeft: 20}}>
                  <Text>Chat with</Text>
                  <Text>Support</Text>
                </View>
              </View>
              
              <TouchableOpacity style={{...styles.btn_sign_up, marginVertical: 30}} onPress={()=> navigation.navigate('Main')}>
                <Text style={styles.buttonText_sign_up}>Retour au menu principal</Text>
              </TouchableOpacity>
              
            </View>

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
   //-----------------Bar couleur mauve top------------------
   nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  photo:{
    width : 100,
    height: 100
  },
  photoDish:{
    width : 200,
    height: 200
  },
  photoMini : {
    width : 50,
    height: 50,
    borderRadius: 50
  },
  //-----------------Styles de notre containeur box------------------
  container_box_width:{
    width: "80%",
    flex:1,
    alignItems: 'center',
  },
  box_description : {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft : 5,
  },
  //  ------------ Size police ----------------

txt_h1 : {
  color: '#5959F0',
  fontSize: 30,
},
txt_h2 : {
  color: '#5959F0',
  fontSize: 20,
},

txt_p_regulard: {
  color: 'black',
  fontSize: 12,
},

txt_p_bold : {
  color: 'black',
  fontSize: 12,
  fontWeight: 'bold',
},
//ORDERDETAILS BLOCK
OrderDetailsBloc: {
  marginTop: -10,
  marginBottom: 40, 
  borderRadius: 10, 
  borderWidth: 1, 
  padding: 20, 
  borderColor: '#5959F0', 
},
btn_sign_up : {
  paddingVertical: 10, 
  paddingHorizontal: 25, 
  borderRadius: 5,
  borderWidth: 2,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
  marginTop: 10,
},
buttonText_sign_up: {
  fontSize : 15,
  color : '#9292FE',
  textAlign: 'center',
},
});