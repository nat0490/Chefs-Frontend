  import React, { useState, useEffect } from 'react';
  import { useFocusEffect } from '@react-navigation/native';
  import { 
    StyleSheet, 
    View, 
    TouchableOpacity, 
    Text, 
    ScrollView, 
    Image, 
    TextInput,
   } from 'react-native';
  import MapView, { Marker } from 'react-native-maps';
  import * as Location from 'expo-location';
  import { useNavigation } from '@react-navigation/native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faBowlFood, faCircleUser, faFaceLaugh, faStar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
  import { useSelector } from 'react-redux';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';



  const foodIcon = require('../assets/user.png');

  export default function MainScreen() {

    const navigation = useNavigation();
    const vercelURL = 'https://chefs-backend-amber.vercel.app';
  //REDUCER
    const typeCuisine = useSelector((state) => state.typeCuisine.value);
  //HOOK DETAT 
    const [location, setLocation] = useState(null);
    const [chefAddresses, setChefAddresses] = useState([]);
    const [ allRecipe, setAllRecipe ] = useState([]);
    const [ filtreCatégorie, setFiltreCatégorie ] = useState([]);
    //const [ filtreName, setFil]
    const [ nomPlat, setNomPlat] = useState("");
    const [ filtreApparent, setFiltreApparent ] = useState(false);
    const [ filtreNameApparent, setFiltreNameApparent ] = useState(false);
    const [ isFocus, setIsFocus] = useState(false);
    const [ scrollOffset, setScrollOffset] = useState(0);
    const [ randomValue, setRandomValue] = useState(Math.random())

  
  //CONSTANTE CHARGER LES ADRESSES
  const fetchChefAddresses = async () => {
    try {
      const response = await fetch(`${vercelURL}/users/chef/userchefs/addresses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      // Filtrer les adresses sans coordonnées
      const filteredAddresses = data.filter(address => address.coordinates.latitude && address.coordinates.longitude);
      setChefAddresses(filteredAddresses);
    } catch (error) {
      console.error('Error fetching chef addresses:', error);
    }
  };

  //RECUPERER TOUTES LES RECETTES
  const fetchAllRecipe = async () => {
    try {
      const response = await fetch(`${vercelURL}/recipes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      //console.log(data);
      if (data.result) {
        setAllRecipe(data.recipes);
        console.log("recettes chargées dans allRecipe")
      } else {
        console.log('error lors de la receptions des données')
      }
    } catch (error) {
      console.log('Error fetching All Recipe:', error);
    }
  }

  const voirLesDetails = (menu) => {
    navigation.navigate('Dish', menu);
  };



  //AU CHARGEMENT DE LA PAGE: DEMANDE DE POSITION, FETCHCHEFADRESSE, FETCHALLRECIPE
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error('Error in location request:', error);
      }
    })();
    fetchChefAddresses();
    fetchAllRecipe();
    setRandomValue(Math.random())
  }, []);

