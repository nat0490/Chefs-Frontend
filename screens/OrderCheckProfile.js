import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { View,
    KeyboardAvoidingView,
    TextInput,
    Image,  
    Text,
    StyleSheet, 
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
export default function OrderScreen() {

  const navigation = useNavigation();

  // stock info du chef 
  const [chefInfo, setChefInfo] = useState({});
  const [chefId, setChefId] = useState('657f1e697bd0e0c4c6054e71');

  // managing the comments 
  const [commentaireVisible, setCommentaireVisible] = useState(true); //
  const [commentaire, setCommentaire] = useState('');

  // managing the recipe display 
  const [recipeList, setRecipeList] = useState([]);
  const [ recipeType, setRecipeType ] = useState('');

  // managing the touchable for chefs & recettes 
  const handleDisplayChef = () =>{
    navigation.navigate('HomeChefs')
   };
   const handleDisplayRecette = () =>{
    navigation.navigate('HomePlat')
   };

  // useEffect to upload the informations about the chefs when click on recipes when ordering 
  useEffect(() => {
    fetch(`https://chefs-backend-amber.vercel.app/users/chef/${chefId}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const info = data.data
        setChefInfo(info);

        const recipes = info.recipes && info.recipes.map((recipes, index) => (
          <TouchableOpacity key={index} activeOpacity={1}>
            <View>
              <Text>{recipes.title}</Text>
            </View>
          </TouchableOpacity>
        ))
        setRecipeList(recipes)
      });
  }, 
  [setChefId]);


    // managing the comments 
  const handleComment = (text) => { // calling the function when text input chages 
    setCommentaire(text);
    if (text.length > 0) {
      setCommentaireVisible('false')
    } else {
      setCommentaireVisible('true')
    }
  }



  return (
    <KeyboardAvoidingView style={styles.container}>

        {/* --- HEADER SECTION  --- */}
        <View style={styles.nav_bar_color}></View>
        <View style={styles.container_box_width}>
        {/* Top of the page */}
          <View style={styles.topHead}>
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('HomePlat')} style={styles.backButton}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
          </View>
            <View>
            {/* Ternary operator : if object is truthy, we access property name  */}
            {/* Loading...: if not truthy, provide feedback to user that data is being fetched   */}
            <Text style={styles.chefNameTitle}>Ton chef: {chefInfo.userProfil ? chefInfo.userProfil.prenom : 'Loading...'}
            </Text>
            </View>
            </View>


          {/* --- TOP SECTION --- */}
          <View style={styles.container_topSection}>
                  {/* container top part */}
              <View style={styles.box1}>
                <TouchableOpacity onPress={handleDisplayChef} activeOpacity={1}>
                  <Image 
                  // IL FAUT modif modèle pour image !!!!!!! 
                  source={require('../assets/chefNaima.jpg')}
                  style={styles.photo}
                  />
                </TouchableOpacity>
                <View style={styles.box_description}>
                  <Text style={[styles.txt_p_regular, {fontSize: 10}]}>Notre collab depuis:</Text>
                    <Text style={[styles.txt_p_regular_small_top, {fontSize: 10}]}>{chefInfo ? chefInfo.services  : 'Loading...'} merveilleuse(s) année(s)</Text>
                </View>
              </View>

              <View style={styles.box2}> 
                <Text style={styles.boxDescp}>Un petit mot de ton chef :</Text>
                  <Text style={[styles.txt_p_regular_small]}>{chefInfo ? chefInfo.experience : 'Loading...'}</Text>
              </View>
            </View>



                  {/* --- MIDDLE SECTION --- */}
                  <View style={styles.container_middleSection}>
                    {/* left part */}
                    <View style={styles.middleSection_left}> 
                      <View style={styles.tendance}>
                        <FontAwesome name="fire" size={20} color="orange" />
                        <Text style={[styles.txt_box, {paddingLeft: 10}]}>Tendance</Text>
                      </View>

                      <View style={styles.middleSectionBox}>
                        <Text style={{fontSize: 15}}>{recipeList} </Text>
                      </View>
                    </View>
                      
                    {/*  right part  */}
                    <View style={styles.middleSection_right}>
                      <Text style={[styles.txt_h2, { marginLeft: 15, marginBottom: 10 }]}>User's compliments</Text>
                      <View style={styles.complimentsBox}>
                        {chefInfo && chefInfo.userCompliment
                          ? chefInfo.userCompliment.map((compliment, index) => (
                              <Text key={index} style={{ fontSize: 12 }}>{compliment}</Text>
                            ))
                          : <Text> 'Loading...' </Text>}
                      </View>
                    </View>

                    </View>


                  {/* --- BOTTOM SECTION --- */}
                  <View style={styles.bottom_boxSection}>
                    <View style={styles.bottom_box}> 
                    <TextInput
                      style={styles.commentaire}
                      placeholder="Ajoute un commentaire pour ton chef (allergens, besoins spéciaux, etc"
                      value={commentaire}
                      onChangeText={handleComment}
                    />
                    </View>
                 </View>

                  {/* Bouton de connexion */}
                  <TouchableOpacity  onPress={()=> navigation.navigate('BookDate')} style={[styles.button, { marginTop: 20}]} >
                    <Text style={styles.buttonText}>Je choisis ma date</Text>
                  </TouchableOpacity>

              <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({

  // ----- général ----- 
    container: {
    flex: 1,
    alignItems: 'center',
    },

    nav_bar_color: {
      backgroundColor : '#9292FE',
      width: '100%',
      height: '8%',
      },

    container_box_width:{
      width: "85%",
      flex:1,
      alignItems: 'center',
    },

    topHead: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },

    backButton: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: '10%',

    },

    chefNameTitle: {
      color: '#5959F0',
      fontSize: 20,
      paddingLeft: 20,
      paddingTop: 40,
      // fontWeight: 700,
    },

   // Police 

  txt_h1 : {
    color: '#5959F0',
    fontSize: 30,
  },

    txt_h2 : {
      color: '#5959F0',
      fontSize: 20,
  },

  txt_p_regular: {
    color: '#5959F0',
    fontSize: 12,
    // fontWeight: 'bold',
},

txt_p_regular_small: {
  color: 'black',
  fontSize: 12,
  // fontWeight: 'lighter',
},

txt_p_regular_small_top: {
  color: '#5959F0',
  fontSize: 12,
  // fontWeight: 'lighter',
},
      // --- TOP SECTION --- 

      container_topSection: {
        height : '30%',
        flexDirection: 'row',
        width: '100%',
        justifyContent : 'space-around',
        marginTop: 20,
      },

      box1 : {
        width : '40%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius : 10,
        paddingBottom: 30,
      },


      box_description: {
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop: 0,
      },

      box2: {
        width: '50%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#5959F0',
        backgroundColor: 'rgba(146, 146, 254, 0.25)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        marginTop: 10,
        padding: 10,
      },
  
      boxDescp: {
        paddingBottom: 10,
        fontSize: 12,
        color: '#5959F0',
        // fontWeight: 600,
      },
      

  photo:{
    marginTop: 20,
    width : "90%",
    height: '70%',
    borderRadius: 20,
  },


  // --- MIDDLE SECTION ---

  container_middleSection: {
    flexDirection: 'row',
    height:'30%',
    width: '100%',
    alignContent: 'center',
  },

  middleSection_left: {
    width: '40%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius : 10,
    borderRadius: 15,
    borderColor: '#5959F0',
    backgroundColor: 'rgba(146, 146, 254, 0.20)',
  },

  tendance: {
    paddingLeft: 10,
    paddingTop: 5,
    flexDirection: 'row', 
    alignItems: 'center',  
  },

  txt_box : {
    color: '#5959F0',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 5,
},

  middleSectionBox: {
    width : '100%',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
},

  
  middleSection_right: {
    width: '55%',
    borderColor: '#5959F0',        
    marginLeft: 10,
    alignItems: 'center', 
  },

  txt_h2 : {
    color: '#5959F0',
    fontSize: 15,
    // fontWeight: 600,
},
complimentsBox: {
  width: '100%',
  height: '100%',
  textAlignVertical: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 30,
  marginRight: 10,
  marginTop: 10,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: 'rgba(146, 146, 254, 0.15)',
  height: 40,
  width: '100%',
  paddingHorizontal: 10,
  
},


// --- BOTTOM SECTION ---

bottom_boxSection: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

bottom_box: {
  width:'100%',
  height: '70%',
  marginTop: 20,
  backgroundColor: 'rgba(146, 146, 254, 0.19)',
  borderWidth: 0.5,
  borderColor: 'rgba(189, 189, 189, 0.00)',
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowRadius: 4,
  shadowOpacity: 1,
},

commentaire: {
  fontSize: 10,
  margin: 5,
  marginTop: 5,
  paddingLeft: 10,
},

button: {
  backgroundColor: '#9292FE',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
},

buttonText: {
  color: 'white',
  fontSize: 16,
  textAlign: 'center',
},


});
