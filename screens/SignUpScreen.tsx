import { StatusBar } from 'expo-status-bar';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert , Pressable ,Platform} from 'react-native';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DateTimePikers from "@react-native-community/datetimepicker"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { login, logout} from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //Etats des input 
  const [nameInput, setNameInput] = useState('');
  const [prenomInput, setPrenomInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [streetInput , setStreetInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [dateOfBirthInput , setDateOfBirthInput] = useState('');
  const [postalInput, setPostalInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [accepteConditions, setAccepteConditions] = useState(false);

  // date piker
  const [date , setDate] = useState(new Date());
  const [voirPikerData , setVoirPikerData] = useState(false);

  const toogleDataPiker = () => {
    setVoirPikerData(!voirPikerData)
  }

  const confirmeIosDate = () => {
    setDateOfBirthInput(date.toDateString())
    toogleDataPiker();
  }
  const onChange = ({type}, selectedDate) => {
    
      if(type === 'set'){
        const currentDate = selectedDate;
        setDate(currentDate);
        if(Platform.OS === 'android'){
          toogleDataPiker()
          setDateOfBirthInput(currentDate.toDateString());
        }
      }else{
        toogleDataPiker()
      }
  }

// Les regex pour l'email , password 
//////////Déroulement //////////////

// J'ai deux const verifierEmail, verifierMotDePasse Qui seront appeler quand je lance mon submit (Le reste au dessus de  handleSubmitRegister)
    const verifierEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail valide.');
        return false;
      }
      return true;
    };

    const verifierMotDePasse = () => {
      // La regex vérifie si le mot de passe contient au moins une majuscule, un chiffre et une minuscule
      const motDePasseRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!motDePasseRegex.test(passwordInput)) {
        Alert.alert(
          'Erreur',
          'Le mot de passe doit contenir au moins une majuscule, un chiffre et une minuscule, et avoir une longueur minimale de 6 caractères.'
        );
        return false;
      }
      return true;
    };

// Quand j'appuie sur mon onPresse je déclanche mon handleSubmitRegister qui fait appel au deux fonction de regex 

