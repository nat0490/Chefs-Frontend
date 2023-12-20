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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function EditProfilScreen() {
//HOOK DETAT
  const [ modifCoordonne, setModifCoordonne ] = useState(false);
  const [ modifEmailPw, setModifEmailPw ] = useState(false);
  const [ newRue, setNewRue ] = useState("");
  const [ newVille, setNewVille ] = useState("");
  const [ newCodePostal, setNewCodePostal ] = useState("");
  const [ newTel, setNewTel ] = useState("");
  const [ newEmail, setNewEmail ] = useState("");
  const [ newPw, setNewPw ] = useState("");
  const [ forgetPw, setForgetPw] = useState(false);
  const [ showPreferences, setShowPreferences ] = useState(false);
  const [ userPreferences, setUserPreferences] = useState([]);
  const [ removeRegisterPreference, setRemoveRegisterPreference ] = useState([]);
  const [ newPreferences, setNewPreferences] = useState([]);
  const [ isFocus, setIsFocus] = useState(false);
  const [ scrollOffset, setScrollOffset] = useState(40);
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const vercelURL = 'https://chefs-backend-amber.vercel.app';

  const user = useSelector((state) => state.user.value);
  const typeCuisine = useSelector((state) => state.typeCuisine.value);
  //console.log(userPreferences);

//POUR RECUPERER LES INFOS DUN USER ET METTRE CES PREFERENCES DANS USERPREFERENCE
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`${vercelURL}/users/profil/${user.id}`);
      const data = await response.json();
      if (data.result) {
        setUserPreferences([]);
        setUserPreferences(data.data.userPreference);
      } else {
        console.error('Erreur lors du chargement des préférences utilisateur:', data.message);
      }
    } catch (error) {
      console.error('Erreur fetchUserPreferences:', error);
    }
  };

  useEffect(() => {
    if (showPreferences) {
      fetchUserPreferences();
    }
  }, [showPreferences, user.id]);
 

