import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Text, 
  View,
  KeyboardAvoidingView,
  TextInput,
  Touchable,
  TouchableOpacity,
  Platform,
  Alert,
 } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
 import React, { useEffect, useState } from 'react';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'



import { useDispatch, useSelector } from 'react-redux';
// importer reducer 
import { login } from '../reducers/user';
import {add, remove} from '../reducers/typeCuisine';


// Grabbed from emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//REGARDE LE STYLE
//JAI MIS DU STYLE EN COMMENTAIRE POUR ENLEVER LES MSG D'ERREUR, Je ne sais pas se que ça modifiait

export default function SignInScreen() {
  const navigation = useNavigation();
  const reducerUser = useSelector((state) => state.user.value);

    // Etats des input
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');


//REDUCER TYPE CUISINE : FETCH pour récuperer tous les type puis Dispatch pour les mettre dans le reducer
  const fetchData = async () => {
   
    try {
      //console.log('recuperer type de cuisine');
      const response = await fetch(`https://chefs-backend-amber.vercel.app/userPreference/display_preference`);
      //console.log(response);
      if (!response.ok) {
        throw new Error(`Réponse du serveur non valide: ${response.status}`);
      }  
      const result = await response.json();
      //console.log(result);
      result.data.forEach((item) => {
        dispatch(add({ id: item._id, typeCuisine: item.typeCuisine }));
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données depuis la base de données', error);
    }
  };
  useEffect(()=> {
    fetchData();
  },[])
  






  // création signin connexion 
  const handleConnection = () => {
    //console.log('handle connection');
    if(EMAIL_REGEX.test(emailInput)) {
      fetch('https://chefs-backend-amber.vercel.app/users/signin', {
      //fetch('http://192.168.1.106:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    }).then(response => response.json())
    .then(data => {
      //console.log(data);
      if (data.result) {
        //console.log(data);
        setEmailInput('');
        setPasswordInput('');
        
        const userInfo = {
          id: data.dataUserConnexion.userProfile._id,
          email : data.dataUserConnexion.email,
          token : data.dataUserConnexion.token,
          userProfile : {
            nom : data.dataUserConnexion.userProfile.nom,
            prenom : data.dataUserConnexion.userProfile.prenom,
            dateOfBirth : data.dataUserConnexion.userProfile.dateOfBirth,
            adresse : {
              rue : data.dataUserConnexion.userProfile.adresse.rue,
              ville : data.dataUserConnexion.userProfile.adresse.ville,
              codePostal : data.dataUserConnexion.userProfile.adresse.codePostal,
            },
            tel : data.dataUserConnexion.userProfile.tel,
            chef : data.dataUserConnexion.userProfile.chef,
            orders: data.dataUserConnexion.userProfile.chef.orders,
            userPreference: data.dataUserConnexion.userProfile.chef.userPreference,
            }
          };
        console.log(userInfo);
        dispatch(login(userInfo));
        navigation.navigate('HomeTabs', { screen: 'Main' }) ;
      } 
    }) .catch(error => {
      console.error('Error during signin:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion.');
    });
  } else {
  Alert.alert('Erreur', 'Votre email n\'est pas valide');
  }
}
  //console.log(reducerUser);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* block header */}
      <View style={styles.nav_bar_color}></View>

      <View style={[styles.QuetuChoisisPourTonStyle, styles.marginTop]}> 
        <View>
          <View> 
            {/* Saisie titre */}
            <Text style={{ ...styles.txt_h1, marginLeft: 10 }}>Salut toi !</Text>
            <Text style={{ ...styles.txt_h1_2, marginLeft: 20 }}>Prêt à passer a la casserole ?</Text>
            <StatusBar style="auto" />
          </View>

          <View> 
              {/* Saisie email */}
              <View style={styles.inputContainer}> 
                <Text style={styles.label}>Email</Text>
                <TextInput 
                style={styles.input} 
                placeholder= 'Entre ton adresse email' 
                keyboardType='email-address'   
                value={emailInput}
                onChangeText={(value) => setEmailInput(value)}
              />
              </View>
              {/* Saisie mot de passe */}
              <View style={styles.inputContainer}> 
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput 
                style={styles.input} 
                placeholder= 'Saisis ton mot de passe' 
                keyboardType='visible-password'  
                value={passwordInput}  
                onChangeText={(value) => setPasswordInput(value)}
            
              />
              </View>


              {/* Boutons forgot password + Se connecter */}
              <View style={styles.container_btn}>
                <TouchableOpacity activeOpacity={1}
                style={styles.btn_sign_in}
                // ajouter onPress redirection page
                >
                  <Text style={styles.buttonText_sign_in}> Mot de passe oublié ?</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => {handleConnection()
                  //navigation.navigate('Preference');
                  }}
                  style={styles.btn_sign_up}>
                  <Text style={styles.buttonText_sign_up}> Se connecter</Text>
                </TouchableOpacity>
              </View>
            </View>

    {/* partie à revoir pour mise de place des icones */}
            {/* Icons de connexion */}
            <View>
              <View style={styles.iconContainer}>  
                <View style={{alignItems:'center'}}> 
                  <Text style={styles.txt_p_regulard}> ──── S'inscrire avec: ─── </Text>
                </View>
               <View style={styles.iconsSign}> 
                  <FontAwesomeIcon icon={faApple} size={40}/>
                  <FontAwesomeIcon icon={faGoogle} size={40}/>
                  <FontAwesomeIcon icon={faFacebook}size={40}/>

                  { /*
                <FontAwesome name='apple' size={40} /> 
                <FontAwesome name='google' size={40} />
                <FontAwesome name='facebook' size={40} /> */}
              </View>
          </View>

            
              {/* connexion new user  */}
            <View style={styles.section_btn_register}>
              <Text style={styles.titre_register}>New user?</Text>
              <View style={styles.container_btn_bottom}> 
                <TouchableOpacity
                activeOpacity={1}
                style={styles.btn_sign_in}
                onPress={() => navigation.navigate('Terms')}
                >
                  <Text style={styles.buttonText_sign_in}>Termes & conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                activeOpacity={1}
                style={styles.btn_sign_up} 
                onPress={() => navigation.navigate('Sign_up')}
                >
                  <Text style={styles.buttonText_sign_up}>Créer un compte</Text>
                </TouchableOpacity>
            </View>
            </View>
            
        </View>

    </View>
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

  marginTop:{
    margin : 20,
  },

  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },

  txt_h1 : {
      color: '#5959F0',
      fontSize: 40,
      marginTop : 20,
      textAlignVertical: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,
      //fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 600,
      //letterspacing: -1.5,
},

txt_h1_2 : {
    color: '#5959F0',
      fontSize: 40,
      marginTop : 5,
      textAlignVertical: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,
      //fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 600,
      //letterspacing: -1.5,
      marginBottom: 40,
},

txt_p_bold : {
  color: 'black',
  fontSize: 12,
  fontWeight: 600,
},

txt_p_regulard: {
  color: 'black',
  fontSize: 12,
},


  // ----- email & mot de passe -----
  input: {
    height: 40,

    borderColor: '#9292FE',
    borderRadius:10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },



  label: {
    marginTop: 5,
    fontSize: 14,
    color: "#615DEC"
  },
  
  // ----- Boutons forgot password + Se connecter -----
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // ----- Icons de connexion  -----
  iconContainer: {
    marginHorizontal: 30,
    flexDirection: 'column',
    marginTop: 20,
  },

  iconsSign: {
    flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between',
  },

    // ----- boutons -----
    section_btn_register: {
      marginTop: 30,
      alignItems: 'center',
    },
    container_btn: {
      marginTop: 10,
      flexDirection : 'row',
      justifyContent : 'space-around',
    },
    
    container_btn_bottom: {
      marginTop: 10,
      flexDirection : 'row',
      justifyContent: 'space-between',
    },

    titre_register: {
      color: '#9292FE',
      fontSize: 15,
    },
  
    
    // UIKIT POUR LES BTN 
    btn_sign_in : {
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
      backgroundColor: '#9292FE',
    },

    btn_sign_up : {
      paddingVertical: 5,
  paddingHorizontal: 15,
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

//LOGO APPLE/FB/GOOGLE
 /*
    iconStyle: {
      
      fontSize: 20,
    } */

   
});