//PERMET DE METTRE A JOUR LES RECETTES QUAND ONT EST FOCUS SUR L'ECRAN (La page n'est pas systématiquement rechargé en arrivant dessus via navigation.navigate donc useEffect inactif)
  useFocusEffect(
    React.useCallback(() => {
      fetchAllRecipe();
    }, [])
  )


  //AFFICHAGE DES RECETTES :

  const recipes = allRecipe ? 
  allRecipe
    .sort(() => randomValue - 0.5) 
    .map((dish, i) => {
  //NOTE MOYENNE
  const noteMoyenne = dish.notes ?  (dish.notes.reduce((a,b)=> a +b, 0)/dish.notes.length).toFixed(2) : "";
  //ETOILES DE NOTES
  const stars = [];
    for (let i = 0; i < 5; i++) {
      let style = {};
      if (i < noteMoyenne - 1) {
        style = '#9292FE'
      } else {
        style = '#B8B8B8'
      }
      stars.push(<FontAwesomeIcon key={i} icon={faStar} name='star' size={12} color={style}/>);
    }
    return  <TouchableOpacity activeOpacity={1} style={styles.box} key={i} onPress={()=> voirLesDetails(dish)}>
              <Image source={{uri: dish.image}} style={styles.photo} />
              <Text style={styles.margin_rigth}>{dish.title}</Text>
              <View style={styles.box_description }>
              <Image source={require('../assets/img_plats_categories.png') } style={styles.photo_preferences} />
                <Text >  {dish.type}</Text>
              </View>
              <Text style={{marginBottom: 10, marginLeft: 20}}>{stars}</Text>
            </TouchableOpacity>
  }) : "";


  //AFFICHAGE DES RECETTE FILTRE PAR TYPE
  const recipesFilterByType = allRecipe ? 
  allRecipe
    .filter(recipe => filtreCatégorie.includes(recipe.type))
    .sort(() => randomValue - 0.5) 
    .map((dish, i) => {
  //NOTE MOYENNE
  const noteMoyenne = dish.notes ?  (dish.notes.reduce((a,b)=> a +b, 0)/dish.notes.length).toFixed(2) : "";
  //console.log(notes);
  //ETOILES DE NOTES
  const stars = [];
    for (let i = 0; i < 5; i++) {
      let style = {};
      if (i < noteMoyenne - 1) {
        style = '#9292FE'
      } else {
        style = '#B8B8B8'
      }
      stars.push(<FontAwesomeIcon key={i} icon={faStar} name='star' size={12} color={style}/>);
    }
    return  <TouchableOpacity activeOpacity={1} style={styles.box} key={i} onPress={()=> voirLesDetails(dish)}>
              <Image source={{uri: dish.image}} style={styles.photo} />
              <Text style={styles.margin_rigth}>{dish.title}</Text>
              <View style={styles.box_description }>
              <Image source={require('../assets/img_plats_categories.png') } style={styles.photo_preferences} />
                <Text >  {dish.type}</Text>
              </View>
              <Text style={{marginBottom: 10, marginLeft: 20}}>{stars}</Text>
            </TouchableOpacity>
  }) : "";

  //AFFICHAGE DES RECETTES PAR NOM
  const recipeFilterParNom = allRecipe && nomPlat !== "" ? 
  allRecipe
    .filter(recipe => recipe.title.toLowerCase().includes(nomPlat.toLowerCase()))
    .sort(() => randomValue - 0.5) 
    .map((dish, i) => {
      const noteMoyenne = dish.notes ?  (dish.notes.reduce((a,b)=> a +b, 0)/dish.notes.length).toFixed(2) : "";
      const stars = [];
        for (let i = 0; i < 5; i++) {
          let style = {};
          if (i < noteMoyenne - 1) {
            style = '#9292FE'
          } else {
            style = '#B8B8B8'
          }
          stars.push(<FontAwesomeIcon key={i} icon={faStar} name='star' size={12} color={style}/>);
        }
        //console.log(allRecipe.length);
        return  <TouchableOpacity activeOpacity={1} style={styles.box} key={i} onPress={()=> voirLesDetails(dish)}>
            <Image source={{uri: dish.image}} style={styles.photo} />
            <Text style={styles.margin_rigth}>{dish.title}</Text>
            <View style={styles.box_description }>
            <Image source={require('../assets/img_plats_categories.png') } style={styles.photo_preferences} />
              <Text >  {dish.type}</Text>
            </View>
            <Text style={{marginBottom: 10, marginLeft: 20}}>{stars}</Text>
          </TouchableOpacity>
      }) 
    : null


  //TYPE
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
  //console.log(newliste);
  //dataPour le menu déroulant
  const dataTypeCuisine = newlisteType.map((cuisine) => (
    {label: cuisine.cuisine, value : cuisine.cuisine}
  ));
  //AFFICHAGE DES FILTRES SELECTIONNE
  const allType = filtreCatégorie? filtreCatégorie.map((type, i) => {
    return <View key={i}>
      <TouchableOpacity style={styles.btnType} onPress={()=> setFiltreCatégorie(filtreCatégorie.filter(e => e !== type))}>
        <Text style={styles.textBtnType}>{type}</Text>
      </TouchableOpacity></View> 
  }) : null;


  return (
      <View style={styles.container}>
        <View style={styles.nav_bar_color}></View>
        
        {/*ACCES PAGE SETTING*/}
        <View style={styles.accesSetting}> 
          <TouchableOpacity onPress={()=> navigation.navigate('Setting')} style={styles.btnSettingAcces}>
              <FontAwesomeIcon icon={faCircleUser} style={{color: "#5959f0",}} size={50} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={{marginTop: scrollOffset}}> 
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location ? location.coords.latitude : 50.8503,
                longitude: location ? location.coords.longitude : 4.3517,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {chefAddresses.map((address, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: address.coordinates.latitude,
                    longitude: address.coordinates.longitude,
                  }}
                  title={`Chef ${index + 1}`}
                  description={address.address}
                />
              ))}
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Ma position"
                  description="Je suis ici"
                >
                  <Image source={foodIcon} style={{ width: 30, height: 30 }} />
                </Marker>
              )}
            </MapView>
          </View>



  {/*AFFICHAGE DES RECETTE*/}
        { allRecipe  ? 
        
        <>

  { filtreApparent ?
                <>
                <View style={styles.searchBar}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Rechercher un plat"
                    onChangeText={(value) => setNomPlat(value)} 
                    value={nomPlat}/>
                <TouchableOpacity activeOpacity={1} style={styles.btnSearch}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} color='#fff'/>
                </TouchableOpacity>
                </View> 



                { recipeFilterParNom && nomPlat !== "" ? 
                  <View style={{width: '100%', alignItems: 'flex-end'}}> 
                    <TouchableOpacity style={{...styles.btnType, marginRight: 22, marginBottom: 10}} onPress={()=> setNomPlat("")}>
                      <Text style={styles.textBtnType}>Effacer ma recherche</Text>
                    </TouchableOpacity> 
                  </View>
                  :

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
                      value={filtreCatégorie}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setFiltreCatégorie([ ...filtreCatégorie, item.value]);
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
                  <TouchableOpacity style={styles.btnType} onPress={()=> setFiltreCatégorie([])}>
                    <Text style={styles.textBtnType}>Effacer mes filtres</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.typeSelected}>{allType}</View>
                </View> }



                </>

          
          :
          <View style={styles.btnContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.Réserve} onPress={()=> {setFiltreApparent(!filtreApparent),  setScrollOffset(filtreApparent ? 0 : -150)}}>
              <Text style={styles.Réserve_maintenant}>Filtrer ma recherche</Text>
            </TouchableOpacity>   
          </View>
        
            
          }

          <View style={styles.container_box_width}>
          <View style={styles.containeur_box}>

          {/* filtreCatégorie.length > 0 ? recipesFilterByType : nomPlat !== "" ? recipeFilterParNom : recipes */}

          {filtreCatégorie.length > 0 ? (recipesFilterByType) : nomPlat !== "" ? (recipeFilterParNom && recipeFilterParNom.length > 0 ? 
          (recipeFilterParNom) : (
              <View>
                <Text style={{marginTop: 20}}>Pas de résultat pour votre recherche</Text>
              </View>
            )) : ( recipes && recipes.length > 0 ? (recipes) : (
                      <View>
                        <Text style={{marginTop: 20}}>Chargement en cours</Text>
                      </View>
                    )
                  )}

          
          </View>
          </View>
          <View style={styles.msgChargement}>
            <Text style={styles.txt_h1}>Qu'est-ce qu'on mange aujourd'hui? </Text>
            <FontAwesomeIcon icon={faFaceLaugh} size={50}/>

          </View>
        </> : 
        <View style={styles.msgChargement}>
          <Text style={styles.txt_h1}>Qu'est-ce qu'on mange aujourd'hui? </Text>
          <FontAwesomeIcon icon={faFaceLaugh} size={50}/>

        </View>
        } 
        </View>
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    nav_bar_color: {
      backgroundColor: '#9292FE',
      height: 50,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    mapContainer: {
      marginVertical: 0,
      alignItems: 'center',
    },
    map: {
      width: '100%',
      height: 500,
    },
    btnContainer: {
      marginVertical: 10,
      width: '50%',
      alignSelf: 'center',
    },
    Réserve: {
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 5,
      backgroundColor: '#9292FE',
      marginVertical: 10,
    },
    Réserve_maintenant: {
      fontSize: 15,
      color: '#fff',
    },
    container_box_width: {
      width: '80%',
      alignSelf: 'center', 
      flex: 1,
      alignItems: 'center', // Centre verticalement
      marginBottom: 20, 
      justifyContent : 'space-around',
    },
    photo:{
      width : "100%",
      height: 100
    },
    containeur_box: {
        flexDirection: 'row',
        width: '100%',
        justifyContent : 'space-around',
        flexWrap: 'wrap',
    },
    box : {
      width : 100,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius : 10,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: '#5959F0',
      justifyContent : 'space-between',
      flexDirection: 'column',
    },
    box_description : {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      marginLeft : 5,
    },
    margin_rigth:{
      marginLeft : 5,
    },
    photo_preferences :{
      width: 15,
      height: 15
    },
    txt_preferences : {
      fontSize: 8,
    },
  //A EFFACER QUAND LA NAVIGATION VERS SETTING PAGE SERA FAITE
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
  btnSettingAcces: {
    padding: 5,
    //backgroundColor: '#fff',
    },
  accesSetting: {
  maxWidth: '15%',
  position: 'absolute',
  zIndex: 5,
  borderRadius: 50,
  backgroundColor: '#fff',
  maxWidth: '100%',
  marginTop: 55,
  marginLeft: 5,
    },
  /////////////
  //Message en attendant que les plats s'affiche:
  msgChargement: {
    //justifyContent:'center',
    marginVertical: 20,
    alignItems: 'center',
    height: '30%'
  },
  txt_h1 : {
    color: '#5959F0',
    fontSize: 26,
    marginBottom: 30,
  },
  btnSearch : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    backgroundColor: '#9292FE',
    //marginTop: 10,
    height: '95%',
    width: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    //marginRight: 10,
  },
  searchBar: {
    flexDirection: 'row', 
    marginBottom: 10, 
    justifyContent:'space-between',
    alignItems: 'center', 
    width: '90%', 
    height: 50,
    //minHeight: '3%',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 5, // 10 units of padding at the top and bottom
    paddingHorizontal: 10,
    marginLeft: 22,
    borderWidth: 1,
    borderColor: '#9292FE',
    //backgroundColor: '#fff',
    marginTop: 10,
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
    marginLeft: 22,
    marginRight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  }

  });


