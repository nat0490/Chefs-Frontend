import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Adresse {
  rue: string;
  ville: string;
  codePostal: string;
}

interface UserProfil {
  id: string,
  nom: string;
  prenom: string;
  dateOfBirth: Date;
  adresse: Adresse;
  tel: string;
  chef: boolean,
  userConnexion: string,
  orders: string[],
  userPreference: string[],
}

export default function EditProfilScreen() {

  const [ userProfil, setUserProfil ] =useState<UserProfil | null>(null);
  //A RECUPERER DANS UN REDUCER
  const [ userIdConnexion, setUserIdConnexion ] = useState<String | null>(null);
  const [ modifCoordonne, setModifCoordonne ] = useState<boolean>(false);
  const [ newRue, setNewRue ] = useState<string | null >("");
  const [ newVille, setNewVille ] = useState<string | null>("");
  const [ newCodePostal, setNewCodePostal ] = useState<string | null>("");
  const [ newTel, setNewTel ] = useState<string | null>("");
  const [ showAdresseMsg, setShowAdresseMsg] = useState<boolean>(false);

  
//recuperer les info de le BDD
  const recupInfoUser = () => {
    fetch(`http://localhost:3000/users/profil/${userIdConnexion}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        setUserProfil(data.data);
      })
  }
//recupère les info de le BDD au chargement de la page
  useEffect(()=> {
    recupInfoUser();
  },[]);

  const changeTel = () => {
    fetch('http://localhost:3000/users')
  };



  let errorAdress = "";
  const changeAdresse = () => {
    setModifCoordonne(!modifCoordonne);
    const userId = userProfil.id ;
    const newAdresse = {
      rue: newRue || userProfil.adresse.rue,
      ville: newVille || userProfil.adresse.ville,
      codePostal: newCodePostal || userProfil.adresse.codePostal
    };
    fetch(`http://localhost:3000/users/${userId}/update-adresse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newAdresse),
    })
      .then(res => res.json())
      .then(data => {
        if(data.result) {
          //récupère les infos à jour de BDD pour les afficher
          setShowAdresseMsg(false);
          recupInfoUser();
        } else { 
          setShowAdresseMsg(true);
          errorAdress = data.message;
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST :', error);
      });
  };

  //InfoUser
  const userDetails = userProfil? (
    <View> 
      <View>
        <Text>Identité</Text>
        <View> 
          <Text>{userProfil.nom}</Text>
          <Text>{userProfil.prenom}</Text>
          <Text>{userProfil.dateOfBirth.toDateString()}</Text>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} >
          <Text style={styles.buttonText_sign_in}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View> 
          <Text>Coordonées</Text>
          
            { modifCoordonne ?
            <View> 
              <TextInput 
                style={styles.input} 
                placeholder={userProfil.adresse.rue}
                onChangeText={(value) => setNewRue(value)} 
                value={newRue || "" }/>
              <TextInput 
                style={styles.input} 
                placeholder={userProfil.adresse.ville}
                onChangeText={(value) => setNewVille(value)} 
                value={newVille || "" }/>
              <TextInput 
                style={styles.input} 
                placeholder={userProfil.adresse.codePostal}
                onChangeText={(value) => setNewCodePostal(value)} 
                value={newCodePostal || "" }/>
                <Text style={styles.errorMsg}>* {errorAdress}</Text>
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> changeAdresse()} >
                <Text style={styles.buttonText_sign_up}>Changer l'adresse</Text>
              </TouchableOpacity>

              <TextInput 
                style={styles.input} 
                placeholder={userProfil.tel}
                onChangeText={(value) => setNewTel(value)} 
                value={newTel || "" }/>
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> changeTel()} >
                <Text style={styles.buttonText_sign_up}>Changer le numéro</Text>
              </TouchableOpacity>
            </View> :

            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> setModifCoordonne(!modifCoordonne)}>
              <Text style={styles.buttonText_sign_up}>{userProfil.adresse.rue}</Text>
              <Text style={styles.buttonText_sign_up}>{userProfil.adresse.ville}</Text>
              <Text style={styles.buttonText_sign_up}>{userProfil.adresse.codePostal}</Text>
              <Text style={styles.buttonText_sign_up}>{userProfil.tel}</Text>
            </TouchableOpacity>
          }
            
          
         

         {/* <Text>{userProfil.adresse.rue}</Text>
          <Text>{userProfil.adresse.ville}</Text>
          <Text>{userProfil.adresse.codePostal}</Text>
        <Text>Telephone: {userProfil.tel}</Text> */}
        </View>
        
      </View>
    </View>
  ): null;



  return (
    <View style={styles.container}>
      <Text>EDIT PROFIL SCREEN</Text>
     {userDetails}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_sign_in : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    backgroundColor: '#9292FE',
  },
  buttonText_sign_in :  {
    fontSize : 15,
    color : '#fff'
  },
  btn_sign_up : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
  },
  buttonText_sign_up: {
    fontSize : 15,
    color : '#9292FE'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#9292FE',
    borderRadius:10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  errorMsg: {
    color: 'red',
    fontSize: 10,
  }
});
