import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput, 
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginChef, logoutChef } from '../../reducers/chef';
//FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'

export default function EditProfilChef() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const vercelURL = 'https://chefs-backend-amber.vercel.app';
//REDUCER
    const user = useSelector((state) => state.user.value);
    const typeCuisine = useSelector((state) => state.typeCuisine.value);
    const userChef = useSelector((state) => state.chef.value);
    //console.log(userChef);
//HOOK DETAT   
    const [ chefProfil, setChefProfil] = useState(null);
    const [ chefRecipe, setChefRecipe] = useState([]);
//CREATION DE PROFIL
    const [ showCreateChef, setShowCreateChef] = useState(false);
    const [ spe, setSpe] = useState("");
    const [ exp, setExp] = useState("");
    const [ passion, setPassion] = useState("");
    const [ service, setService] = useState("");
//MISE A JOUR PROFIL
    const [ modifierProfil, setModifierProfil] = useState(false);
    const [ newSpe, setNewSpe] = useState("");
    const [ newExpe, setNewExpe] = useState("");
    const [ newPassion, setNewPassion] = useState("");
    const [ newService, setNewService ] = useState("");
//RECETTE 
  const [ showMyRecipe, setShowMyRecipe] = useState(false);


  useEffect(()=> {
    //console.log(user);
  //CHARGER LE PROFIL CHEF SI IL EXISTE
  if (userChef.id){ 
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
}},[]);

//CREER UN CHEF => ENVOIE DANS LA BDD
    const addNewChef = () => {
        const newChef = {
            spécialisation: spe,
            experience: exp,
            passion: passion,
            services: service,
            userProfil: user.id,
        }
        fetch(`https://chefs-backend-amber.vercel.app/users/chef/upgradeToChef/${user.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newChef),
        })
            .then( res => res.json())
            .then(data => {
                if (data.result){
                  const newCreateChef = {
                    id: data.newDoc._id,
                    spécialisation: data.newDoc.spécialisation,
                    userCompliment: data.newDoc.userCompliment,
                    experience: data.newDoc.experience,
                    passion: data.newDoc.passion,
                    services: data.newDoc.services,
                    userProfil: data.newDoc.userProfil,
                    recipes: data.newDoc.recipes
                  }
                    //console.log(data);
                    //console.log(newCreateChef);
                    dispatch(loginChef(newCreateChef))
                    setSpe('');
                    setExp('');
                    setPassion('');
                    setService('');
                    setShowCreateChef(!showCreateChef);
                } else {
                    console.log(data.error)
                }
            })
    };

//ARRIVE SUR LA PAGE SANS PROFIL CHEF
    const newChefProfil = !showCreateChef ?
//ACCEUIL CREATION DE PROFIL
    <> 
        <View> 
            <View style={styles.topPageSsTitre}> 
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Setting' )}>
                    <Text style={styles.btnTextBack}>←</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.center}> 
                <Text style={styles.txt_h1}>Pas encore de profil?</Text>
                <TouchableOpacity style={styles.btn_sign_in} onPress={() => setShowCreateChef(!showCreateChef)}>
                    <Text style={styles.buttonText_sign_in}>Viens renseigner tous ça!</Text>
                </TouchableOpacity>
            </View>
        </View> 
    </>
    :
//CREATION DE PROFIL
    <> 
        <View> 
            <TouchableOpacity style={styles.backBtnAlone} onPress={()=> setShowCreateChef(!showCreateChef)}>
                <Text style={styles.btnTextBack}>←</Text>
            </TouchableOpacity>
            <Text style={{...styles.txt_h1, marginBottom: 50}}>Crée ton profil de chef</Text>
        </View>
        <Text>Spécialisation:</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Vos spécialisations"
            onChangeText={(value) => setSpe(value)} 
            value={spe}/>
        <Text>Expérience:</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Parlez de vos expériences ..."
            onChangeText={(value) => setExp(value)} 
            value={exp}/>
        <Text>Passion:</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Décrivez vos passions ..."
            onChangeText={(value) => setPassion(value)} 
            value={passion}/>
        <Text>Services:</Text>
        <TextInput 
            style={styles.input} 
            placeholder="Quels services proposez-vous ?"
            onChangeText={(value) => setService(value)} 
            value={service}/>
        <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> addNewChef()} >
            <Text style={styles.buttonText_sign_in}>Valider</Text>
        </TouchableOpacity>
    </>;

//SUPPRIMER UNE RECETTE
const removeRecipe = async (recipeId) => {
  //console.log('Remove recipe');
  try {
    const response = await fetch(`${vercelURL}/recipes/delete/${recipeId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chefId: userChef.id }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.result) {
      Alert.alert('Plat Supprimé!');
       //fetch(`http://192.168.1.106:3000/recipes/delete/${recipeId}`, {
      const userChefResponse = await fetch(`${vercelURL}/users/chef/find/${user.id}`);
      const userData = await userChefResponse.json();
      if (userData.result) {
        const infoChef = {
          id: userData.data._id,
          spécialisation: userData.data.spécialisation,
          userCompliment: userData.data.userCompliment,
          experience: userData.data.experience,
          passion: userData.data.passion,
          services: userData.data.services,
          userProfil: userData.data.userProfil,
          recipes: userData.data.recipes,
        };
        dispatch(logoutChef());
        dispatch(loginChef(infoChef));
      } else {
        console.log(userData.message);
      }
    } else {
      Alert.alert('Erreur lors de la suppression du plat');
    }
  } catch (error) {
    console.error('Error during removeRecipe:', error);
    Alert.alert('Erreur lors de la suppression du plat');
  }
};

