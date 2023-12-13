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
  //A RECUPERER DANS UN REDUCER + RAJOUTER HOOK DEFFET AU DEMARRAGE DE LA PAGE
  const [ userConnexion, setUserConnexion ] = useState<String | null>(null);
  const [ modifCoordonne, setModifCoordonne ] = useState<boolean>(false);
  const [ newRue, setNewRue ] = useState<string | null >("");
  const [ newVille, setNewVille ] = useState<string | null>("");
  const [ newCodePostal, setNewCodePostal ] = useState<string | null>("");
  const [ newTel, setNewTel ] = useState<string | null>("");
  //const [ showAdresseMsg, setShowAdresseMsg] = useState<boolean>(false);
  const [ showErrorTel, setShowErrorTel ] = useState<boolean> (false);

  

  
//recuperer les info user de le BDD
  const recupInfoUser = () => {
    //fetch(`http://192.168.1.106:3000/users/profil/${userIdConnexion}`)
    fetch(`http://192.168.1.106:3000/users/profil/6576fae61101e0d05ba3d1f7`)
      .then(res => res.json())
      .then(data => {
        //console.log(data.data);
        setUserProfil(data.data);
      })
  }
  //EN ATTENTE DU REDUCER
  const recupConnexionUser = () => {
    const reducerUser = useSelector((state) => state.user.value);
    setUserConnexion(reducerUser);
  }

//A FAIRE AU CHARGEMENT DE LA PAGE
  useEffect(()=> {
    recupInfoUser();
   // recupConnexionUser();
  },[]);

  //let errorTel ="";
  const changeTel = () => {
    const userId = userProfil? userProfil.id : null;
    const newValueTel = newTel ? newTel: userProfil? userProfil.tel : null;
    //const pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const pattern = /^0[0-9]{9}$/;
    if (pattern.test(newValueTel)) {
      setModifCoordonne(!modifCoordonne);
      //setShowErrorTel(false);
      //fetch(`http://192.168.1.106:3000/users/profil/${userId}/update-tel`,
    fetch(`http://192.168.1.106:3000/users/profil/6576fae61101e0d05ba3d1f7/update-tel`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({newTel: newValueTel}),
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        if(data.result) {
          //récupère les infos à jour de BDD pour les afficher
          //setShowAdresseMsg(false);
          setShowErrorTel(false);
        } else { 
          setShowErrorTel(true);
        } 
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST :', error);
      });
    } else {
      console.log("mauvais format");
      setShowErrorTel(true);
    }
  };

  const changeAdresse = () => {
    setModifCoordonne(!modifCoordonne);
    const userId = userProfil? userProfil.id : null;
    const newAdresse = {
      rue: newRue? newRue : userProfil? userProfil.adresse.rue : null,
      ville: newVille? newVille : userProfil? userProfil.adresse.ville: null,
      codePostal: newCodePostal? newCodePostal : userProfil? userProfil.adresse.codePostal: null,
    };
    //fetch(`http://192.168.1.106:3000/users/profil/${userId}/update-adresse`,
    fetch(`http://192.168.1.106:3000/users/profil/6576fae61101e0d05ba3d1f7/update-adresse`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newAdresse),
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        if(data.result) {
          //récupère les infos à jour de BDD pour les afficher
          //setShowAdresseMsg(false);
          recupInfoUser();
        } else { 
          //setShowAdresseMsg(true);
          //let errorAdress = data.message;
          console.log('erreur de données');
        } 
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST :', error);
      });
  };

  //InfoUser
  //EMAIL A RECUPERER, COMMENT??
  const userDetails = userProfil? (
    <View> 
      <View>
        <View> 
          <Text style={styles.inputText}>Nom: {userProfil.nom}</Text>
          <Text style={styles.inputText}>Prenom: {userProfil.prenom}</Text>
          <Text style={styles.inputText}>Date de naissance:  { userProfil.dateOfBirth? userProfil.dateOfBirth.toLocaleDateString() : "../../...." }</Text>
        </View>
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
                
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> changeAdresse()} >
                <Text style={styles.buttonText_sign_up}>Changer l'adresse</Text>
              </TouchableOpacity>

              <TextInput 
                style={styles.input} 
                placeholder={userProfil.tel}
                onChangeText={(value) => setNewTel(value)} 
                value={newTel || "" }/>
                { showErrorTel ? <Text style={styles.errorMsg}>* Mauvais format</Text> : null }
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> changeTel()} >
                <Text style={styles.buttonText_sign_up}>Changer le numéro</Text>
              </TouchableOpacity>
            </View> :
            <> 
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> setModifCoordonne(!modifCoordonne)}>
              <Text style={styles.inputText}>Adresse: {userProfil.adresse.rue}</Text>
              <Text style={styles.inputText}>Ville: {userProfil.adresse.ville}</Text>
              <Text style={styles.inputText}>Code postal: {userProfil.adresse.codePostal}</Text>
              <Text style={styles.inputText}>Téléphone: {userProfil.tel}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} >
              <Text style={styles.buttonText_sign_in}>Edit</Text>
            </TouchableOpacity>
            </>
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
  inputText: {
    height: 40,
    width: '100%',
    borderColor: '#9292FE',
    borderRadius:10,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#9292FE',
    textAlignVertical: 'center',
    
  },

  errorMsg: {
    color: 'red',
    fontSize: 10,
  }
});
