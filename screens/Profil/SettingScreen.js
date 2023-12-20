import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { login, logout} from '../../reducers/user';
import { loginChef, logoutChef } from '../../reducers/chef';
import { removeUstensils} from '../../reducers/ustensils';
import { remove } from '../../reducers/typeCuisine';
//FONTAWESOME
//import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faUser, 
  faBell, 
  faCreditCard, 
  faShieldHalved,
  faLock, 
  faCircleQuestion,
  faFlag,
  faDiamond,
  faUtensils,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';


export default function SettingScreen() {
  
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const chefStatus = useSelector((state) => state.user.value.userProfile.chef);
    const userChef = useSelector((state) => state.chef.value);
    //console.log(userChef);
    //console.log(user.id);

    const [ chef, setChef ] = useState(false);
  

console.log(user)

  useEffect(()=> {
    setChef(chefStatus);
    //console.log(user);
  //CHARGER LE PROFIL CHEF SI IL EXISTE
  if (userChef.id === null){ 
    fetch(`https://chefs-backend-amber.vercel.app/users/chef/find/${user.id}`)
            .then( res => res.json())
            .then(data => {
                if (data.result) {
                  //console.log(data);
                    const infoChef = {
                      id: data.data._id,
                      spécialisation: data.data.spécialisation,
                      userCompliment: data.data.userCompliment,
                      experience: data.data.experience ,
                      passion: data.data.passion,
                      services: data.data.services,
                      userProfil: data.data.userProfil,
                      recipes: data.data.recipes
                    };
                    //console.log(infoChef);
                    dispatch(loginChef(infoChef));
                } else {
                    console.log(data.message)
                }
            })
            .catch(error => {
              console.error('Error fetching chef data:', error);
            });
}},[chefStatus, user.id]);

  const changeStatusChef = () => {
    console.log(user.id);
    fetch(`https://chefs-backend-amber.vercel.app/users/profil/${user.id}/update-chef`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(),
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        if (data.result) {
          const userInfo = {
            id: user.id,
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
              tel : user.userProfile.tel,
              chef : data.newStatus,
              orders: user.userProfile.orders,
              userPreference: user.userProfile.userPreference,
              }
            };
          //console.log(userInfo);
          dispatch(logout());
          dispatch(login(userInfo));
          //setModifEmailPw(!modifEmailPw);
          //setEmail("");
        }
      })
      .catch(error => {
        console.error('Error updating chef status:', error);
      });
  }

  const logoutApp = () => {
    console.log('déconnection! reducer vidé')
    dispatch(logoutChef());
    dispatch(logout());
    dispatch(removeUstensils());
    dispatch(remove());
    navigation.navigate('Home' );
  }

  return (
    <View style={styles.container}>
        <View style={styles.nav_bar_color}></View>
            <View style={styles.topPage}> 
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('HomeTabs', { screen: 'Main' })}>
                    <Text style={styles.btnTextBack}>←</Text>
                </TouchableOpacity>
                <Text style={styles.txt_h1}>Setting</Text>
            </View>
      
        <View style={styles.container_box_width}>
            <Text style={styles.txt_h2}>Account</Text>
              <View style={styles.bloc}> 
                <TouchableOpacity onPress={() => navigation.navigate('EditProfil' )}>
                  <Text style={styles.menuAccount}><FontAwesomeIcon icon={faUser} style={{color: "#5959f0",}} />  Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuAccount}><FontAwesomeIcon icon={faShieldHalved} style={{color: "#5959f0",}}/>  Securité</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuAccount}><FontAwesomeIcon icon={faBell} style={{color: "#5959f0",}} />  Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuAccount}> <FontAwesomeIcon icon={faLock} style={{color: "#5959f0",}} />  Privé</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PastOrder' )}>
                    <Text style={styles.menuAccount}><FontAwesomeIcon icon={faCreditCard} style={{color: "#5959f0",}} />  Commandes passées</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuAccount}> <FontAwesomeIcon icon={faCircleQuestion} style={{color: "#5959f0",}}/>  Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuAccount}><FontAwesomeIcon icon={faDiamond} style={{color: "#5959f0",}}/>  Terms & Policies</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuAccount}><FontAwesomeIcon icon={faFlag} style={{color: "#5959f0",}} />  Rapporter un problème</Text>
                </TouchableOpacity>
                </View>

            <Text style={styles.txt_h2}>Actions</Text>
              <View style={styles.bloc}>
                { chef ? 
                  <TouchableOpacity onPress={() => navigation.navigate('EditProfilChef')}>
                    <Text style={styles.menuAction}> <FontAwesomeIcon icon={faUtensils} style={{color: "#5959f0",}} />  Profil Chef</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={() => (changeStatusChef() ,navigation.navigate('EditProfilChef') )}>
                    <Text style={styles.menuAction}> <FontAwesomeIcon icon={faUtensils} style={{color: "#5959f0",}} />  Devenir un chef</Text>
                  </TouchableOpacity>
                  }
                
                  {/*
                  AJOUTER PLUS TARD LE LOGOUT ICI 
                dispatch(logout()) ;
                */}
                <TouchableOpacity>
                    <Text style={styles.menuAction} onPress={()=> logoutApp()}> <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#5959f0",}}/>  Se déconnecter</Text>
                </TouchableOpacity>
              </View>


        
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  container_box_width:{
    width: "80%",
    flex:1,
    alignItems: 'center',
  },
  txt_h1 : {
    color: '#5959F0',
    fontSize: 30,
},
btn_sign_up : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
  },
  btnTextBack: {
    fontSize : 30,
    fontWeight: 'bold',
    color : '#9292FE'
  },
  topPage: {
    width:"100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingRight: 100,
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
  txt_h2 : {
    color: '#5959F0',
    fontSize: 20,
    marginTop: 20,
},
bloc: {
  backgroundColor: "rgba(89,89,240, 0.2)",
  margin: 20,
  paddingVertical: 30,
  paddingHorizontal: 30,
  borderRadius: 10,
  width: "100%",
  justifyContent: 'space-between',
  
},
menuAccount: {
  color: '#9292FE',
  fontWeight: 'bold',
  fontSize: 18,
  marginVertical: 10,
  //alignItems: 'center',
},
menuAction: {
  color: '#9292FE',
  fontWeight: 'bold',
  fontSize: 20,
  marginVertical: 10,
}


});