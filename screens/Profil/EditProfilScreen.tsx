import { StatusBar } from 'expo-status-bar';
import { 
  Alert, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { ObjectId } from 'mongoose';
import { useNavigation } from '@react-navigation/native';
import { login, logout} from '../../reducers/user';
//import user from '../../reducers/user';
//import { UserState } from '../../reducers/user';



//TYPESCRIPT DES ELEMENTS
interface Adresse {
  rue: string;
  ville: string;
  codePostal: string;
}

//A MODIFIER POUR ENLEVER LES MSG ERREUR
interface UserProfil {
  email: any;
  token: any;
  adresse: any;
  userProfile: any;
  user: {
    email: string | null;
    token: string | null;
    userProfile: {
      nom: string | null;
      prenom: string | null;
      dateOfBirth: Date | null;
      adresse: {
        rue: string | null;
        ville: string | null;
        codePostal: string | null;
      };
      tel: string | null;
      chef: boolean | null;
    };
  };
}

interface UserState {
  user: {
    value: {
      email: string | null;
      token: string | null;
      userProfile: {
        nom: string | null;
        prenom: string | null;
        dateOfBirth: Date | null;
        adresse: {
          rue: string | null;
          ville: string | null;
          codePostal: string | null;
        };
        tel: string | null;
        chef: boolean | null;
      }
    };
  };
}



export default function EditProfilScreen() {

//HOOK DETAT
  const [ user, setUser ] =useState<UserProfil| null>(null);
  //const [ userConnexion, setUserConnexion ] = useState<boolean | null>(true);
  const [ modifCoordonne, setModifCoordonne ] = useState<boolean>(false);
  const [ modifEmailPw, setModifEmailPw ] = useState<boolean>(false);
  const [ newRue, setNewRue ] = useState<string | null >("");
  const [ newVille, setNewVille ] = useState<string | null>("");
  const [ newCodePostal, setNewCodePostal ] = useState<string | null>("");
  const [ newTel, setNewTel ] = useState<string | null>("");
  const [ newEmail, setNewEmail ] = useState<string | null>("");
  const [ newPw, setNewPw ] = useState<string | null>("");
  const [ showErrorTel, setShowErrorTel ] = useState<boolean> (false);
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

//REDUCER RECUPERER EST POUSSER DANS LE HOOK DETAT USER
  const reducerUser = useSelector((state: UserState) => state.user.value);
  //console.log(reducerUser);
  useEffect(() => {
    setUser(reducerUser);
  },[reducerUser]); 
  //console.log(user);

  
//Changer de numéro + vérif données renseignés
  const changeTel = () => {
    const newValueTel: string = newTel || (user && user.userProfile.tel) || "";
    //const newValueTel : string | null = newTel ? newTel: user? user.userProfile.tel : null;
    
    //const pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const TEL_REGEX = /^0[0-9]{9}$/;
    if (newValueTel !== null && TEL_REGEX.test(newValueTel)) {
      setModifCoordonne(!modifCoordonne);
      if(user) {
        //fetch(`http://192.168.1.106:3000/users/profil/${userConnexion.userProfile}/update-tel`, {
        fetch(`http://192.168.1.106:3000/users/profil/579c585c03077192e6dea33/update-tel`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({newTel: newValueTel}),
        })
          .then(res => res.json())
          .then(data => {
            //console.log(data);
            if(data.result) {
              //setShowAdresseMsg(false);
              setShowErrorTel(false);
            } else { 
             console.log(data.message);
            } 
          })
          .catch((error) => {
            console.error('Erreur lors de la requête POST :', error);
          });
      } else {
        console.log('no userConnexion');
      }
    } else {
      console.log("mauvais format");
      Alert.alert(
        'Erreur',
        'Le mot de passe doit contenir au moins une majuscule, un chiffre et une minuscule, et avoir une longueur minimale de 6 caractères.'
      );
    }
  };



//Changer adresse
  const changeAdresse = () => {
    setModifCoordonne(!modifCoordonne);
    const newAdresse = {
      rue: newRue? newRue : user? user.adresse.rue : null,
      ville: newVille? newVille : user? user.adresse.ville: null,
      codePostal: newCodePostal? newCodePostal : user? user.adresse.codePostal: null,
    };
    //fetch(`http://192.168.1.106:3000/users/profil/${userId}/update-adresse`,
    if (user) {
      //fetch(`http://192.168.1.106:3000/users/profil/${user.userProfile}/update-adresse`, {
      fetch(`http://192.168.1.106:3000/users/profil/579c585c03077192e6dea33/update-adresse`, {
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
            //recupInfoUser();
          } else { 
            //setShowAdresseMsg(true);
            //let errorAdress = data.message;
            console.log('erreur de données');
          } 
        })
        .catch((error) => {
          console.error('Erreur lors de la requête POST :', error);
        });
      } else {
        console.log('no userConnexion ')
      }
    
  };

