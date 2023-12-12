import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Text, 
  View,
  KeyboardAvoidingView,
  TextInput,
  Touchable,
  TouchableOpacity,
 } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignInScreen() {
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
          />
          </View>
          {/* Saisie mot de passe */}
          <View style={styles.inputContainer}> 
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput 
            style={styles.input} 
            placeholder= 'Saisis ton mot de passe' 
            keyboardType='visible-password'    
          />
          </View>


          {/* Boutons forgot password + Se connecter */}
          <View style={styles.containerButton}>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in}  >
              <Text style={styles.buttonText_sign_in}> Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_sign_up} >
              <Text style={styles.buttonText_sign_up}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>

{/* partie à revoir pour mise de place des icones */}
        {/* Icons de connexion */}
        <View style={styles.iconContainer}>
          <View> 
            <Text> S'inscrire avec:</Text>
          </View>
          <View style={styles.iconsSign}> 
            <FontAwesome name='apple' size={22} /> 
            <FontAwesome name='google' size={22} />
        <FontAwesome name='facebook' size={22} />
        </View>

        
          {/* connexion already user  */}
        <View >
          <Text>New user?</Text>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} >
              <Text style={styles.buttonText_sign_in}>Termes & conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} >
              <Text style={styles.buttonText_sign_up}>Créer un compte</Text>
            </TouchableOpacity>

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
    width: '70%',
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

  iconsSign: {
    flexDirection: 'row',
    backgroundColor:'green',
    width: '100%'
  },

   // icon de connexion
  iconStyle: {
    marginHorizontal: 10,
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