import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image , TouchableOpacity, ScrollView} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood, faCircleUser, faFaceLaugh, faStar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



export default function ChefScreen(route) {
   
    const navigation = useNavigation();
    const chefId = route.route.params;
    //console.log(chefId);

    const [ chefProfil, setChefProfil ] = useState("");
    const [ chefRecipe, setChefRecipe ] = useState(null);

    //console.log(chefProfil);

//RECUPERER LES INFO DU CHEF + LES METTRES DANS LES HOOK
    const fetchInfoChef = async() => {
        try  {
            const response = await fetch(`https://chefs-backend-amber.vercel.app/users/chef/${chefId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
            });
            const data = await response.json();
            //console.log(data.data.recipes);
            if (data.result) {
                setChefProfil(data.data);
                setChefRecipe(data.data.recipes);
                console.log("Profil du chef chargé dans chefProfil + recette dans chefRecipe")
            } else {
                console.log('erreur lors du chargement du profil chef')
            }
        } catch (error) {
            console.log('Error fetching chef profil:', error);
        }
    };

    useEffect(()=> {
        fetchInfoChef();
    },[]);


  const Note_user = [];
  for (let i = 0; i < 5; i++) {
    // let style = {};
    // if (i < props.voteAverage - 1) {
    //   style = { 'color': '#f1c40f' };
    // }
    Note_user.push(<FontAwesome key={i} name='star' size={10} color='#B8B8B8'/>);
  }


  const boxDish = chefRecipe ? chefRecipe.map((dish, i) => {
    const noteMoyenne = dish.notes ?  (dish.notes.reduce((a,b)=> a +b, 0)/dish.notes.length).toFixed(1) : "";
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

    return (
      <View key={i} >
        <TouchableOpacity key={dish.id} activeOpacity={1} style={styles.box}>
        <Image source={{uri: dish.image}}  style={styles.photo_plats} />
            <Text style={styles.margin_rigth}>{dish.title}</Text>
            <View style={styles.box_description }>
            <Image source={require('../assets/img_plats_categories.png') } style={styles.photo_preferences} />
            <Text style={styles.txt_preferences}>  {dish.type}</Text>
            </View>
            <View style={styles.box_description }>
            {stars}
        </View>
        </TouchableOpacity>
      </View>
    );
  }) : null;


  

  return (
      <View style={styles.container}>
            <View style={styles.nav_bar_color}></View>
           
            
        <View style={styles.container_box_width}>
            
            <View style={{width:'100%', alignItems:'center'}}><Text style={styles.txt_h1}>Notre chef {chefProfil? chefProfil.userProfil.prenom : ""}</Text></View>

            <ScrollView > 

            <Image source={require('../assets/chefNaima.jpg')} style={styles.photo} />

                <View style={styles.boxMonHistoire}>
                  <View style={{width: '100%', alignItems:'center'}}> 
                    <Text style={styles.txt_h2}>Mon histoire</Text>
                  </View>
                  { chefProfil && chefProfil.spécialisation ?  <Text style={{marginBottom: 5}}><Text style={{fontWeight: 600}}>Ma spécialisation: </Text>{chefProfil.spécialisation}</Text> : null }
                  { chefProfil && chefProfil.experience ? <Text style={{marginBottom: 5}}><Text style={{fontWeight: 600}}>Mon experience: </Text>{chefProfil.experience}</Text> : null }
                  { chefProfil && chefProfil.passion ? <Text style={{marginBottom: 5}}><Text style={{fontWeight: 600}}>Ma/es passion(s): </Text>{chefProfil.passion}</Text> : null}
                  { chefProfil && chefProfil.services ?  <Text style={{marginBottom: 5}}><Text style={{fontWeight: 600}}>Mes services: </Text>{chefProfil.services}</Text> : null }
                </View>

                <View style={{width: '100%', alignItems:'center'}}> 
                    <Text style={styles.txt_h2}>Mes plats</Text>
                  </View>
                  <ScrollView horizontal> 
                <View style={styles.containeur_box}>
                 
                  
                 
                    {boxDish}
                    
                  
                </View>
                </ScrollView>
                


{/* A CHANGER QUAND IL Y AURA DES VRAIS FEEDBACK */}
                <View style={[styles.container_commentaire, {marginTop: 10}]}>
                    <Text style={styles.txt_h2}>Nos retours</Text>
                    <View style={{backgroundColor:'#9292FE47' , width: '100%'}}>
                        <View style={styles.container_box_commentaire}>
                            <View style={styles.commentaire}>
                                <View style={styles.rowContainer}>
                                    <View style={styles.item10}>
                            {/* Contenu de la première View */}
                                        <View style={styles.user_circle}></View>
                                </View>
                                <View style={styles.item60}>
                            {/* Contenu de la deuxième View */}
                                    <Text> UserName</Text>
                                </View>
                            <View style={styles.item30}>
                            {/* Contenu de la troisième View */}
                            {Note_user}
                            </View>
                        </View>
                        <View style={styles.singleItem}>
                          {/* Contenu de la quatrième View */}
                            <Text>zfef</Text>
                        </View>
                    </View>
                </View> 

                <View style={{alignItems:'center',width: "100%", height: 2, backgroundColor:'#9292FE47'}}>
                    <View style={{width: "80%", height: 2, backgroundColor:'#9292FE'}}></View>
                </View>
                <View style={styles.container_box_commentaire}>
                    <View style={styles.commentaire}>
                        <View style={styles.rowContainer}>
                          <View style={styles.item10}>
                            {/* Contenu de la première View */}
                            <View style={styles.user_circle}></View>
                          </View>
                          <View style={styles.item60}>
                            {/* Contenu de la deuxième View */}
                            <Text> UserName</Text>
                          </View>
                          <View style={styles.item30}>
                            {/* Contenu de la troisième View */}
                            {Note_user}
                          </View>
                        </View>
                        <View style={styles.singleItem}>
                          {/* Contenu de la quatrième View */}
                            <Text>zfef</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>

        </ScrollView>
             

        </View>
        
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

//----------- UiKit ---------------
  container_box_width:{
    width: "80%",
    flex:1,

  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  
  txt_h1 : {
    color: '#5959F0',
    fontSize: 26,
    marginBottom: 30,
    marginTop: 30,
    
  },
   //---------- Recette Box ----------------
   section_box: {
    width: "100%",
    marginTop: 20,
    alignItems :  'center',
  },
  photo_plats:{
    width : "100%",
    height: 100
  },
  containeur_box: {
      // height : 130,
      marginTop : 10,
      flexDirection: 'row',
      width: '100%',
      justifyContent : 'space-around',
      flexWrap: 'wrap',
  },
  box : {
    width : 100,
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius : 10,
    borderWidth: 2,
    borderColor: '#5959F0',
    justifyContent : 'space-between',
    flexDirection: 'column',
    marginBottom: 5,
    marginRight: 5,
  },
  box_description : {
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
    fontSize: 10,
  },
  container_description_recette: {
    width: "100%",
    padding: 20,
  
  },
 
//----------- Font  ---------------
  txt_h2 : {
    color: '#5959F0',
    fontSize: 20,
    marginBottom : 10, 
  },

photo: {
  width:"100%",
  height: 250,
  borderRadius: 20,
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
},


//-------------- BOX Commentaire------------
container_commentaire : {
  width: "100%",
  alignItems : 'center'
},
container_box_commentaire: {
  width: '100%',
  backgroundColor: '#9292FE47',
  padding:10,
},



// ---------- COMMENTAIRE ---------------

rowContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between', // Répartit l'espace disponible entre les items
  marginBottom: 10, // Ajustez la marge verticale selon vos besoins
},
item10: {
  flex: 0.1, // 10% de l'espace disponible
  marginRight: 10, // Ajustez la marge horizontale entre les items
  // Autres styles si nécessaire
},
item60: {
  flex: 0.6, // 60% de l'espace disponible
  marginRight: 10, // Ajustez la marge horizontale entre les items
  justifyContent:'center'
  // Autres styles si nécessaire
},
item30: {
  flex: 0.3, // 30% de l'espace disponible
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'flex-end'
  // Autres styles si nécessaire
},
singleItem: {
  // Styles pour la quatrième View si nécessaire
},

user_circle: {
  width: 24,
  height: 24,
  borderRadius: 24,
  backgroundColor: '#9292FE47'
},
commentaire: {
  backgroundColor:'#fff',
  padding: 10,
},



// --------- Btn Register ---------
section_btn_register: {
  width: '100%',
  marginTop: 20,
  alignItems: 'center',
},
container_btn: {
  marginTop: 10,
  width :"100%",
  flexDirection : 'row',
  justifyContent : 'space-around',
},

titre_register: {
  color: '#9292FE',
  fontSize: 15,
},
btn_sign_in : {
  paddingVertical: 10, // 10 units of padding at the top and bottom
  paddingHorizontal: 25, // A
  borderRadius: 5,
  backgroundColor: '#9292FE',
},
btn_sign_up : {
  paddingVertical: 10, // 10 units of padding at the top and bottom
  paddingHorizontal: 25, // A
  borderRadius: 5,
  borderWidth: 2,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
},
buttonText_sign_in :  {
  fontSize : 15,
  color : '#fff'
},
buttonText_sign_up: {
  fontSize : 15,
  color : '#9292FE'
},
//BOUTON RETOUR
backBtnAlone: {
    width: '15%',
    marginTop: 20,
    paddingBottom: 5, // 10 units of padding at the top and bottom
    paddingHorizontal: 15, // A
    borderRadius:50,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
    //marginRight: 100,
    //marginBottom: 5,
    marginLeft: 20,
  },
  btnTextBack: {
    fontSize : 30,
    fontWeight: 'bold',
    color : '#9292FE'
  },
  positionBackBtn: {
    width: '100%',
    //alignItems:'flex-start',
    marginLeft: -30,
  },
//HISTOIRE DU CHEF
boxMonHistoire: {
  backgroundColor: "rgba(89,89,240, 0.2)",
  marginTop: 10,
  paddingTop: 10,
  paddingBottom: 20,
  paddingHorizontal: 20,
  borderRadius: 10,
}

});