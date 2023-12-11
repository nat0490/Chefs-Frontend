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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function DishScreen({route}) {

  const dispatch = useDispatch(); 
  const navigation = useNavigation();

  //const favoriteRecipes = useSelector((state) => state.favorites.value);

  //A QUEL MOMENT FAIT-ON LE FETCH POUR RECUPERER LES DONNES?
  const { userChef, title, image, time, rating, Feedback, type, notes, prix, ustensils, ingredients} = route.params;

  const [nbPeople, setNbPeople] = useState(1);
  //FAVORITE?
  const [isBookmark, setIsBookmark] = useState(false);
  const [ showUstensils, setShowUstensils ] = useState(false);
  const [ showIngredients, setShowIngredients ] = useState(false);
  const [ showPrice, setShowPrice ] = useState(false);
  const [ showConvives, setShowConvives ] = useState(false);

/*
  CETTE RECETTE EST-ELLE DANS LES FAVORIES? POUR AFFICHER OU LE MARQUER SUR LE BOOKMARK
  useEffect(() => {
    favoriteRecipes.some( e => e.params.name === name) ? setIsBookmark(true): setIsBookmark(false);
}, []);
*/

//LISTE DES INGREDIENTS
const allIngredients = ingredients ? ingredients.map((ingredient: { name: string, amount:  number, unit: string }, index: React.Key) => (
  <View key={index} style={{ 
                      display: 'flex', 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      marginLeft: 20, 
                      marginRight: 20, 
                      marginTop: 20}}>
    <Text style={{fontSize: 20}}>{ingredient.name}</Text> 
    <Text style={{fontSize: 20}}>{(ingredient.amount) * nbPeople} {ingredient.unit}</Text>
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

const platsPrep = () => {
  //fetch(...)
  //récuperer toutes les commandes d'un ID
  //NUMBER
  0
}

const besoinUstensils = 
  ustensils ? ustensils.map( (ustensil: { nom: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal; emoji: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal; }) => {
    <View>
      <Text>{ustensil.nom} {ustensil.emoji}</Text>
    </View>
  }) : null;

  let total = 0;
  if (prix) {
    let total = prix.minimum + ((prix.personneSup-1) + prix.panierCourseParPersonne)*nbPeople;
    console.log(total);
    return total;
  };




return (
  <View style={styles.container}>
    <Text >{title}</Text>
    <Image 
      source={image} 
      style={{
        width: '100%', 
        height: '33%',
        resizeMode: 'contain',
        padding: 10,
        borderBottomLeftRadius: 100,
        }}/>
{/*
    <TouchableOpacity >
      <FontAwesome style={isBookmark ? {color: '#fff'} : {}} size={26} name="bookmark" />
    </TouchableOpacity>
      */}

        <View >
            <Text >Type: {type}</Text>
            <Text >note: {notes}</Text>
           { platsPrep  ?  <Text >Plats préparés:  platsPrep </Text> : null }

           <TouchableOpacity onPress={()=> setShowConvives(!showConvives)} >
             <Text>Convives</Text>
          </TouchableOpacity>
      {
        showConvives? <View> 
        <TouchableOpacity style={{padding: 20}}  onPress={()=>handleLess()}>
          <Text style={{fontSize: 20,fontWeight: "bold"}} >-</Text>
        </TouchableOpacity>
        <Text style={{padding: 20, fontSize: 20}}>{nbPeople}</Text>
        <TouchableOpacity style={{padding: 20}}  onPress={()=>handleMore()}>
          <Text style={{fontSize: 20, fontWeight: "bold"}} >+</Text>
        </TouchableOpacity>
      </View> : null
      }
          

          <TouchableOpacity onPress={()=> setShowUstensils(!showUstensils)}>
            {showUstensils?  besoinUstensils    : <Text>Ustensils</Text> }
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setShowIngredients(!showIngredients)}>
            { showIngredients?  allIngredients : <Text>Ingredient</Text> }
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setShowPrice(!showPrice)}>
           { showPrice?  prix>0 ? prix:null  : <Text>Prix</Text> } 
          </TouchableOpacity>

{/* MODIFIER PAR LA PAGE DU CHEF */}
          <TouchableOpacity onPress={()=> navigation.navigate('Sign_up')}>
            <Text>{userChef}</Text>
          </TouchableOpacity>
        </View>

{/* MODIFIER PAR LA PAGE DE RESERVATION*/}
        <TouchableOpacity onPress={()=> navigation.navigate('Sign_up')}>
            <Text>Je résèrve mon plat </Text>
          </TouchableOpacity>

    
  </View>
);


 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});