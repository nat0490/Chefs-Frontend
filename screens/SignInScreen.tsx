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
 import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
// importer reducer 
import { login } from '../reducers/user';

// Grabbed from emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function SignInScreen() {

    // Etats des input
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');


  // création signin connexion 
  const handleConnection = () => {
    if (EMAIL_REGEX.test(emailInput)) {
      fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    }).then(response => response.json())
    .then(data => {
      if (data.result) {
        dispatch(login({username: , token: data.token} ));
        setEmailInput('');
        setPasswordInput('');
      }
    })
    } else {
      Alert.alert(
        'Erreur',
        'Votre email n\'est pas validde'
      )
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View> 
        {/* Saisie titre */}
        <Text>Salut toi ! Prêt a passer a la casserole ?</Text>
        <StatusBar style="auto" />
      </View>

      <View style={styles.contentContainer}> 
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
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in}  >
              <Text style={styles.buttonText_sign_in}> Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={handleConnection} 
            style={styles.btn_sign_up} >
              <Text style={styles.buttonText_sign_up}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>

{/* partie à revoir pour mise de place des icones */}
        {/* Icons de connexion */}
        <View>
          <View>  
            <Text style={styles.iconContainer}> S'inscrire avec:</Text>
          </View>
          <View style={styles.iconsSign}> 
            <FontAwesome name='apple' size={30} /> 
            <FontAwesome name='google' size={30} />
        <FontAwesome name='facebook' size={30} />
        </View>

        
          {/* connexion already user  */}
        <View>
          <Text >New user?</Text>
          <View style={styles.buttonContainer}> 
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} >
              <Text style={styles.buttonText_sign_in}>Termes & conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} >
              <Text style={styles.buttonText_sign_up}>Créer un compte</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({

  // général
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    padding: 10,
  },

  // email & mot de passe
  input: {
    height: 40,
    width: '100%',
    borderColor: '#9292FE',
    borderRadius:10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputContainer : {

   }, 
  label: {
    fontSize: 14,
    color: "#615DEC"
  },
  
  // Boutons forgot password + Se connecter
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Icons de connexion 
  iconContainer: {
    width: '100%',
    backgroundColor:'green',
    
  },
  iconsSign: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',


  },


    // boutons 
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
    }

   
});