//Changer Email => PAS TESTE!! ATTENTE DU REDUCER EN PLACE!!
  const changeEmail = () => {
    const newValueEmail : string | null = newEmail ? newEmail: user? user.email : null;
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (newValueEmail !== null && EMAIL_REGEX.test(newValueEmail)) {
      if(user) {
        //fetch(`http://192.168.1.106:3000/users/${userConnexion.token}/update-email`, {
        fetch(`http://192.168.1.106:3000/users/${user.token}/update-email`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({newEmail: newValueEmail}),
        })
          .then(res => res.json())
          .then(data => {
            //console.log(data);
            if(data.result) {
              setModifEmailPw(!modifEmailPw);
              //setShowAdresseMsg(false);
            } else { 
              console.log(data.message);
            } 
          })
          .catch((error) => {
            console.error('Erreur lors de la requête POST :', error);
          });
      } else {
        console.log('no userConnexion');
      }
    } else {
      console.log("mauvais format");
      Alert.alert(
        'Erreur',
        'Votre email n\'est pas validde'
      );
    }
  };

//Changer PW => PAS TESTE!! ATTENTE DU REDUCER EN PLACE!!
  const changePW = () => {
    const newValuePW : string | null = newPw ? newPw: null;
    const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (newValuePW !== null && PW_REGEX.test(newValuePW)) {
      if(user) {
        //fetch(`http://192.168.1.106:3000/users/${userConnexion.token}/update-password`, {
        fetch(`http://192.168.1.106:3000/users/${user.token}/update-password`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({newPassword: newValuePW}),
        })
          .then(res => res.json())
          .then(data => {
            //console.log(data);
            if(data.result) {
              setModifEmailPw(!modifEmailPw);
            } else { 
              console.log(data.message);
            } 
          })
          .catch((error) => {
            console.error('Erreur lors de la requête POST :', error);
          });
      } else {
        console.log('no userConnexion');
      }
    } else {
      console.log("mauvais format");
      Alert.alert(
        'Erreur',
        'Votre mots de passe n\'est pas validde'
      );
    }
  };

//PW oublié // COMMENT ONT FAIT?????
  const forgetPW = () => {

  };


//INFOS DU USER
  const afficherLesInfos = user ? (
      <>
        <View style={styles.blocProfil}> 
          <Text style={styles.inputText}>Nom: {user.userProfile.nom}</Text>
          <Text style={styles.inputText}>Prenom: {user.userProfile.prenom}</Text>
        {/*} <Text style={styles.inputText}>Date de naissance:  { userProfil.dateOfBirth? userProfil.dateOfBirth.toLocaleDateString() : "../../...." }</Text> */}
          <Text style={styles.inputText}>Email: {user.email}</Text>
          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> setModifEmailPw(!modifEmailPw)}>
            <Text style={styles.buttonText_sign_in}>Modifier mon Mots de passe et/ou Email</Text>
          </TouchableOpacity>
        </View> 
        <View style={styles.blocProfil}> 
          <Text style={styles.inputText}>Adresse: {user.userProfile.adresse.rue}</Text>
          <Text style={styles.inputText}>Ville: {user.userProfile.adresse.ville}</Text>
          <Text style={styles.inputText}>Code postal: {user.userProfile.adresse.codePostal}</Text>
          <Text style={styles.inputText}>Téléphone: {user.userProfile.tel}</Text>
          <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> setModifCoordonne(!modifCoordonne)}>
            <Text style={styles.buttonText_sign_in}>Modifier mes coordonnées</Text>
          </TouchableOpacity>
        </View>
      </>
  ) : <Text>Oops... Il y a eu un petit problème on dirais</Text> ;