//Voir mes recettes
 //console.log(userChef.recipes)
    const myRecipe =  userChef.recipes ? 
    userChef.recipes.map((recipe,i) => {
      return <View key={i} style={styles.oneRecipe}>
        <Image source={{uri: recipe.image}} style={styles.photoRecipe} />
        <View style={styles.textAndBtnContainer}> 
          <Text style={styles.txt_h2}> {recipe.title} </Text>
          <View style={styles.btnRecipe}> 
            <TouchableOpacity activeOpacity={1} style={styles.onebtnRecipe}  >
                <Text style={styles.buttonTextRecipe}>Voir / Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.onebtnRecipe} onPress={()=> removeRecipe(recipe._id)}  >
                <Text style={styles.buttonTextRecipe}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
    }) : null;

  
  const chefProfilExiste = userChef ?
     modifierProfil ? 
//AFFICHER POUR MODIFIER LE PROFIL
      <>
        <View style={styles.topPage}> 
          <TouchableOpacity style={styles.backBtn} onPress={() => setModifierProfil(!modifierProfil)}>
            <Text style={styles.btnTextBack}>←</Text>
          </TouchableOpacity>
          <Text style={styles.txt_h1}>Profil du chef</Text>
        </View>
        <Text style={styles.txt_h2}>Modification du profil</Text>
      </> 
              :  showMyRecipe ?
//AFFICHER MES RECETTE
      <>
            <View style={styles.topPage}> 
              <TouchableOpacity style={styles.backBtn} onPress={() => setShowMyRecipe(!showMyRecipe)}>
                <Text style={styles.btnTextBack}>←</Text>
              </TouchableOpacity>
              <Text style={styles.txt_h1}>Mes plats</Text>
            </View>
            <ScrollView>{myRecipe}</ScrollView>
      </>
    :
