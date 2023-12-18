import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput, 
  KeyboardAvoidingView,
  Image 
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addUstensiles, addUstensilesV2, removeUstensils } from '../../reducers/ustensils';
import { loginChef, logoutChef } from '../../reducers/chef';
import ustensil from '../../reducers/ustensils';
//import CustomDropdown from './chemin/vers/CustomDropdown';
import ScrollPicker from "react-native-wheel-scrollview-picker";

import { useEffect } from 'react';


import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

//FONTAWESOME
//import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faBowlFood, faCircleUser } from '@fortawesome/free-solid-svg-icons'




export default function AddNewRecipeScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const typeCuisine = useSelector((state) => state.typeCuisine.value);
    const ustensilsReducer = useSelector((state) => state.ustensil.value);
    const userChef = useSelector((state) => state.chef.value);
    //console.log(userChef);
    //const chefId = useSelector((state) => state.chef.value);
    //console.log(ustensilsReducer);

    const [ title, setTitle] = useState("");
    const [ imageDish, setImageDish] = useState("");
    const [ selectedTime, setSelectedTime] = useState(new Date());
    const [ type, setType ] = useState(null);
    const [ isFocusT, setIsFocusT] = useState(false);
    const [ prixMini, setPrixMini] = useState("");
    const [ prixParPersonne, setPrixParPersonne] = useState("");
    const [ panierCourse, setPanierCourse ] = useState("");
    const [ ustensils, setUstensils] = useState(null);
    const [ isFocusU, setIsFocusU] = useState(false);
    const [ ustensilsList, setUstensilsList] = useState([]);
    const [ ingredientName, setIngredientName] = useState("");
    const [ ingredientQty, setIngredientQty] = useState("");
    const [ ingredientUnit, setIngredientUnit] = useState("");
    const [ recapIngredient, setRecapIngredient] = useState("");
  
    const [voirPickerTime, setVoirPickerTime] = useState(false);
    const [timeSelectedByUser, setTimeSelectedByUser] = useState(false);
    const [ recetteValide, setRecetteValide ] = useState(false);
    const [value, setValue] = useState(null);

  
    useEffect(() => {
      fetch(`https://chefs-backend-amber.vercel.app/users/chef/find/${user.id}`)
            .then( res => res.json())
            .then(data => {
                if (data.result) {
                  //console.log(data);
                    const infoChef = {
                      id: data.data._id,
                      spécialisation: data.data.spécialisation,
                      userCompliment: data.data.userCompliment,
                      experience: data.data.experience,
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
    },[recetteValide]);



//Recupère les ustensils de la BDD et les mets dans le reducer
    const fetchData = async () => {
        try {
            const response = await fetch(`https://chefs-backend-amber.vercel.app/ustensils/all`);
              if (!response.ok) {
                throw new Error(`Réponse du serveur non valide: ${response.status}`);
              }  
            const data = await response.json();
              //console.log(data.ustensils);
            dispatch(addUstensilesV2(data.ustensils));
              //data.ustensils.forEach((item) => {
                //dispatch(addUstensiles({ nom: item.nom, emoji: item.emoji }));
              //});
            } catch (error) {
              console.error('Erreur lors du chargement des données depuis la base de données', error);
            }
          };
    useEffect(()=> {
      fetchData();
    },[])
        
        

      
//TEMPS DE PREPARATION AVEC PICKER
const showTimePicker = () => {
    setVoirPickerTime(true);
  };
  const hideTimePicker = () => {
    setVoirPickerTime(false);
  };
  const handleTimeChange = (hours, minutes) => {
    const newTime = new Date();
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    setSelectedTime(newTime);
    setTimeSelectedByUser(true);
  };
  const formatTime = (time) => {
    if (time) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      return `${hours} H ${minutes.toString().padStart(2, '0')}`;
    }
    return '';
  };

  //Picker du temps de préparation
  const renderPickerTime = 
    <View style={styles.pickerContainer}>
      <Text>Temps de préparation: </Text>
          <ScrollPicker
            dataSource={Array.from({ length: 24 }, (_, i) => i)} // Heures de 0 à 23
            selectedIndex={timeSelectedByUser ? selectedTime.getHours() : 0}
            renderItem={(item, index) => <Text>{item}</Text>}
            onValueChange={(value) => handleTimeChange(value, selectedTime.getMinutes())}
            wrapperHeight={100}
            wrapperWidth={40}
            itemHeight={30}
            highlightColor={'#333'}
          />
          <Text style={styles.colon}>h :</Text>
          <ScrollPicker
            dataSource={Array.from({ length: 60 }, (_, i) => i)} // Minutes de 0 à 59
            selectedIndex={timeSelectedByUser ? selectedTime.getMinutes() : 0}
            renderItem={(item, index) => <Text>{item}</Text>}
            onValueChange={(value) => handleTimeChange(selectedTime.getHours(), value)}
            wrapperHeight={100}
            wrapperWidth={40}
            itemHeight={30}
            highlightColor={'#333'}
          />
          <Text style={styles.colon}> min</Text>
      </View>
  ;


//LISTE PREFERENCE
//Customiser le titre
  const titreMenuTypeCuisine = () => {
    if (value || isFocusT) {
      return (
        <Text style={[styles.label, isFocusT && { color: '#9292FE' , fontWeight: 'bold', fontSize: 20}]}>
          Type de cuisine:
        </Text>
      );
    }
    return null;
  };
//tris des type par ordre alphabétique
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
//console.log(newliste);
//dataPour le menu déroulant
  const dataTypeCuisine = newlisteType.map((cuisine) => (
     {label: cuisine.cuisine, value : cuisine.cuisine}
 ));



//LISTE USTENSILS
//Customiser le titre
const titreMenuUstensils = () => {
    if ( ustensils || isFocusU) {
      return (
        <Text style={[styles.label, isFocusU && { color: '#9292FE' , fontWeight: 'bold', fontSize: 20}]}>
          Ustensils:
        </Text>
      );
    }
    return null;
  };
//tris des type par ordre alphabétique
const newlisteUstensils = [... ustensilsReducer] 
newlisteUstensils.sort((a, b) => {
    const ustensilA = a.nom.toUpperCase(); // ignore la casse
    const ustensilB = b.nom.toUpperCase(); // ignore la casse
    if (ustensilA < ustensilB) {
      return -1;
    }
    if (ustensilA > ustensilB) {
      return 1;
    }
    return 0;
  });
//console.log(newliste);
//dataPour le menu déroulant
  const dataUstensils = newlisteUstensils.map((ustensil) => (
     {label: ustensil.nom, value : ustensil._id}
 ));
//quand un nom d'ustensils est selectionné, l'ajouter à la liste
 useEffect(() => {
    if (ustensils) {
        setUstensilsList([...ustensilsList,ustensils ]);
        setUstensils(null);
    }
 }, [ustensils])

 




//AFFICHER USTENSILS SELECTIONNE
//console.log(ustensilsList);
const afficheUstensils= ustensilsList.map( (oneUstensil, i) => {
  return <Text key={i} style={styles.ustensilName}> {oneUstensil.label} </Text>
})



//Envoyer les INFO A LA BDD
const creationRecette = () => {
  //console.log('creation de recette');
//Mettre ustensils aux bons format pour envoyer dans la BDD
  const allUstensils = [];
    ustensilsList.map(e => allUstensils.push(e.value));
//Mettre les ingrédients aux bon format pour envoyer dans la BDD
  const allIngredients = [];
  recapIngredient.map(e => allIngredients.push({name: e.nom, quantity: e.quantite, unit: e.unite}))
//Mettre en forme la recette
  const newDish = {
        userChef: userChef.id,
        title: title,
        image: imageDish,
        time: selectedTime,
        type: type,
        minimum: prixMini,
        personneSup: prixParPersonne,
        panierCourseParPersonne: panierCourse,
        ustensils:allUstensils,
        ingredients: allIngredients,
    }
    //console.log(userChef.id);
//Poster la recette

  fetch(`https://chefs-backend-amber.vercel.app/recipes/newrecipesV2/${userChef.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newDish),
  })
  .then(res => res.json())
  .then(data => {
    //console.log(data);
    if (data) {
      setTitle("");
      setImageDish("");
      setSelectedTime(new Date());
      setType("");
      setPrixMini("");
      setPrixParPersonne("");
      setPanierCourse(""); 
      setUstensilsList([]);  
      setIngredientName("");
      setIngredientQty("");
      setIngredientUnit("");
      setRecapIngredient(""); 
      setRecetteValide(!recetteValide); 
    } else {
      console.log('error');
    } 
  })
};


//INGREDIENTS
const ajouterIngredient = () => {
  if (ingredientName && ingredientQty && ingredientUnit) {
    const nouvelIngredient = {
      nom: ingredientName,
      quantite: ingredientQty,
      unite: ingredientUnit,
    };
    setRecapIngredient([...recapIngredient, nouvelIngredient]);
    setIngredientName('');
    setIngredientQty('');
    setIngredientUnit('');
  } else {
    alert("Veuillez remplir toutes les informations de l'ingrédient.");
  }
};







  return (
    <KeyboardAvoidingView style={styles.container} >
    <View style={styles.nav_bar_color}></View>
      <View style={styles.container_box_width}>

{ recetteValide ? 
//PAGE MESSAGE: AJOUT RECETTE OK!
          <View style={styles.msgPage}> 
              <Image source={require('../../assets/logo.png')} style={styles.photo_logo} />
              <View style={styles.msg}>
                <Text style={styles.txt_h1}>Ta recette a bien été ajouté!</Text>
                <Text style={styles.validationIcon}>  ✔  </Text>
              </View>
              <View> 
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> setRecetteValide(!recetteValide)} >
                  <FontAwesomeIcon icon={faBowlFood} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>    Ajouter une nouvelle recette    ➔</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> {navigation.navigate('EditProfilChef'), setRecetteValide(!recetteValide)}} >
                  <FontAwesomeIcon icon={faCircleUser} style={{color: "#5959f0",}} /><Text style={styles.buttonText_sign_up}>←    Retourner sur ton profil</Text>
                </TouchableOpacity>
              </View>
          </View>
    :
//AJOUTER UNE RECETTE
      <> 
        <View> 
        <View style={styles.topPage}> 
            <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate('EditProfilChef')}>
                <Text style={styles.btnTextBack}>←</Text>
            </TouchableOpacity>
            <Text style={styles.txt_h1}>Ajoute ta recette</Text>
            </View>
        </View>
{/*INPUT TITRE ET IMAGE */}
        <TextInput 
            style={styles.input} 
            placeholder="Titre"
            onChangeText={(value) => setTitle(value)} 
            value={title}/>
        <TextInput 
            style={styles.input} 
            placeholder="Source image"
            onChangeText={(value) => setImageDish(value)} 
            value={imageDish}/>

{/*INPUT TIME POUR LE TEMPS DE PREPARATION AVEC DATAPICKER */}
{  !voirPickerTime ? 
      <View style={styles.timeInput}>
        <Text>Temps de préparation: </Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={[styles.input_double, { marginLeft: 16 }]}>
          {timeSelectedByUser ? formatTime(selectedTime) : 'Sélectionnez le temps'}
          </Text>
        </TouchableOpacity>
      </View>
:
      <View style={styles.modalContainer}>
        {renderPickerTime}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={hideTimePicker}>
            <Text style={{ color: 'white' }}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { hideTimePicker() }}>
            <Text style={{ color: 'white' }}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
}
{/*SECTION TYPE DE CUISINE*/}
    <View >
        {titreMenuTypeCuisine()}
        <Dropdown
            style={[styles.dropdown, isFocusT && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            //iconStyle={styles.iconStyle}
            data={dataTypeCuisine}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusT ? 'Selectionnez un type de cuisine' : '...'}
            searchPlaceholder="Search..."
            value={type}
            onFocus={() => setIsFocusT(true)}
            onBlur={() => setIsFocusT(false)}
            onChange={item => {
                setType(item.value);
                setIsFocusT(false);
            }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusT ? 'blue' : 'black'}
              name='arrowright'
              size={18}
            />
          )}
        />
    </View>

{/*SECTION PRIX*/}
        <Text>Prix:</Text>
        <View style={styles.box}> 
        <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            placeholder="Prix minimum pour une prestation pour une personne"
            onChangeText={(value) => setPrixMini(value)} 
            value={prixMini}/>
        <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            placeholder="Prix par personne supplémentaire"
            onChangeText={(value) => setPrixParPersonne(value)} 
            value={prixParPersonne}/>
        <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            placeholder="Prix du panier course pour une personne"
            onChangeText={(value) => setPanierCourse(value)} 
            value={panierCourse}/>
        </View>

{/*SECTION USTENSIL */}
<View style={styles.listeUstensils}><Text>Selectionné: {afficheUstensils}</Text></View>
<View >
        {titreMenuUstensils()}
        <Dropdown
            style={[styles.dropdown, isFocusU && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            //iconStyle={styles.iconStyle}
            data={dataUstensils}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusU ? 'Selectionnez les ustensils' : '...'}
            searchPlaceholder="Search..."
            value={ustensils}
            onFocus={() => setIsFocusU(true)}
            onBlur={() => setIsFocusU(false)}
            onChange={item => {
                setUstensils({ value: item.value, label: item.label });
                setIsFocusU(false);
            }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusU ? 'blue' : 'black'}
              name='arrowright'
              size={18}
            />
          )}
        />
    </View>

{/*PARTIE INGREDIENT*/}
        <Text>Ingredients:</Text>
        <View style={styles.ingredientInput}> 
        <TextInput 
            style={[styles.input, styles.ingredientInputItem]} 
            placeholder="Nom"
            onChangeText={(value) => setIngredientName(value)} 
            value={ingredientName}/>
        <TextInput 
            style={[styles.input, styles.ingredientInputItem]} 
            keyboardType="numeric"
            placeholder="Quantité"
            onChangeText={(value) => setIngredientQty(value)} 
            value={ingredientQty}/>
          <TextInput 
            style={[styles.input, styles.ingredientInputItem]} 
            placeholder="Unit"
            onChangeText={(value) => setIngredientUnit(value)} 
            value={ingredientUnit}/>
        <TouchableOpacity style={styles.btn_sign_in} onPress={ajouterIngredient}>
            <Text style={styles.buttonText_sign_in}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      { recapIngredient ? recapIngredient.map((ingredient, index) => (
        <View key={index} style={styles.ingredientItem}>
          <Text>- {ingredient.nom}  </Text>
          <Text>{ingredient.quantite}  </Text>
          <Text>{ingredient.unite}  </Text>
        </View> 
      )) : "" }

        <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={()=> creationRecette()}>
            <Text style={styles.buttonText_sign_up}>Valider Ma recette </Text>
        </TouchableOpacity>

      </>
      }

        </View>
    </KeyboardAvoidingView> 
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
        fontWeight: 'bold',
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
      txt_h2 : {
        color: '#5959F0',
        fontSize: 20,
        textAlign: 'center',
    },
    //INPUT TIME
    input_double: {
      height: 40,
      width: '90%',
      borderColor: '#9292FE',
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    button: {
      backgroundColor: '#9292FE',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    colon: {
      fontSize: 20,
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    timeInput: {
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    
    box: {
        backgroundColor: "rgba(89,89,240, 0.2)",
        borderRadius: 10,
        marginBottom: 10,
    },
    ingredientInput: {
        display:'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    ingredientInputItem: {
        flex: 1, 
        marginHorizontal: 5, 
    },
    
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 5,
      
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
    width: '100%',
    borderColor: '#9292FE',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
listeUstensils: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
ustensilName: {
  fontWeight: 'bold',
    fontSize: 16,
    color: '#9292FE',
  },
  topPage: {
    width:"100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingRight: 100,
  },
//PAGE DE RECETTE VALIDE
  msgPage: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  photo_logo : {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom : -5,
  },
  msg: {
    alignItems: 'center',
  },
  validationIcon: {
    marginTop: 20,
    fontSize: 50,
    color: '#9292FE',
  }
          
});