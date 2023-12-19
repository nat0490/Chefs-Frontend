import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//FONTAWESOME
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlRice, faBowlFood, faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { addInfo, removeInfo} from '../reducers/infoPourCommande';

export default function DishScreen({route}) {

  const dispatch = useDispatch(); 
  const navigation = useNavigation();

  const { _id, feedback, image, ingredients, notes, prix, time, title, type, userChef, ustensils, path } = route.params;
    //console.log(route.params.userChef._id);

  const [nbPeople, setNbPeople] = useState(1);
  //FAVORITE?
  const [isBookmark, setIsBookmark] = useState(false);
  const [ showPrice, setShowPrice ] = useState(false);
  const [ showIngredients, setShowIngedients] = useState(false);
  const [ showUstensils, setShowUstensils] = useState(false);
  const [ showConvives, setShowConvives] = useState(false);
/*
  CETTE RECETTE EST-ELLE DANS LES FAVORIES? POUR AFFICHER OU LE MARQUER SUR LE BOOKMARK
  useEffect(() => {
    favoriteRecipes.some( e => e.params.name === name) ? setIsBookmark(true): setIsBookmark(false);
}, []);
*/
//LISTE DES INGREDIENTS
const allIngredients = ingredients ? ingredients.map((oneIngredient, index) => (
  //console.log(data);
  <View key={index} style={{ 
                      display: 'flex', 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      marginLeft: 20, 
                      marginRight: 20, 
                      marginTop: 20}}>
    <Text style={{fontSize: 20}}>{oneIngredient.name}</Text> 
    <Text style={{fontSize: 20}}>{(oneIngredient.quantity) * nbPeople} {oneIngredient.unit}</Text>
  </View>
)): null;

//MODIFICATION DU NOMBRE DE PERSONNES
const handleLess = () => {
  if(nbPeople > 1) {
    setNbPeople(nbPeople - 1)
  }
}
const handleMore = () => {
  setNbPeople(nbPeople + 1);
}
/*
const handleBookmark = () => {
  if (!isBookmark) {
    dispatch(addRecipeToFavorite(route));
    setIsBookmark(!isBookmark);
    console.log(route);
  } else {
    dispatch(removeRecipeToFavorite(route));
    setIsBookmark(!isBookmark)
  } 
}
*/
//NOTE MOYENNE
//var total = [0, 1, 2, 3].reduce((a, b) => a + b, 0);
const noteMoyenne = notes ?  notes.reduce((a,b)=> a +b, 0)/notes.length : "";

//USTENSILS
const besoinUstensils = 
  ustensils ? ustensils.map((oneUstensil , i ) => (
    //console.log(oneUstensil);
    <View key={i}>
      <Text>{oneUstensil.nom} {oneUstensil.emoji} </Text>
    </View>
  )) : null;


//PRIX
  let prixTotal = 0;
  if (prix) {
    prixTotal = prix.minimum + ((prix.personneSup - 1) + prix.panierCourseParPersonne)*nbPeople;
    //console.log(prixTotal);
  }; 

 //console.log(_id);
 //console.log(userChef._id);
  
const validerPlat = () => {
  //navigation.navigate();
  console.log('bouton pressé!');
  dispatch(addInfo({
    dishId: _id,
    chefId: userChef._id,
  }))
}; 



//{ notes.length > 0 ? <Text>note: {noteMoyenne}</Text> : "" }
const stars = [];
  for (let i = 0; i < 5; i++) {
    // let style = {};
    // if (i < props.voteAverage - 1) {
    //   style = { 'color': '#f1c40f' };
    // }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} name='star' size={16} color='#B8B8B8'/>);
  }



//UTILE DANS LE CODE??
/* <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={() => setShowConvives(!showConvives)} >
              <Text style={styles.buttonText_sign_in}>Convives</Text>
            </TouchableOpacity> 
            <Text>Convives</Text>
            <View style={styles.nbmConvives}> 
              <TouchableOpacity style={{padding: 20}}  onPress={()=>handleLess()}>
                <Text style={{fontSize: 20,fontWeight: "bold"}} >-</Text>
              </TouchableOpacity>
              <Text style={{padding: 20, fontSize: 20}}>{nbPeople}</Text>
              <TouchableOpacity style={{padding: 20}}  onPress={()=>handleMore()}>
                <Text style={{fontSize: 20, fontWeight: "bold"}} >+</Text>
              </TouchableOpacity>
            </View> */

return (

  <View style={styles.container}>
    <View style={styles.nav_bar_color}></View>
        <View style={styles.topPage}> 
      

            <View > 
              <View style={styles.positionBackBtn}> 
                <TouchableOpacity style={styles.backBtnAlone} onPress={()=> navigation.navigate('HomeTabs', { screen: 'Main' })}>
                  <Text style={styles.btnTextBack}>←</Text>
                </TouchableOpacity>
              </View>
              <Text style={{...styles.txt_h1, marginBottom: 40}}>{title}</Text>
            </View>
            <Image source={{uri: image}} style={styles.imagePlat} />

  {/*<TouchableOpacity >
      <FontAwesome style={isBookmark ? {color: '#fff'} : {}} size={26} name="bookmark" />
      </TouchableOpacity> */}
      
     

        <View style={styles.box}>
        <ScrollView contentContainerStyle={{width: '100%',}} >
          <View style={styles.textBox}> 
        
          <View style={styles.typeChef}> 
            <View style={styles.typeCuisine}> 
              <FontAwesomeIcon icon={faBowlRice} size={30}/><Text style={{fontSize: 20}}>    {type}</Text>
            </View>
            <TouchableOpacity activeOpacity={1} style={{...styles.btn_sign_in, marginRight: 20}} >
              <Text style={styles.buttonText_sign_in}>Profil du Chef</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stars}>{stars}</View>

            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> setShowIngedients(!showIngredients)}>
              <Text style={styles.buttonText_sign_in}>Ingredients</Text>
            </TouchableOpacity>
            { showIngredients? <View><Text>Pour une personne:</Text>{allIngredients}</View> : "" }

            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> setShowPrice(!showPrice)}>
              <Text style={styles.buttonText_sign_in}>Prix</Text>
            </TouchableOpacity>
            { showPrice ? 
              <View>
                <Text>Prix par prestation (1 personne): {prix.minimum} €</Text>
                <Text>Prix par personne supplémentaire: {prix.personneSup} €</Text>
                <Text>Panier course par personne: {prix.panierCourseParPersonne} €</Text>
              </View> : "" }

            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={() => setShowUstensils(!showUstensils)}>
              <Text style={styles.buttonText_sign_in}>Ustensils</Text>
            </TouchableOpacity>
            { showUstensils ? <View>{besoinUstensils}</View> : "" }

           

            

          </View>
          </ScrollView>
        </View>
        
      
        <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> validerPlat()} >
            <Text style={styles.buttonText_sign_up}>Je réserve mon plat!</Text>
        </TouchableOpacity>
        
      </View>
     
    </View>
  );

}
 


