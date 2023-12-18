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
    YellowBox
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function OrderScreen() {

  const navigation = useNavigation();

  // stock info du chef 
  const [chefInfo, setChefInfo] = useState({});
  const [chefId, setChefId] = useState('657b29f494c3dc2f6cc4576c');

  // managing the comments 
  const [commentaireVisible, setCommentaireVisible] = useState(true); //
  const [commentaire, setCommentaire] = useState('');

  // managing the touchable for chefs & recettes 
  const handleDisplayChef = () =>{
    navigation.navigate('HomeChefs')
   };
   const handleDisplayRecette = () =>{
    navigation.navigate('HomePlat')
   };

  // useEffect to upload the informations about the chefs when click on recipes when ordering 
  useEffect(() => {
    fetch(`http://192.168.0.127:3000/users/chef/${chefId}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setChefInfo(data.data);
      });
  }, [setChefId]);


  const handleComment = (text) => { // calling the function when text input chages 
    setCommentaire(text);
    if (text.lenght > 0) {
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
            <View style={styles.containeur_fleche} onPress={() => navigation.goBack()}>
              <FontAwesome name='arrow-left' size={22} onPress={() => navigation.goBack()} />
            </View>
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
                        <TouchableOpacity onPress={handleDisplayRecette} activeOpacity={1}>
                          <Image 
                              // créer modèle prop pour
                              source={require('../assets/userchef.png')}
                              style={styles.photoDish}
                              />
                        </TouchableOpacity>
                        <View style={styles.containeur_box_recipe}>
                          <TouchableOpacity  activeOpacity={1}>
                              <Text style={styles.margin_left_recipe}>Tajine</Text>
                              <View style={styles.box_description_recipe}>
                              <FontAwesomeIcon icon={faBowlFood} style={styles.margin_left_recipe}/>
                                <Text style={styles.margin_left_recipe}>Marocain</Text>
                            </View>
                          </TouchableOpacity>
                          </View>
                        
                      </View>
                    </View>

                    {/*  right part  */}
                    <View style={styles.middleSection_right}>
                      <Text style={[styles.txt_h2, {marginLeft: 15, marginBottom: 10}]}> User's compliments</Text>
                      <View style={styles.compliments}>
                      <Text style={styles.firstCompliment}>{chefInfo ? chefInfo.userCompliment : 'Loading...'}</Text>
                      <Text style={styles.secondCompliment}> xxx </Text>
                      <Text style={styles.firstCompliment}> yyy </Text>
                      <Text style={styles.secondCompliment}> zzzz</Text>
                      </View>
                    </View>
                  </View>



                  {/* E--- BOTTOM SECTION --- */}
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

    containeur_fleche: {
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
    },

    chefNameTitle: {
      color: '#5959F0',
      fontSize: 20,
      paddingLeft: 20,
      paddingTop: 40,
      fontWeight: '700',
    },

   // Police 

  txt_h1 : {
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
    fontWeight: 'bold',
},

txt_p_regular_small: {
  color: 'black',
  fontSize: 12,
  fontWeight: 'lighter',
},

txt_p_regular_small_top: {
  color: '#5959F0',
  fontSize: 12,
  fontWeight: 'lighter',
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
        paddingTop: 10,
        paddingBottom: 30,
      },

      photo:{
        width : "90%",
        height: '80%',
        borderRadius: '20',
      },

      box_description: {
        alignItems: 'flex-start',
        paddingLeft: 10,
      },

      box2 : {
        width : '55%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius : 10,
        borderRadius: '15',
        borderColor: '#5959F0',
        backgroundColor: 'rgba(146, 146, 254, 0.19)',
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
        fontWeight: '600',
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
    borderRadius: '15',
    borderColor: '#5959F0',
    backgroundColor: 'rgba(146, 146, 254, 0.19)',
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

photoDish:{
  width : "90%",
  height: '60%',
  borderRadius: 20,
},

containeur_box_recipe: {
  height : '20%',
  flexDirection: 'row',
  flexWrap: 'wrap',
},

margin_left_recipe:{
  margin: 5,
  fontSize: 10,
},

  box_description_recipe : {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingTop: 2,
  },
  
  

          // right part 
  middleSection_right: {
    width: '55%',
    borderColor: '#5959F0',        
    paddingLeft: 10,
  },

  txt_h2 : {
    color: '#5959F0',
    fontSize: 15,
    fontWeight: 'bold',
},

compliments : {
  marginTop: 10,
  padding: 5,
},

firstCompliment : {
  height: 20,
  width: '100%',
  borderColor: '#9292FE',
  borderRadius: 10,
  borderWidth: 1,
  paddingHorizontal: 10,
  marginBottom: 20,
  marginLeft: 15,
  fontSize: 12,
  textAlign: 'center',
},

secondCompliment : {
  height: 20,
  width: '100%',
  borderColor: '#9292FE',
  borderRadius: 10,
  borderWidth: 1,
  paddingHorizontal: 10,
  marginBottom: 20,
  fontSize: 12,
  textAlign: 'center',
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