//AFFICHER LE PROFIL
          <>
            <View style={styles.topPage}> 
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Setting' )}>
                <Text style={styles.btnTextBack}>←</Text>
              </TouchableOpacity>
              <Text style={styles.txt_h1}>Profil du chef</Text>
            </View>
            <View style={styles.logoPosition}> 
            <Image source={require('../../assets/logo.png')} style={styles.photo_logo} />
            </View>
            { userChef.spécialisation? <View style={styles.infoChef}><Text>Spécialisation : </Text><Text style={styles.inputText}>{userChef.spécialisation}</Text></View> : ""}
            { userChef.experience? <View style={styles.infoChef}><Text>Expérience : </Text><Text style={styles.inputText}>{userChef.experience}</Text></View> : ""}
            { userChef.passion? <View style={styles.infoChef}><Text>Passion(s): </Text><Text style={styles.inputText}>{userChef.passion}</Text></View>: ""}
            { userChef.services? <View style={styles.infoChef}><Text>Service (en années) : </Text><Text style={styles.inputText}>{userChef.services}</Text></View>: ""}
            { userChef.userCompliment.lenght > 0 ? <View style={styles.infoChef}><Text>Mes compliments : </Text><Text style={styles.inputText}> {userChef.userCompliment}</Text></View>: ""}
            { userChef.recipes.length > 0 ? <View style={styles.infoChef}>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> setShowMyRecipe(!showMyRecipe)} >
                <FontAwesomeIcon icon={faBowlFood} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>Voir mes plats</Text><Text style={styles.buttonText_sign_up}>➔</Text>
            </TouchableOpacity></View> : "" }
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> navigation.navigate('AddNewRecipe')} >
                <FontAwesomeIcon icon={faBowlFood} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>Ajouter un nouveau plat</Text><Text style={styles.buttonText_sign_up}>➔</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} onPress={()=> setModifierProfil(!modifierProfil)} >
                <Text style={styles.buttonText_sign_in}>Modifier mon profil</Text>
            </TouchableOpacity>
          </>
      : "";

  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
        <View style={styles.container_box_width}>
        { userChef.userProfil ?
/*AFFICHE SI UN PROFIL CHEF EXISTE*/
      chefProfilExiste
    : 
/*PROFIL CHEF INEXISTANT*/     
       newChefProfil }
       <StatusBar style="auto" />
      </View>
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
  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  btn_sign_in : {
    paddingVertical: 10, 
    paddingHorizontal: 25, 
    borderRadius: 5,
    backgroundColor: '#9292FE',
    marginTop: 10,
  },
  buttonText_sign_in :  {
    fontSize : 15,
    color : '#fff',
    textAlign: 'center',
  },
  btnTextBack: {
    fontSize : 30,
    fontWeight: '800',
    color : '#9292FE'
  },
  backBtn: {
    paddingBottom: 5, 
    paddingHorizontal: 15, 
    borderRadius:50,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  txt_h1: {
    color: '#5959F0',
    fontSize: 30,
},
topPage: {
    width:"100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingRight: 100,
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
  },
  container_box_width:{
    margin: 0,
    padding: 0,
    width: "80%",
    flex:1,
    height: "100%",
  },
  topPageSsTitre: {
    width:"100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  center: {
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "50%",
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
  infoChef: {
    marginBottom: 20,
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
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText_sign_up: {
    fontSize : 15,
    color : '#9292FE',
    textAlign: 'center',
  },
  backBtnAlone: {
    width: '20%',
    marginTop: 20,
    paddingBottom: 5, 
    paddingHorizontal: 15, 
    borderRadius:50,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  txt_h2 : {
    color: '#5959F0',
    fontSize: 20,
    textAlign: 'center',
},
//CES RECETTES
photoRecipe : {
  width: 100,
  height: 100,
  marginTop: 20,
  marginBottom : -5,
},
oneRecipe: {
  marginBottom: 10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: '100%',
},
textAndBtnContainer: {
  justifyContent: 'space-between', 
  flex: 1, 
  marginLeft: 5,
},
btnRecipe: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around', 
  flexWrap: 'wrap',
  marginLeft: 10,
},
onebtnRecipe: {
  paddingVertical: 10, 
    paddingHorizontal: 10, 
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10
},
buttonTextRecipe: {
  fontSize : 15,
  color : '#9292FE',
  textAlign: 'center',
},
photo_logo: {
  width: 100,
  height: 100,
  marginTop: 30,
  marginBottom : -5,
},
logoPosition: {
  alignItems: 'center',
  marginBottom: 40,
  marginTop: -50,
}
});