import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch , useSelector} from 'react-redux';

//FONTAWESOME
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'

export default function App() {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [platsData , setPlatsData] = useState([])
  const [chefData , setChefData] = useState([])
  const stars = [];


for (let i = 0; i < 5; i++) {
    // let style = {};
    // if (i < props.voteAverage - 1) {
    //   style = { 'color': '#f1c40f' };
    // }
    //stars.push(<FontAwesome key={i} name='star' size={8}/>);
}

  const handlePressPlats = (id) => {
    navigation.navigate('HomePlat', { platId: id });
  }
 const handlePressChefs = (id) =>{
  navigation.navigate('HomeChefs', { chefId: id } )
 }


 useEffect(() => {
  fetch('https://chefs-backend-amber.vercel.app/recipes')
    .then(response => response.json())
    .then(data => {
      setPlatsData([...data.recipes]);
    });

// Fetch pour récuperer les chef
    fetch('https://chefs-backend-amber.vercel.app/users/chef')
    .then(response => response.json())
    .then(data => {
      setChefData([...data.data]);
    });
}, []);

// Map pour afficher 3 plats 
const diplayPlats = platsData.slice( 0 , 3 ).map((data , i) => (
  <TouchableOpacity key={i} onPress={() => handlePressPlats(data._id)}  activeOpacity={1} style={styles.box}>
    <Image source={{ uri: data.image }} style={styles.photo} />
    <Text style={styles.margin_right}>{data.title}</Text>
    <View style={styles.box_description}>
      <FontAwesomeIcon icon={faBowlFood}/>
      <Text>{data.type}</Text>
    </View>
  </TouchableOpacity>
));



const diplayChefs = chefData ? chefData.slice( 0 , 3 ).map((data , i) => (
  <TouchableOpacity key={i} onPress={() => handlePressChefs(data._id)} activeOpacity={1} style={styles.box}>
  <Image source={require('../assets/chefNaima.jpg')} style={styles.photo} />
    <Text style={[styles.txt_preferences, styles.margin_rigth]}>Chef {data.userProfil.nom}</Text>
    <View style={styles.box_description }>
    <FontAwesomeIcon icon={faBowlFood}/>
      <Text>{data.spécialisation}</Text>
  </View>
</TouchableOpacity>
)):  <View><Text>Loading...</Text></View> 

 return (
    <View style={styles.container}>
          {/* Barre de navigation colorée */}
      <View style={styles.nav_bar_color}></View>

      {/* Logo */}     
      <Image source={require('../assets/logo.png')} style={styles.photo_logo} />

      {/* Section avec titre et barre en dessous */}
      <View style={styles.section_box}>
        <View style={styles.box_titre}>
            {/*<FontAwesome name='heart' size={22}/> */}
            <Text style={styles.txt_h1}>Our trendy recipes</Text>
        </View>

        {/* Barre en dessous du titre */}
        <View
            style={{
              borderBottomColor: '#9292FE',
              borderBottomWidth: 2,
              width : 260,
              marginVertical: 5, // Ajustez la marge verticale selon vos besoins
            }}
          />
           <View
            style={{
              borderBottomColor: '#9292FE',
              borderBottomWidth: 2,
              width : 320,
              marginVertical: 5, // Ajustez la marge verticale selon vos besoins
            }}
          />



        {/* Conteneur des boîtes de recettes */}
        <View style={styles.containeur_box}>
          {diplayPlats}

        </View>
      </View>


      {/* Section avec un autre titre et barre en dessous */}      
      <View style={styles.section_box}>
        <View style={styles.box_titre}>
            {/*<FontAwesome name='heart' size={22} /> */}
            <Text style={styles.txt_h1}>Our trendy recipes</Text>
        </View>


          {/* Barre en dessous du titre */}
        <View
            style={{
              borderBottomColor: '#9292FE',
              borderBottomWidth: 2,
              width : 260,
              marginVertical: 5, // Ajustez la marge verticale selon vos besoins
            }}
          />
           <View
            style={{
              borderBottomColor: '#9292FE',
              borderBottomWidth: 2,
              width : 320,
              marginVertical: 5, // Ajustez la marge verticale selon vos besoins
            }}
          />


        {/* Conteneur des boîtes de recettes */}
        <View style={styles.containeur_box}>
         {diplayChefs}

        </View>
      </View>


       {/* Section avec boutons de connexion */}
      <View style={styles.section_btn_register}>
        <Text style={styles.titre_register}>Do we know each other yet ?</Text>
        <View style={styles.container_btn}>
          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in}  onPress={() => navigation.navigate('Sign_in')}>
              <Text style={styles.buttonText_sign_in}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={() => navigation.navigate('Sign_up')}>
              <Text style={styles.buttonText_sign_up}>Sign up</Text>
          </TouchableOpacity>
          

          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={() => navigation.navigate('OrderDetails')}>
            <Text style={styles.buttonText_sign_up}>CheckProfile</Text>
          </TouchableOpacity>
<<<<<<< HEAD
          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={() => navigation.navigate('CheckProfile')}>
=======
          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={() => navigation.navigate('Search')}>
>>>>>>> christofLast
              <Text style={styles.buttonText_sign_up}>navigation</Text>
          {/* </TouchableOpacity> */}
          </TouchableOpacity>
          
        </View>
      </View>

      
     
      {/* Barre de statut */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  box_titre: {
    flexDirection:'row',
    alignItems:'center',
    width: 300,
    justifyContent: 'space-around'
  },
  txt_h1: {
    color: '#5959F0',
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  photo_logo : {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom : -5,
  },


  //---------- Recette Box ----------------
  section_box: {
    width: "100%",
    marginTop: 20,
    alignItems :  'center',
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
  box_description : {
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
// --------- Btn Register --------------
  section_btn_register: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  container_btn: {
    marginTop: 10,
    width :" 100%",
    flexDirection : 'row',
    justifyContent : 'space-around',
  },
  
  titre_register: {
    color: '#9292FE',
    fontSize: 15,
  },
  btn_sign_in : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    backgroundColor: '#9292FE',
  },
  buttonText_sign_in :  {
    fontSize : 15,
    color : '#fff'
  },
  buttonText_sign_up: {
    fontSize : 15,
    color : '#9292FE'
  },

  
  // UIKIT POUR LES BTN 
  btn_sign_in : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    backgroundColor: '#9292FE',
  },
  btn_sign_up : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
  },
  buttonText_sign_in :  {
    fontSize : 15,
    color : '#fff'
  },
  buttonText_sign_up: {
    fontSize : 15,
    color : '#9292FE'
  },


  //----------------Box recette----------------
  
});