const handleSubmitRegister = () => {
  if (verifierEmail() && verifierMotDePasse()) {
      fetch('http://172.20.10.5:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: passwordInput,
          email: emailInput,
          nom: nameInput,
          prenom: prenomInput,
          dateOfBirth: dateOfBirthInput,
          rue: streetInput,
          ville: cityInput,
          codePostal: postalInput,
          tel: phoneInput,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.result) {
            setPasswordInput('');
            setEmailInput('');
            setNameInput('');
            setPrenomInput('');
            setStreetInput('');
            setPhoneInput('');
            setDateOfBirthInput('');
            setPostalInput('');
            setCityInput('');
            Alert.alert('Vous êtes connecté');
            navigation.navigate('Preference');
          }
        })
        .catch(error => {
          console.error('Erreur réseau :', error);
          // Gérez l'erreur ici, par exemple, en affichant un message à l'utilisateur
          Alert.alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        });
    
      }
};


  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      {/* Fleche revenir sur la page précédente  */}
      <View style={styles.containeur_fleche}>
        <FontAwesome name='arrow-left' size={22}  />
      </View>

      <View style={styles.containeur_navigation_view}> 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.detailContainer}>
            <View style={{height: 5,width: '100%',backgroundColor: '#9292FE',marginBottom: 5}}></View>
            <Text style={styles.txt_p_bold}>Detail</Text>
          </View>
          <View style={styles.detailContainer}>
          <View style={{height: 5,width: '100%',backgroundColor: '#E9EBEE',marginBottom: 5}}></View>
            <Text style={styles.txt_p_bold}>Preferences</Text>
          </View>
          <View style={styles.detailContainer}>
          <View style={{height: 5,width: '100%',backgroundColor: '#E9EBEE',marginBottom: 5}}></View>
            <Text style={styles.txt_p_bold}>Submit</Text>
          </View>
        </View>
      </View>

       {/* Input Doublie prenom  nom*/}
          <View style={styles.view_double_input}>
            <View style={{flex: 1,}}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input_double, { marginRight: 0}]}
                placeholder="Name"
                onChangeText={(value) => setNameInput(value)}
                value={nameInput}
              />
            </View>
            <View style={{flex: 1,}}>
              <Text style={[styles.label, { marginLeft: 16}]}>Prenom</Text>
              <TextInput
                placeholder="Prenom"
                style={[styles.input_double, { marginLeft: 16}]}
                onChangeText={(value) => setPrenomInput(value)}
                value={prenomInput}
              />
            </View>
          </View> 
          
      {/* Zone de saisie pour l'email */}
      <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Saisissez votre Email"
                onChangeText={(value) => setEmailInput(value)}
                value={emailInput}
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
      
          {/* Input Doublie prenom  nom*/}
          <View style={styles.view_double_input}>
            <View style={{flex: 1,}}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={[styles.input_double, { marginRight: 0}]}
                placeholder="Phone"
                keyboardType="numeric"  
                onChangeText={(value) => setPhoneInput(value)}
                value={phoneInput}
              />
            </View>
            <View style={{flex: 1, position: 'relative'}}>
              <Text style={[styles.label, { marginLeft: 16}]}>Date d'anniversaire</Text>
              {/* Affiche un TextInput non modifiable si voirPikerData est faux */}
              {!voirPikerData && (
                <Pressable onPress={toogleDataPiker}>
                  <TextInput
                    style={[styles.input_double, { marginLeft: 16}]}
                    placeholder="lundi 10 Aout 2024"
                    value={dateOfBirthInput}
                    onChangeText={setDateOfBirthInput}
                    editable={false}
                    onPressIn={toogleDataPiker}
                  />
                </Pressable>
              )}
            </View>
          </View> 
           {/* Zone de saisie pour le phone number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Rue</Text>
            <TextInput
              style={styles.input}
              placeholder="Le nom de votre rue"
              onChangeText={(value) => setStreetInput(value)}
              value={streetInput}
            />
          </View>
          {/* Affiche le sélecteur de date uniquement si voirPikerData est vrai */}
          {voirPikerData && (
            <>
              <DateTimePikers
                mode='date'
                display='spinner'
                value={date}
                onChange={onChange}
                style={styles.datePicker}
              />

              {Platform.OS === 'ios' && (
                // Le code spécifique à iOS que vous souhaitez inclure ici
                <View style={{ width:'80%',flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity style={styles.button} onPress={toogleDataPiker}>
                    <Text style={{ color:'white'}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={confirmeIosDate}>
                    <Text  style={{ color:'white'}}>Confirmer</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

        {/* Input Doublie city postale*/}
          <View style={styles.view_double_input}>
            <View style={{flex: 1,}}>
              <Text style={styles.label}>City</Text>
              <TextInput
                placeholder="City"
                style={[styles.input_double, { marginRight: 0}]}
                onChangeText={(value) => setPostalInput(value)}
                value={postalInput}
              />
            </View>
            <View style={{flex: 1,}}>
              <Text style={[styles.label, { marginLeft: 16}]}>Postale</Text>
              <TextInput
                placeholder="Postale"
                style={[styles.input_double, { marginLeft: 16}]}
                onChangeText={(value) => setCityInput(value)}
                value={cityInput}
              />
            </View>
          </View> 
          

      {/* Bouton de connexion */}
      <TouchableOpacity  onPress={handleSubmitRegister}style={[styles.button, { marginTop: 40}]} >
        <Text style={styles.buttonText}>Welcome!</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }}>
        <CheckBox
          checked={accepteConditions}
          onPress={() => setAccepteConditions(!accepteConditions)}
        />
        <Text >J'accepte les termes et conditions</Text>
      </View>

      <Text>OR</Text>
      <View style={styles.iconContainer}>
            <View style={{alignItems:'center'}}> 
            <Text> ───────  Sign Up using   ────── </Text>
            </View>
            <View style={styles.iconsSign}> 
              <FontAwesome name='apple' size={40} /> 
              <FontAwesome name='google' size={40} />
              <FontAwesome name='facebook' size={40} />
            </View>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    // Global Container Styles
    container: {
      flex: 1,
      alignItems: 'center',
    },
  
    // Navigation Bar Styles
    nav_bar_color: {
      backgroundColor : '#9292FE',
      width: '100%',
      height: 65,
    },
  
    // Arrow Container Styles
    containeur_fleche: {
      width: "80%",
      marginTop: 20,
      marginBottom: 10,
    },
  
    // Navigation View Styles
    containeur_navigation_view: {
      width: "80%",
      marginTop: 20,
      marginBottom: 20,
    },
  
    // Input Styles
    input: {
      height: 40,
      width: '100%',
      borderColor: '#9292FE',
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 10,
    },
  
    // Button Styles
    button: {
      backgroundColor: '#9292FE',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
  
    // Button Text Styles
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
   
    // Label Styles
    label: {
      marginTop: 5,
      fontSize: 14,
      color: "#615DEC",
    },
  
    // Input Container Styles
    inputContainer: {
      width: '80%',
    }, 
  
    // Double Input View Styles
    view_double_input: {
      flexDirection: 'row',
      width: '80%', 
      justifyContent: 'space-between',
    },
  
    // Double Input Styles
    input_double: {
      height: 40,
      width: '90%',
      borderColor: '#9292FE',
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 10,
    },
  
    // Date Picker Styles
    datePicker: {
      height: 120,
      marginTop: -10,
      
    },
  
    // Detail Container Styles
    detailContainer: {
      width: '32%',
      alignItems: 'center',
    },
  
    // Text Styles
    txt_p_bold: {
      color: '#615DEC',
      fontSize: 16,
      fontWeight: 'bold',
    },
    
    // Icon Container Styles
    iconContainer: {
      marginHorizontal: 30,
      flexDirection: 'column',
      width: '80%',
      marginTop: 20,
    },
  
    // Icon Styles
    iconStyle: {
      marginHorizontal: 10,
    },
  
    // Icons Sign Styles
    iconsSign: {
      flexDirection: 'row',
      marginTop: 10,
      width: '100%',
      justifyContent: 'space-between',
    },
});
