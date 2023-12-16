import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput, 
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addId, removeId } from '../../reducers/chef';
//FONTAWESOME
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'

export default function EditProfilChef() {

  //comment afficher l'image cloudinary
  // <Image source={{uri: 'https://res.cloudinary.com/dawkemcl5/image/upload/v1702733195/burger_vhotlh.png'}} style={styles.photo_logo} />

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const reducerUser = useSelector((state) => state.user.value);
    const typeCuisine = useSelector((state) => state.typeCuisine.value);
   
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
    //Spécialisation = type de cuisine?
    const [ newSpe, setNewSpe] = useState("");
    const [ newExpe, setNewExpe] = useState("");
    const [ newPassion, setNewPassion] = useState("");
    const [ newService, setNewService ] = useState("");
//RECETTE 
  const [ showMyRecipe, setShowMyRecipe] = useState(false);





    
  
//AU CHARGEMENT DE LA PAGE: RECUPERE LES PROFIL CHEF SI IL Y EN A UN ET LE POUSSE DANS CHEFPROFIL
    useState(()=> {
        //console.log(reducerUser.userProfile.id);
        fetch(`https://chefs-backend-amber.vercel.app/users/chef/find/${reducerUser.userProfile.id}`)
            .then( res => res.json())
            .then(data => {
                if (data.result) {
                    console.log(data.data.recipes);
                    setChefRecipe(data.data.recipes);
                    setChefProfil(data.data);
                    dispatch(addId(data.data._id));
                } else {
                    console.log(data.message)
                }
            })
    },[])
        

//CREER UN CHEF => ENVOIE DANS LA BDD
    const addNewChef = () => {
        const newChef = {
            spécialisation: spe,
            experience: exp,
            passion: passion,
            services: service,
            userProfil: reducerUser.userProfile.id,
        }
        fetch(`https://chefs-backend-amber.vercel.app/users/chef/upgradeToChef/${reducerUser.userProfile.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newChef),
        })
            .then( res => res.json())
            .then(data => {
                if (data.result){
                    console.log(data);
//VERIFIER LE BON FONCTIONNEMENT DU REDUCER ID
                    dispatch(addId(data._id));
                    setChefProfil(newChef);
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
            <TouchableOpacity style={styles.backBtn} onPress={()=> setShowCreateChef(!showCreateChef)}>
                <Text style={styles.btnTextBack}>←</Text>
            </TouchableOpacity>
            <Text style={styles.txt_h1}>Crée ton profil de chef</Text>
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


//Voir mes recettes
    const newTime = (time) => {
      const date = new Date(time);
      const formattedTime = `${date.getHours()} H ${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
      return formattedTime
    };

    const myRecipe =  chefRecipe? 
    chefRecipe.map((recipe,i) => {
      return <View key={i} style={styles.oneRecipe}>
        <Image source={{uri: recipe.image}} style={styles.photoRecipe} />
        <View style={styles.textRecipe}> 
          <Text> {recipe.title} </Text>
          <Text> Temps de préparation: {newTime(recipe.time)} </Text>
          <Text> Prix: </Text>
          <Text> Minimum: {recipe.prix.minimum}€, Par personne sup: {recipe.prix.personneSup}€, Panier course par personne: {recipe.prix.panierCourseParPersonne}€  </Text>
          {/*<Text> Ustensils: {recipe.time} </Text> */}
          {/*<Text> Ingredients: {recipe.time} </Text> */}
          {/*<Text> Note: {recipe.time} </Text> */}
          {/*<Text> Feedback: {recipe.time} </Text> */}
         </View>
      </View>
    }) : null;

  
  const chefProfilExiste = chefProfil?
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
            { chefProfil.spécialisation? <View style={styles.infoChef}><Text>Spécialisation: </Text><Text style={styles.inputText}>{chefProfil.spécialisation}</Text></View> : ""}
            { chefProfil.experience? <View style={styles.infoChef}><Text>Expérience: </Text><Text style={styles.inputText}>{chefProfil.experience}</Text></View> : ""}
            { chefProfil.passion? <View style={styles.infoChef}><Text>Passion: </Text><Text style={styles.inputText}>{chefProfil.passion}</Text></View>: ""}
            { chefProfil.services? <View style={styles.infoChef}><Text>Service: </Text><Text style={styles.inputText}>{chefProfil.services}</Text></View>: ""}
            { chefProfil.userCompliment.lenght > 0 ? <View style={styles.infoChef}><Text>Mes compliments: </Text><Text style={styles.inputText}> {chefProfil.userCompliment}</Text></View>: ""}
            { chefProfil.recipes ? <View style={styles.infoChef}>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPresse={()=> setShowMyRecipe(!showMyRecipe)} >
                <FontAwesomeIcon icon={faBowlFood} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>Voir mes plats</Text><Text style={styles.buttonText_sign_up}>➔</Text>
            </TouchableOpacity></View> : "" }
            
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> navigation.navigate('AddNewRecipe')} >
                <FontAwesomeIcon icon={faBowlFood} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>Ajouter un nouveau plat</Text><Text style={styles.buttonText_sign_up}>➔</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up}  >
                <FontAwesomeIcon icon={faBowlFood} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>Modifier / Supprimer un plat</Text><Text style={styles.buttonText_sign_up}>➔</Text>
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
        { chefProfil ?
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
  btnTextBack: {
    fontSize : 30,
    fontWeight: '800',
    color : '#9292FE'
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
  txt_h1 : {
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
    marginTop: 10,
  },
  container_box_width:{
    margin: 0,
    padding: 0,
    width: "80%",
    flex:1,
    height: "100%",
    //display: 'flex',
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
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
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
  txt_h2 : {
    color: '#5959F0',
    fontSize: 20,
    textAlign: 'center',
},
//CES RECETTES
photoRecipe : {
  width: 100,
  height: 100,
  marginTop: 30,
  marginBottom : -5,
},
oneRecipe: {
  marginBottom: 10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
},
textRecipe: {
  marginLeft: 5,
}

  
});