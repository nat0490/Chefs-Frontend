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

  


//TEMPS DE PREPARATION
const newTime = (time) => {
  const date = new Date(time);
  const formattedTime = `${date.getHours()} H ${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
  return formattedTime
};



//LISTE DES INGREDIENTS
const allIngredients = ingredients ? ingredients.map((oneIngredient, index) => (
  //console.log(data);
  <View key={index} style={{ 
                      display: 'flex', 
                      flexDirection: 'row', 
                      //justifyContent: 'space-between', 
                      marginLeft: 20, 
                      marginRight: 20, 
                      marginTop: 5}}>
    <Text style={{fontSize: 16}}>-  {oneIngredient.name}</Text> 
    <Text style={{fontSize: 16}}>   {(oneIngredient.quantity) * nbPeople}    {oneIngredient.unit}</Text>
  </View>
)): null;


//USTENSILS
const besoinUstensils = 
  ustensils ? ustensils.map((oneUstensil , i ) => (
    //console.log(oneUstensil);
    <View key={i}>
      <Text style={{fontSize: 16, marginTop: 5, marginLeft: 5}}>-  {oneUstensil.nom} {oneUstensil.emoji} </Text>
    </View>
  )) : null;




 //console.log(_id);
 //console.log(userChef._id);
  
const validerPlat = () => {
  try {
    //navigation.navigate();
  console.log('plat validé');
  dispatch(addInfo({
    dishId: _id,
    chefId: userChef._id,
  }));
} catch (error) {
  console.error("Une erreur s'est produite :", error);
}
};

const voirProfilChef = (menu) => {
  navigation.navigate('ChefScreen', menu)
}


//NOTE MOYENNE
const noteMoyenne = notes ?  (notes.reduce((a,b)=> a +b, 0)/notes.length).toFixed(2) : "";
//console.log(notes);
//console.log(noteMoyenne);

//ETOILES DE NOTES
const stars = [];
  for (let i = 0; i < 5; i++) {
     let style = {};
     if (i < noteMoyenne - 1) {
       style = '#9292FE'
     } else {
      style = '#B8B8B8'
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} name='star' size={16} color={style}/>);
  }


return (

  <View style={styles.container}>
    <View style={styles.nav_bar_color}></View>
        <View style={styles.topPage}> 
      

            <View style={{width: '100%'}}> 
            {/*
              <View style={styles.positionBackBtn}> 
                <TouchableOpacity style={styles.backBtnAlone} onPress={()=> navigation.navigate('HomeTabs', { screen: 'Main' })}>
                  <Text style={styles.btnTextBack}>←</Text>
                </TouchableOpacity>
</View> */}
              <View style={{alignItems: 'center'}}> 
              <Text style={{...styles.txt_h1, marginBottom: 40, marginTop: 40}}>{title}</Text>
              </View>
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
            <Image source={require('../assets/img_plats_categories.png') } style={styles.photo_preferences} /><Text style={{fontSize: 20}}>  {type}</Text>
            </View>
            <TouchableOpacity activeOpacity={1} style={{...styles.btn_sign_in, marginRight: 20}} onPress={() => voirProfilChef(userChef._id)}>
              <Text style={styles.buttonText_sign_in}>Profil du Chef</Text>
            </TouchableOpacity>
          </View>

    

          <View style={styles.stars}>{stars}</View>

          <View style={{alignItems: 'flex-end', marginRight: 10, marginTop: -20}}><Text>Temps de préparation: {newTime(time)}</Text></View>

            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> setShowIngedients(!showIngredients)}>
              <Text style={styles.buttonText_sign_in}>Ingredients</Text>
            </TouchableOpacity>
            { showIngredients? <View style={{marginTop: 5}}><Text style={{fontSize: 16, textDecorationLine: 'underline'}}>Pour une personne:</Text>{allIngredients}</View> : "" }

            <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> setShowPrice(!showPrice)}>
                <Text style={styles.buttonText_sign_in}>Prix</Text>
              </TouchableOpacity>
            </View>
            { showPrice ? 
              <View>
                <Text style={{fontSize: 16, marginTop: 5}}>Prix par prestation (1 personne): <Text style={{fontWeight: 600}}>{prix.minimum} €</Text></Text>
                <Text style={{fontSize: 16, marginTop: 5}}>Prix par personne supplémentaire: <Text style={{fontWeight: 600}}>{prix.personneSup} €</Text></Text>
                <Text style={{fontSize: 16, marginTop: 5}}>Panier course par personne: <Text style={{fontWeight: 600}}>{prix.panierCourseParPersonne} €</Text></Text>
              </View> : "" }

            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={() => setShowUstensils(!showUstensils)}>
                <Text style={styles.buttonText_sign_in}>Ustensils</Text>
              </TouchableOpacity>
            </View>  
            { showUstensils ? <View>{besoinUstensils}</View> : "" }

           

            

          </View>
          </ScrollView>
          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={() => navigation.navigate('CheckProfile')} >
            <Text style={styles.buttonText_sign_up}>Je réserve mon plat!</Text>
        </TouchableOpacity>
        </View>
        
      
      
        
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
  width: '15%',
  marginTop: 20,
  paddingBottom: 5, // 10 units of padding at the top and bottom
  paddingHorizontal: 15, // A
  borderRadius:50,
  borderWidth: 2,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
  //marginRight: 100,
  marginBottom: 5,
  marginLeft: 20,
},
btnTextBack: {
  fontSize : 30,
  fontWeight: 'bold',
  color : '#9292FE'
},
positionBackBtn: {
  width: '100%',
  //alignItems:'flex-start',
  marginLeft: 0,
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
  maxHeight: '40%',
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
  width: 200,
},
photo_preferences :{
  width: 30,
  height: 30
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