const styles = StyleSheet.create({
//MISE EN PAGE
  container: {
    flex: 1,
  },
  nav_bar_color: {
    backgroundColor: '#9292FE',
    height: 50,
  },
  topPage: {
    //flexGrow: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    //width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  txt_h1 : {
    color: '#5959F0',
    fontSize: 30,
},
  txt_h2 : {
    color: '#5959F0',
    fontSize: 20,
},

//TOP PAGE
backBtnAlone: {
  width: '20%',
  marginTop: 20,
  paddingBottom: 5, // 10 units of padding at the top and bottom
  paddingHorizontal: 15, // A
  borderRadius:50,
  borderWidth: 2,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
  //marginRight: 100,
  marginBottom: 20,
},
btnTextBack: {
  fontSize : 30,
  fontWeight: 'bold',
  color : '#9292FE'
},
positionBackBtn: {
  width: '100%',
  alignItems:'flex-start',
},
//IMAGE
imagePlat: {
  width: '90%', 
  height: '33%',
  resizeMode: 'contain',
  padding: 10,
  borderRadius: 10,
  marginBottom: 20,
  shadowOffset: {width: 20,height: 20},
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowRadius: 4,
  },
//BLOC INFOS RECETTE
box: {
  width: '80%', 
  maxHeight: '35%',
  backgroundColor: "rgba(89,89,240, 0.2)",
  borderRadius: 10,
  marginBottom: 10,
},
typeCuisine: {
  flexDirection: 'row',
  alignItems: 'center',
},
textBox: {
  margin: 10,
},
stars: {
  flexDirection: 'row',
  marginLeft: 20,
  marginBottom: 20,
},
//nbmConvives: {
//  flexDirection: 'row',
//},

btn_sign_in : {
  paddingVertical: 10, // 10 units of padding at the top and bottom
  paddingHorizontal: 10, // A
  borderRadius: 5,
  backgroundColor: '#9292FE',
  marginTop: 10,
  maxWidth: '30%',
},
buttonText_sign_in :  {
  fontSize : 15,
  color : '#fff',
  textAlign: 'center',
},
typeChef: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
//BOUTON VALIDER
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