//METTRE A JOUR LES PREFERENCES USER
//FONCTION DE BASE
const updatePreferences = async (preferences, endpoint, key, successMessage) => {
  if (preferences.length > 0) {
    try {
      for (const preference of preferences) {
        //console.log(preference);
        const response = await fetch(`${vercelURL}/users/profil/${endpoint}/${user.id}`, {
          //const response = await fetch(`http://192.168.1.106:3000/users/profil/${endpoint}/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userPreference: preference[key] })
        });
        const data = await response.json();
        // console.log(data);
        if (data.result) {
          console.log(successMessage);
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.error(`Erreur fetchUpdateUserPreferences (${endpoint}):`, error);
    }
  }
};
//FONCTION UTILISE EN FONCTION DES CRITERE: une pour supprimer les pref de la BDD, l'autre pour ajouter des nouvelles
const fetchUpdateUserPreferences = async () => {
  await updatePreferences(removeRegisterPreference, 'remove-preference', '_id', 'Préférences retirées de la BDD');
  await updatePreferences(newPreferences, 'add-preference', 'value', 'Nouvelles préférences ajoutées');
};
  
//Bouton valider mes changements de préférences
const validerChangementPref = () => {
  fetchUpdateUserPreferences();
  setNewPreferences([]);
  setShowPreferences(!showPreferences);
  setScrollOffset(showPreferences ? 40 : -100);
}
  
//Changer de numéro 
  const changeTel = () => {
    const newValueTel = newTel ? newTel: user.tel ;
    //const pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const TEL_REGEX = /^0[0-9]{9}$/;
    if (newValueTel !== null && TEL_REGEX.test(newValueTel)) {
      setModifCoordonne(!modifCoordonne);
      if(user) {
        fetch(`${vercelURL}/users/profil/${user.id}/update-tel`, {
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
                id : user.id,
                email : user.email,
                token : user.token,
                userProfile : {
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
                  orders: user.userProfile.orders,
                  userPreference: user.userProfile.userPreference,
                  wishList: user.userProfile.wishList,
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
      fetch(`${vercelURL}/users/profil/${user.userProfile.id}/update-adresse`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newAdresse),
      })
        .then(res => res.json())
        .then(data => {
          //console.log(data);
          if(data.result) {
            const userInfo = {
              id : user.id,
              email : user.email,
              token : user.token,
              userProfile : {
                nom : user.userProfile.nom,
                prenom : user.userProfile.prenom,
                dateOfBirth : user.userProfile.dateOfBirth,
                adresse : newAdresse, 
                tel : newValueTel,
                chef : user.userProfile.chef,
                orders: user.userProfile.orders,
                userPreference: user.userProfile.userPreference,
                wishList: user.userProfile.wishList,
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
        fetch(`${vercelURL}/users/${user.token}/update-email`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({newEmail: newValueEmail}),
        })
          .then(res => res.json())
          .then(data => {
            //console.log(data);
            if(data.result) {
              const userInfo = {
                id : user.id,
                email : newValueEmail,
                token : user.token,
                userProfile : {
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
                  orders: user.userProfile.orders,
                  userPreference: user.userProfile.userPreference,
                  wishList: user.userProfile.wishList,
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
        fetch(`${vercelURL}/users/${user.token}/update-password`, {
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

//TOUTES LES PREFERENCES
  //TRIS PAR ORDRE ALPHABETIQUE
  const newlisteType = [... typeCuisine] 
  newlisteType.sort((a, b) => {
    const cuisineA = a.cuisine.toUpperCase(); // ignore la casse
    const cuisineB = b.cuisine.toUpperCase(); // ignore la casse
    if (cuisineA < cuisineB) {
      return -1;
    }
    if (cuisineA > cuisineB) {
      return 1;
    }
    return 0;
  });
  const dataTypeCuisine = newlisteType.map((cuisine) => (
    {label: cuisine.cuisine, value : cuisine.id}
  ));

//UPDATE PREFERENCE DANS LA BDD
const updatePreferenceBDD = (pref) => {
  setRemoveRegisterPreference([...removeRegisterPreference, pref]);
  setUserPreferences(userPreferences.filter(e => e.typeCuisine !== pref.typeCuisine));
}

//USER PREFERENCES
  const myPreferences = userPreferences.length > 0 ? userPreferences.map((pref, i) => {
  return <View key={i}>
          <TouchableOpacity style={styles.btnType} onPress={()=> updatePreferenceBDD(pref)}>
            <Text style={styles.textBtnType}>{pref.typeCuisine}</Text>
          </TouchableOpacity></View> }) : null;

//PREFERENCES AJOUTE
const addPreferences = newPreferences.length > 0 ? newPreferences.map((pref, i) => {
  return <View key={i}>
          <TouchableOpacity style={styles.btnType} onPress={()=> setNewPreferences(newPreferences.filter(e => e.value !== pref.value))}>
            <Text style={styles.textBtnType}>{pref.label}</Text>
          </TouchableOpacity></View> }) : null;
       
const choixPreference = userPreferences ?
  <View> 
    <Text style={styles.txt_h2}>Mes préférences:</Text>
    <View style={styles.typeSelected}>{myPreferences}{addPreferences}</View>
    <Text style={styles.txt_h2}>Toutes les préférences:</Text>
    <View style={{width: '100%', marginBottom: 10}}> 
                  <View style={styles.dropdownLine}> 
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      //iconStyle={styles.iconStyle}
                      data={dataTypeCuisine}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Catégorie' : '...'}
                      searchPlaceholder="Search..."
                      value={newPreferences}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setNewPreferences([ ...newPreferences, item]);
                          setIsFocus(false);
                      }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name='arrowright'
                        size={18}
                      />
                    )}
                  />
          </View>
        </View>
  </View> : null ;

//INFOS DU USER: AFFICHER CES INFOS EN LE RECUPERANT DANS LE REDUCER
  const afficherLesInfos = user ? (
      <>
          <View style={{...styles.topPage, marginBottom: -30, marginTop: scrollOffset}}> 
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Setting' )}>
              <Text style={styles.btnTextBack}>←</Text>
            </TouchableOpacity>
            <Text style={styles.txt_h1}>Profil</Text>
          </View>
        <View style={{...styles.blocProfil,}}> 
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
           
{/*PARTIE PREFERENCES */}           
            { showPreferences?  
                <> 
                <View> 
                  <TouchableOpacity activeOpacity={1} style={{...styles.btn_sign_up, flexDirection: 'row', justifyContent: 'space-around'}} onPress={()=> validerChangementPref()} >
                    <Text style={styles.buttonText_sign_up}>Valider mes changements</Text><FontAwesomeIcon icon={faThumbsUp} style={{color: "#5959f0",}} />
                  </TouchableOpacity>
                </View>{choixPreference}
                </> : 
              <View> 
                <TouchableOpacity activeOpacity={1} style={{...styles.btn_sign_up, flexDirection: 'row', justifyContent: 'space-around'}} onPress={()=> {setShowPreferences(!showPreferences), setScrollOffset(showPreferences ? 40 : -100);}} >
                  <FontAwesomeIcon icon={faGear} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>Gerer mes préférences culinaire</Text>
                </TouchableOpacity>
              </View>}
        
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
        <View style={{width: '100%'}}>
            <View > 
              <TouchableOpacity style={styles.backBtnAlone} onPress={()=> {setForgetPw(!forgetPw)}}>
                <Text style={styles.btnTextBack}>←</Text>
              </TouchableOpacity>
              <Text style={{...styles.txt_h1, marginBottom: 50}}>Mots de passe oublié?</Text>
            </View>
            <Text style={{fontSize: 18}}>Veuillez saisir le code envoyé sur le 06******** afin de pouvoir réinitialiser votre mots de passe</Text>
            <View style={{marginVertical: 30}}>
            <Text style={styles.inputText}>Code</Text>
            </View>
            <TouchableOpacity activeOpacity={1} style={{...styles.btn_sign_in, marginTop: 20}}>
              <Text style={styles.buttonText_sign_in}>Valider</Text>
            </TouchableOpacity>
        </View> :
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
              <View style={{width: '100%'}}> 
                <View> 
                  <TouchableOpacity style={styles.backBtnAlone} onPress={()=> setModifCoordonne(!modifCoordonne)}>
                    <Text style={styles.btnTextBack}>←</Text>
                  </TouchableOpacity>
                  <Text style={{...styles.txt_h1, paddingHorizontal: 60, marginBottom: 30}}>Modifier coordonnées</Text>
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
    //marginTop: 20,
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
  paddingRight: 100,
},
btnTextBack: {
  fontSize : 30,
  fontWeight: 'bold',
  color : '#9292FE'
},
//BOUTON TYPE DE CUISINE
btnType: {
  paddingVertical: 10, // 10 units of padding at the top and bottom
  paddingHorizontal: 10, // A
  borderRadius: 5,
  margin: 5,
  backgroundColor: '#9292FE',
},
photo_preferences :{
  width: 15,
  height: 15
},
textBtnType: {
  fontSize : 15,
  color : '#fff'
},
typeSelected: {
  flexDirection:'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
},
txt_h2 : {
  color: '#5959F0',
  fontSize: 20,
},
//DROPDOWNINPUT
placeholderStyle: {
  fontSize: 16,
},
selectedTextStyle: {
  fontSize: 16,
},
iconStyle: {
  width: 20,
  height: 20,
},
inputSearchStyle: {
  height: 30,
  fontSize: 16,
},
icon: {
  marginRight: 5,
  color: '#9292FE'
},
dropdown: {
  height: 40,
  width: '50%',
  borderColor: '#9292FE',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 8,
},
dropdownLine: {
  marginLeft: 10,
  marginTop: 5,
  marginRight: 50,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
});
