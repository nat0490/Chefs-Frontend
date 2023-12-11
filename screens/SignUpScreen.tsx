import { StatusBar } from 'expo-status-bar';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';

export default function App() {

  //Etats des input 

  const [nameInput, setNameInput] = useState('');
  const [eamilInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');


  return (
    <View style={styles.container}>

      {/* Zone de saisie pour le nom d'utilisateur */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisissez votre name"
          onChangeText={(value) => setNameInput(value)}
          value={nameInput}
        />
      </View>
      {/* Zone de saisie pour l'email */}
      <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Saisissez votre Email"
                onChangeText={(value) => setEmailInput(value)}
                value={eamilInput}
              />
      </View>
      {/* Zone de saisie pour le mot de passe */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisissez votre mot de passe"
          secureTextEntry={true} // Pour masquer le texte du mot de passe
          onChangeText={(value) => setPasswordInput(value)}
          value={passwordInput}
        />
      </View>
       {/* Zone de saisie pour le phone number */}
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Saisissez votre numéro de téléphone"
          keyboardType="numeric"  
          onChangeText={(value) => setPhoneInput(value)}
          value={phoneInput}
        />
      </View>
      {/* Zone de saisie pour le phone number */}
      <View style={styles.inputContainer}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Saisissez votre numéro de téléphone"
              keyboardType="numeric"  
              onChangeText={(value) => setPhoneInput(value)}
              value={phoneInput}
            />
          </View>
      {/* Bouton de connexion */}
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#9292FE',
    borderRadius:10,
    borderWidth: 1,

    paddingHorizontal: 10,
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
  label: {
    fontSize: 14,
    color: "#615DEC"
  },
  inputContainer : {
   width: '70%',
  backgroundColor :'red',
  }, 
  
});