//PROFIL USER POUVANT MODIFIER CES INFOS => NAVIGATION ENTRE INFOPROFIL, MODIFIER ADRESSE et MODIFIER EMAIL/PW 
  const profil = user ? (
    <View style={styles.container}> 
        <View style={styles.container_box_width}>
          {modifEmailPw ? 
/*MODIFIER LE PW ou EMAIL*/
            <> 
              <View >
                <TextInput 
                  style={styles.input} 
                  placeholder={user.email}
                  onChangeText={(value) => setNewEmail(value)} 
                  value={newEmail || "" }/>
              </View> 
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changeEmail()} >
                  <Text style={styles.buttonText_sign_in}>Valider le nouvel Email</Text>
                </TouchableOpacity>
              <TextInput 
                style={styles.input} 
                placeholder="******"
                onChangeText={(value) => setNewPw(value)} 
                value={newPw || "" }/>
              <View style={styles.buttonEmailPw}>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changePW()} >
                  <Text style={styles.buttonText_sign_in}>Valider le nouveau mots de passe</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> forgetPW()} >
                  <Text style={styles.buttonText_sign_up}>Mots de passe oublié?</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.backBtn} onPress={()=> setModifEmailPw(!modifEmailPw)} >
                  <Text style={styles.buttonText_sign_up}>←</Text>
                </TouchableOpacity>
              </View>
              </> : modifCoordonne ?
/*MODIFIER LES COORDONNES */
              <> 
                <TextInput 
                  style={styles.input} 
                  placeholder={user.userProfile.adresse.rue}
                  onChangeText={(value) => setNewRue(value)} 
                  value={newRue || "" }/>
                <TextInput 
                  style={styles.input} 
                  placeholder={user.userProfile.adresse.ville}
                  onChangeText={(value) => setNewVille(value)} 
                  value={newVille || "" }/>
                <TextInput 
                  style={styles.input} 
                  placeholder={user.userProfile.adresse.codePostal}
                  onChangeText={(value) => setNewCodePostal(value)} 
                  value={newCodePostal || "" }/>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changeAdresse()} >
                  <Text style={styles.buttonText_sign_in}>Valider la nouvelle adresse</Text>
                </TouchableOpacity>
                <TextInput 
                  style={styles.input} 
                  placeholder={user.userProfile.tel}
                  onChangeText={(value) => setNewTel(value)} 
                  value={newTel || "" }/>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changeTel()} >
                  <Text style={styles.buttonText_sign_in}>Valider le nouveau numéro</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.backBtn} onPress={()=> setModifCoordonne(!modifCoordonne)} >
                  <Text style={styles.buttonText_sign_up}>←</Text>
                </TouchableOpacity>
              </> :
/*JUSTE AFFICHER LES INFO*/
         afficherLesInfos }
        </View>
      </View>
  ): null;


  return (
      <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
        <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> dispatch(logout())}>
          <Text style={styles.buttonText_sign_in}>LOGOUT: Vider reducer</Text>
        </TouchableOpacity>
        <Text style={styles.txt_h1}>Profil</Text>
        { user ? profil : (
          <View style={styles.container}>
            <Text>Oops... Il y a eu un petit problème on dirais</Text>
          </View>
        )}
       <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: "100%",
    //marginTop : 50,
  },
  btn_sign_in : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    backgroundColor: '#9292FE',
    marginTop: 10,
  },
  buttonText_sign_in :  {
    fontSize : 15,
    color : '#fff',
    textAlign: 'center',
  },
  btn_sign_up : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
    marginTop: 10,

  },
  buttonText_sign_up: {
    fontSize : 15,
    color : '#9292FE',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#9292FE', 
    borderStyle: 'solid', 
    paddingHorizontal: 10,
    marginBottom: 10, 
  },
  inputText: {
    height: 40,
    width: '100%',
    //borderColor: '#9292FE',
    //borderRadius:10,
    //borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#9292FE', 
    borderStyle: 'solid', 
    paddingHorizontal: 10,
    color: '#9292FE',
    textAlignVertical: 'center',
    marginTop: 10,
    
  },
  errorMsg: {
    color: 'red',
    fontSize: 10,
  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  container_box_width:{
    margin: 0,
    padding: 0,
    width: "100%",
    flex:1,
    height: "100%",
    //display: 'flex',
    
    //backgroundColor:'red',
  },
  identite: {
    minWidth: "80%",
    
  },
  buttonEmailPw: {
    display:'flex',
    flexDirection: 'column',
    //maxWidth: "80%",
  },
  blocProfil: {
    //marginBottom: 30,
    marginTop: 30,
  },
  txt_h1 : {
    color: '#5959F0',
    fontSize: 30,
},
backBtn: {
  paddingBottom: 5, // 10 units of padding at the top and bottom
  paddingHorizontal: 15, // A
  borderRadius:50,
  borderWidth: 2,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
}
});
