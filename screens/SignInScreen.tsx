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
            placeholder= 'Saisissez votre mail' 
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
        <View>
        <FontAwesome name='apple1' size={10}  />
        <FontAwesome name='google' size={10}  />
        <FontAwesome name='facebook-with-circle' size={10}  />

        </View>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  contentContainer: {
    backgroundColor: 'red'
  },
  inputContainer : {
    width: '70%',
   backgroundColor :'red',
   }, 
   containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
   label: {
    fontSize: 14,
    color: "#615DEC"
  },
  button: {
    backgroundColor: 'blue',
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