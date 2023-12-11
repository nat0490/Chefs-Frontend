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

export default function App() {
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
            placeholder= 'apple votre mail' 
            keyboardType='email-address'   
          />
          </View>

          {/* Saisie mot de passe */}
          <View style={styles.inputContainer}> 
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput 
            style={styles.input} 
            placeholder= 'Saisissez votre mot de passe' 
            keyboardType='visible-password'    
          />
          </View>

          {/* Boutons forgot password + Se connecter */}
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}> Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>

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
        <View>
<<<<<<< HEAD
          <Text>New user?</Text>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.buttonText}> Termes & conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} >
            <Text style={styles.buttonText}> Créer un compte</Text>
          </TouchableOpacity>
        </View>
=======
        <FontAwesome name='apple1' size={10}  />
        <FontAwesome name='google' size={10}  />
        <FontAwesome name='facebook-with-circle' size={10}  />
>>>>>>> 019355d3980c764d1ef5c4ff7f4b3655ba5bbc75

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
    backgroundColor: 'red',
    width: '90%'
  },

  // email & mot de passe
  
  inputContainer : {
    width: '70%',
   backgroundColor :'red',
   }, 
   label: {
    fontSize: 14,
    color: "#615DEC"
  },
  
  // Boutons forgot password + Se connecter
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  iconsSign: {
    flexDirection: 'row',
    backgroundColor:'green',
    width: '100%'
  },

   // icon de connexion
  iconContainer : {
    marginHorizontal: 30,
    flexDirection: 'column',
    width: '90%'
  },
  iconStyle: {
    marginHorizontal: 10,
  },
    buttonText: {
      fontSize: 16,
      textAlign: 'center',
    },
});