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
    Platform
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

export default function OrderScreen() {

  // stock info du chef 
  const [chefInfo, setChefInfo] = useState({});
  const [chefId, setChefId] = useState('657b29f494c3dc2f6cc4576c');

  // useEffect to upload the informations about the chefs when click on recipes when ordering 
  useEffect(() => {
    fetch(`https://chefs-backend-amber.vercel.app/users/chef/${chefId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setChefInfo(data.data);
      });
  }, [setChefId]);

  
  const handleBookingDate = () => {
  
  }


  return (
    <KeyboardAvoidingView style={styles.container}>

        {/* --- HEADER SECTION  --- */}
        <View style={styles.nav_bar_color}></View>
        <View style={styles.container_box_width}>
        {/* Top of the page */}
          <View style={styles.topHead}>
            <View style={styles.containeur_fleche}>
                <FontAwesome name='arrow-left' size={22}  />
            </View>
            <View>
            {/* Ternary operator : if object is truthy, we access property name  */}
            {/* Loading...: if not truthy, provide feedback to user that sata is being fetched   */}
            <Text style={[styles.txt_h1, {marginTop: 10}]}>Chef.fe: {chefInfo.userProfil ? chefInfo.userProfil.prenom : 'Loading...'}
            </Text>
            </View>
          </View>


          {/* --- TOP SECTION --- */}
          <View style={styles.container_topSection}>
                  {/* Chef section - (experience, pic, description) */}
                  {/* container top part */}
              <View style={styles.box1}>
                <Image 
                // créer modèle prop pour
                source={require('../assets/chefNaima.jpg')}
                style={styles.photo}
                />
                <View style={styles.box_description}>
                  <Text style={styles.txt_p_regular}>Années d'expérience:</Text>
                    <Text style={styles.txt_p_regular_small}>{chefInfo.userChef ? chefInfo.userChef.services  : 'Loading...'}(s)</Text>
                </View>
              </View>

              <View style={styles.box2}> 
                <Text style={styles.txt_p_regular}>Un petit mot sur ton chef.ffe:</Text>
                  <Text style={styles.txt_p_regular_small}>{chefInfo.userChef ? chefInfo.userChef.experience : 'Loading...'}</Text>
              </View>
                  </View>



                  {/* --- MIDDLE SECTION --- */}
                  <View style={styles.container_middleSection}>
                    {/* left part */}
                    <View style={styles.middleSection_left}> 
                      <View>
                        <Text style={styles.txt_h2}>Le plat le plus populaire</Text>
                      </View>
                      <View style={styles.middleSectionBox}>
                        <Image 
                              // créer modèle prop pour
                              source={require('../assets/chefNaima.jpg')}
                              style={styles.photoDish}
                              />
                        <View style={styles.containeur_box_recipe}>
                          <TouchableOpacity  activeOpacity={1}>
                              <Text style={styles.margin_left_recipe}>Tajine</Text>
                              <View style={styles.box_description_recipe}>
                              <FontAwesomeIcon icon={faBowlFood} style={styles.margin_left_recipe}/>
                                <Text>Marocain</Text>
                            </View>
                          </TouchableOpacity>
                          </View>
                        
                      </View>
                    </View>

                    {/*  right part  */}
                    <View style={styles.middleSection_right}>
                      <Text style={styles.txt_h2}> User's compliments</Text>
                      <View>
                      <Text style={{ marginLeft: 10 }}> Super nice</Text>
                      <Text style={{ marginLeft: 30 }}> Neat and tidy</Text>
                      <Text style={{ marginLeft: 10 }}> Very professionnal</Text>
                      <Text style={{ marginLeft: 30 }}> Amazing experience</Text>
                      </View>
                    </View>
                  </View>



                  {/* E--- BOTTOM SECTION --- */}
                  <View style={styles.bottom_box}>
                    <Text>Laisse un commentaire pour ton chef(allergens, etc etc)</Text>
                  </View>

                  {/* Bouton de connexion */}
                  <TouchableOpacity  onPress={handleBookingDate}style={[styles.button, { marginTop: 20}]} >
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

    container_box_width:{
      width: "85%",
      flex:1,
      alignItems: 'center',
    },

    topHead: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft : 50,
      marginRight: 50,
    },

    nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: '8%',
    },

    containeur_fleche: {
    width: "80%",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 30,
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

      // --- TOP SECTION --- 

      container_topSection: {
        height : '30%',
        flexDirection: 'row',
        width: '100%',
        justifyContent : 'space-around',
        marginTop: 20,
      },

      box1 : {
        width : '35%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius : 10,
        paddingTop: 20,
      },

      box_description: {
        alignItems: 'flex-start',
        marginTop: 10,
        paddingLeft: 10
      },

      box2: {
        width: '50%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderRadius: 15, // Au lieu de borderRadius: '15'
        borderColor: '#5959F0',
        backgroundColor: 'rgba(146, 146, 254, 0.19)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
      },
      

  photo:{
    width : "90%",
    height: '60%',
    borderRadius: '20',
  },


  // --- MIDDLE SECTION ---

  container_middleSection: {
    flexDirection: 'row',
    height:'30%',
    width: '90%',
    alignContent: 'center',
  },

  middleSection_left: {
    width: '40%',
    borderBottomLeftRadius: 10,
        borderBottomRightRadius : 10,
        borderWidth: 1,
        borderRadius: '15',
        borderColor: '#5959F0',
        backgroundColor: 'rgba(146, 146, 254, 0.19)',
    
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
  paddingLeft: 20,
},

containeur_box_recipe: {
  height : '20%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingTop: 10,
},

  box_description_recipe : {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingTop: 2,
  },
  
  margin_left_recipe:{
    marginLeft : 5,
  },

          // right seciton 
      middleSection_right: {
        width: '60%',
        borderColor: '#5959F0',
        paddingLeft: 10,
  },

  txt_h2 : {
    color: '#5959F0',
    fontSize: 15,
    fontWeight: 'bold',
},


// --- BOTTOM SECTION ---

bottom_box: {
  height:'10%',
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
  marginTop: 10,
  marginRight: 32,
  marginLeft: 32,
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
