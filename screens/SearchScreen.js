import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity , ScrollView} from 'react-native';
import TinderCard from 'react-tinder-card';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SearchScreen() {
  // Effectue une requête pour obtenir les recettes depuis le serveur au montage du composant
  useEffect(() => {
    fetch('http://192.168.129.27:3000/recipes')
      .then(response => response.json())
      .then(data => {
        setCards(data.recipes);
      });
  }, []);

  const [cards, setCards] = useState([]); // État pour stocker les recettes
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [rejected, setRejected] = useState([]); // État pour stocker les cartes rejetées
  const [accepted, setAccepted] = useState([]); // État pour stocker les cartes acceptées

  const onSwipe = (direction, card) => {
    console.log(`Vous avez balayé ${direction} avec l'identifiant : ${card.namePlats}`);
    if (direction === 'left') {
      console.log('rejeter');
      setRejected([...rejected, card.id]);
    } else if (direction === 'right') {
      console.log('passer');
      setAccepted([...accepted, card.id]);
    }

    // Charge la carte suivante
    loadNextCard();
  };

  const loadNextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  const onCardLeftScreen = (card) => {
    console.log(`La carte avec l'identifiant ${card.namePlats} a quitté l'écran`);
  };

  const stars = Array.from({ length: 5 }, (_, i) => (
    <FontAwesome key={i} name="star" size={8} />
  ));

  const currentCard = cards[currentCardIndex];

  return (
<ScrollView>
      <View style={styles.container}>
        <View style={styles.nav_bar_color}></View>
        <View style={styles.container_box_width}>
          
          {currentCard ? (
            <TinderCard
              key={currentCardIndex}
              onSwipe={(dir) => onSwipe(dir, currentCard)}
              onCardLeftScreen={() => onCardLeftScreen(currentCard)}
              nestedScrollEnabled={false}  // Désact
            >
              <View style={{ width: '100%' }}>
                <Text>{currentCard.title}</Text>
                <Image source={{ uri: currentCard.image }} style={styles.photo_principale} />
                <View style={styles.container_description_recette}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <View style={styles.box_description}>
                      <Text>{currentCard.type}</Text>
                    </View>
                    <View style={styles.box_description}>
                      <Text>{currentCard.title}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 5 }}>
                    {stars}
                  </View>
                </View>
              </View>
            </TinderCard>
          ) : (
            <View style={{width: "100%" , height: 500, backgroundColor:'red'}}>
                <Text>Il faut crée du Contenu qui redirige vers notre whishlist ou autre chose a voir ensemble ou une pub ou quoi </Text>
            </View>
          )}
          <View style={styles.container_btn}>
            <TouchableOpacity activeOpacity={1} style={styles.btn_false} onPress={() => onSwipe('left', currentCard)} >
              <Text style={styles.buttonText}>Non</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={styles.btn_true} onPress={() => onSwipe('right', currentCard)}>
              <Text style={styles.buttonText}>Oui</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  photo_principale : {
    width: "100%",
    height :450,
    
  },
//----------- UiKit ---------------
  container_box_width:{
    width: "80%",

    flex:1,
    paddingTop: 40,
  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  marginTop:{
    marginTop : 20,
  },

  //-------------- BOX EN DESOUS DE LA PHOTO------------
box_description : {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
  marginLeft : 5,
},
photo_preferences :{
  width: 30,
  height: 30
},
container_description_recette: {
  width: "100%",
  padding: 20,
  backgroundColor: '#9292FE47'
},



// --------- Btn Register ---------
container_btn: {
  marginTop: 40,
  width :"100%",
  flexDirection : 'row',
  justifyContent : 'space-around',
},

btn_false:  {
  paddingVertical: 10, // 10 units of padding at the top and bottom
  paddingHorizontal: 25, // A
  borderRadius: 5,
  backgroundColor: 'red',
},
btn_true:{
  paddingVertical: 10, // 10 units of padding at the top and bottom
  paddingHorizontal: 25, // A
  borderRadius: 5,
  backgroundColor: 'green',
},
buttonText :  {
  fontSize : 15,
  color : '#fff'
},


//------------------ Séparateur ---------------------

separator : {
  height: 110,
}

})