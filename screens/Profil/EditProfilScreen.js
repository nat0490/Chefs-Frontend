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
import { useNavigation } from '@react-navigation/native';
import { login, logout} from '../../reducers/user';
//import user from '../../reducers/user';


export default function EditProfilScreen() {

//HOOK DETAT
  //const [ user, setUser ] =useState(null);
  const [ modifCoordonne, setModifCoordonne ] = useState(false);
  const [ modifEmailPw, setModifEmailPw ] = useState(false);
  const [ newRue, setNewRue ] = useState("");
  const [ newVille, setNewVille ] = useState("");
  const [ newCodePostal, setNewCodePostal ] = useState("");
  const [ newTel, setNewTel ] = useState("");
  const [ newEmail, setNewEmail ] = useState("");
  const [ newPw, setNewPw ] = useState("");
  const [ forgetPw, setForgetPw] = useState(false);
  
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

//REDUCER RECUPERER EST POUSSER DANS LE HOOK DETAT USER
  const user = useSelector((state) => state.user.value);

  /*
  //console.log(reducerUser);
  useEffect(() => {
    setUser(reducerUser);
  },[reducerUser]); 
  //console.log(user);
*/
  
//Changer de numéro 
  const changeTel = () => {
    const newValueTel = newTel ? newTel: user.tel ;
    //const pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
//A DECOMENTER!!
    //const TEL_REGEX = /^0[0-9]{9}$/;
    if (newValueTel !== null /*&& TEL_REGEX.test(newValueTel)*/) {
      setModifCoordonne(!modifCoordonne);
      if(user) {
        fetch(`https://chefs-backend-amber.vercel.app/users/profil/${user.userProfile.id}/update-tel`, {
        //fetch(`http://192.168.1.106:3000/users/profil/579c585c03077192e6dea33/update-tel`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({newTel: newValueTel}),
        })
          .then(res => res.json())
          .then(data => {
            //console.log(data);
            if(data.result) {
              const userInfo = {
                email : user.email,
                token : user.token,
                userProfile : {
                  id : user.userProfile.id,
                  nom : user.userProfile.nom,
                  prenom : user.userProfile.prenom,
                  dateOfBirth : user.userProfile.dateOfBirth,
                  adresse : {
                    rue : user.userProfile.adresse.rue,
                    ville : user.userProfile.adresse.ville,
                    codePostal : user.userProfile.adresse.codePostal,
                  }, 
                  tel : newValueTel,
                  chef : user.userProfile.chef,
                  }
                };
              //console.log(userInfo)
              dispatch(logout());
              dispatch(login(userInfo));
              setModifCoordonne(!modifCoordonne);
              setNewTel("");
              
            } else { 
             console.log(data.message);
            } 
          })
          .catch((error) => {
            console.error('Erreur lors de la requête PUT :', error);
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
    const newAdresse = {
      rue: newRue? newRue : user.userProfile.adresse.rue,
      ville: newVille? newVille : user.userProfile.adresse.ville,
      codePostal: newCodePostal? newCodePostal : user.userProfile.adresse.codePostal,
    };
    if (user) {
      //console.log(user.userProfile.id);
      fetch(`https://chefs-backend-amber.vercel.app/users/profil/${user.userProfile.id}/update-adresse`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newAdresse),
      })
        .then(res => res.json())
        .then(data => {
          //console.log(data);
          if(data.result) {
            const userInfo = {
              email : user.email,
              token : user.token,
              userProfile : {
                id : user.userProfile.id,
                nom : user.userProfile.nom,
                prenom : user.userProfile.prenom,
                dateOfBirth : user.userProfile.dateOfBirth,
                adresse : newAdresse ,
                tel : user.userProfile.tel,
                chef : user.userProfile.chef,
                }
              };
            console.log(userInfo)
            dispatch(logout());
            dispatch(login(userInfo));
            setModifCoordonne(!modifCoordonne);
            setNewRue("");
            setNewVille("");
            setNewCodePostal("");
          } else { 
            console.log('erreur de données', data.message);
          } 
        })
        .catch((error) => {
          console.error('Erreur lors de la requête PUT :', error);
        });
      } else {
        console.log('no userConnexion ')
      }
    
  };

//Changer Email
  const changeEmail = () => {
    const newValueEmail = newEmail ? newEmail: user.email;
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (newValueEmail !== null && EMAIL_REGEX.test(newValueEmail)) {
      if(user) {
        //console.log(user.token);
        fetch(`https://chefs-backend-amber.vercel.app/users/${user.token}/update-email`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({newEmail: newValueEmail}),
        })
          .then(res => res.json())
          .then(data => {
            //console.log(data);
            if(data.result) {
              const userInfo = {
                email : newValueEmail,
                token : user.token,
                userProfile : {
                  id : user.userProfile.id,
                  nom : user.userProfile.nom,
                  prenom : user.userProfile.prenom,
                  dateOfBirth : user.userProfile.dateOfBirth,
                  adresse : {
                    rue : user.userProfile.adresse.rue,
                    ville : user.userProfile.adresse.ville,
                    codePostal : user.userProfile.adresse.codePostal,
                  },
                  tel : user.userProfile.tel,
                  chef : user.userProfile.chef,
                  }
                };
              console.log(userInfo)
              dispatch(logout());
              dispatch(login(userInfo));
              setModifEmailPw(!modifEmailPw);
              setEmail("");
              //setShowAdresseMsg(false);
            } else { 
              console.log(data.message);
            } 
          })
          .catch((error) => {
            console.error('Erreur lors de la requête PUT :', error);
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

//Changer PW 
  const changePW = () => {
    const newValuePW = newPw ? newPw: null;
    const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (newValuePW !== null && PW_REGEX.test(newValuePW)) {
      if(user) {
        fetch(`https://chefs-backend-amber.vercel.app/users/${user.token}/update-password`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({newPassword: newValuePW}),
        })
          .then(res => res.json())
          .then(data => {
            //console.log(data);
            if(data.result) {
              setModifEmailPw(!modifEmailPw);
              setNewPw("");
            } else { 
              console.log(data.message);
            } 
          })
          .catch((error) => {
            console.error('Erreur lors de la requête PUT :', error);
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


//INFOS DU USER: AFFICHER CES INFOS EN LE RECUPERANT DANS LE REDUCER
  const afficherLesInfos = user ? (
      <>
          <View style={styles.topPage}> 
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Setting' )}>
              <Text style={styles.btnTextBack}>←</Text>
            </TouchableOpacity>
            <Text style={styles.txt_h1}>Profil</Text>
          </View>
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
       forgetPw ? 
/*PAGE MOTS DE PASSE OUBLIE*/
        <>
            <View> 
              <TouchableOpacity style={styles.backBtn} onPress={()=> {setForgetPw(!forgetPw)}}>
                <Text style={styles.btnTextBack}>←</Text>
              </TouchableOpacity>
              <Text style={styles.txt_h1}>Mots de passe oublié?</Text>
            </View>
            <Text>Veuillez rentrer votre adresse email ci-dessous et nous vous enverons les instructions</Text>
            <Text style={styles.inputText}>Email</Text>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in}>
              <Text style={styles.buttonText_sign_in}>Valider</Text>
            </TouchableOpacity>
        </> :
/*PAGE MODIF MOTS DE PASSE & EMAIL*/
            <> 
              <View > 
                <TouchableOpacity style={styles.backBtnAlone} onPress={()=> setModifEmailPw(!modifEmailPw)}>
                  <Text style={styles.btnTextBack}>←</Text>
                </TouchableOpacity>
                <Text style={{...styles.txt_h1, marginBottom: 50}}>Modifier Email / Mots de passe</Text>
              </View>
              <View >
                <TextInput 
                  style={styles.input} 
                  placeholder={user.email}
                  onChangeText={(value) => setNewEmail(value)} 
                  value={newEmail || "" }/>
              </View> 
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changeEmail()} >
                  <Text style={styles.buttonText_sign_in}>Valider</Text>
                </TouchableOpacity>
              <View >
              <TextInput 
                style={styles.input} 
                placeholder=""
                onChangeText={(value) => setNewPw(value)} 
                value={newPw || "" }/>
                </View >
              <View style={styles.buttonEmailPw}>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changePW()} >
                  <Text style={styles.buttonText_sign_in}>Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> setForgetPw(!forgetPw)} >
                  <Text style={styles.buttonText_sign_up}>Mots de passe oublié?</Text>
                </TouchableOpacity>
              </View>
              </> : modifCoordonne ?
/*MODIFIER LES COORDONNES */
              <View> 
                <View> 
                  <TouchableOpacity style={styles.backBtnAlone} onPress={()=> setModifCoordonne(!modifCoordonne)}>
                    <Text style={styles.btnTextBack}>←</Text>
                  </TouchableOpacity>
                  <Text style={styles.txt_h1}>Modifier coordonnées</Text>
                </View>
                <View> 
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
                </View>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changeAdresse()} >
                  <Text style={styles.buttonText_sign_in}>Valider</Text>
                </TouchableOpacity>
                <View> 
                <TextInput 
                  style={styles.input} 
                  placeholder={user.userProfile.tel}
                  onChangeText={(value) => setNewTel(value)} 
                  value={newTel || "" }/>
                </View>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> changeTel()} >
                  <Text style={styles.buttonText_sign_in}>Valider le nouveau numéro</Text>
                </TouchableOpacity>
              </View> :
/*JUSTE AFFICHER LES INFO*/
         afficherLesInfos }
        </View>
      </View>
  ): null;


  return (
      <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
        
        { user ? profil : (
          <View style={styles.container}>
            <Text>Oops... Il y a eu un petit problème on dirais</Text>
          </View>
        )}
        
       <StatusBar style="auto" />
      </View>
  );
};

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
    paddingVertical: 10, 
    paddingHorizontal: 25, 
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
    borderBottomWidth: 1,
    borderBottomColor: '#9292FE', 
    borderStyle: 'solid', 
    paddingHorizontal: 10,
    color: '#9292FE',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  container_box_width:{
    margin: 0,
    padding: 0,
    width: "80%",
    flex:1,
    height: "100%",
  },
  identite: {
    minWidth: "80%",
  },
  buttonEmailPw: {
    display:'flex',
    flexDirection: 'column',
  },
  blocProfil: {
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
  marginBottom: 50,
},
backBtnAlone: {
  width: '20%',
  marginTop: 20,
  paddingBottom: 5, // 10 units of padding at the top and bottom
  paddingHorizontal: 15, // A
  borderRadius:50,
  borderWidth: 2,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
  marginBottom: 20,
},
topPage: {
  width:"100%",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  paddingRight: 100,
},
btnTextBack: {
  fontSize : 30,
  fontWeight: 300,
  color : '#9292FE'
},
});
