import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image , TouchableOpacity} from 'react-native';
import React, { useEffect,useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function OrderScreen() {

  const navigation = useNavigation();
  // Utilisation de useRoute pour accéder aux paramètres de navigation
  const route = useRoute();
  const platId = route.params?.platId;
  const [platData , setPlatData] = useState(null)
  
  useEffect(() => {
    (async () => {
      try {
        // Fetch pour récupérer les données de la recette
        const recipeResponse = await fetch(`https://chefs-backend-amber.vercel.app/recipes/displayRecipes/${platId}`);
        const recipeData = await recipeResponse.json();
  
        if (recipeData.result) {
      
          setPlatData(recipeData.recipe);
        }
       
        
      } catch (error) {
        console.error("Erreur lors du traitement des données :", error);
      }
    })();
  }, []);
  

   
  
 
        //console.log(notes);
        //ETOILES DE NOTES
        const noteMoyenne = platData && platData.notes
  ? (platData.notes.reduce((a, b) => a + b, 0) / platData.notes.length).toFixed(2)
  : "";
         const stars = []
          for (let i = 0; i < 5; i++) {
            let style = {};
            console.log(noteMoyenne)
            if (i < noteMoyenne - 1) {
              style = '#f1c40f' 
             }else {
              style = '#B8B8B8'
            }
            stars.push(<FontAwesomeIcon key={i}  icon={faStar} name='star' color={style} size={10}/>);
          }
      

  const Note_user = [];
  for (let i = 0; i < 5; i++) {
    // let style = {};
    // if (i < props.voteAverage - 1) {
    //   style = { 'color': '#f1c40f' };
    // }
    Note_user.push(<FontAwesomeIcon key={i}  icon={faStar} name='star' size={10}/>);
  }



  if (!platData) return <View><Text>Loading...</Text></View>
  
  return (
      <View style={styles.container}>
            <View style={styles.nav_bar_color}></View>
        <View style={styles.container_box_width}>
        <Text style={[styles.txt_h2, styles.marginTop]}>{platData.title}</Text>
             <Image source={{ uri: platData.image }} style={styles.photo} /> 
              <View style={styles.container_description_recette}>
                <View style={{flexDirection : 'row', justifyContent: 'space-between' , width: '100%'}}>
                      <View style={styles.box_description }>
                         <Text>{platData.type}</Text>
                      </View>     
                      <View style={styles.box_description }>
                        <Text>Chef  {platData.userChef.userProfil.nom}</Text>
                      </View>
                </View>
                <View style={{flexDirection : 'row' , marginTop : 20}}>
                {stars}
            </View>
          </View>
          
              <View style={styles.container_commentaire}>
                <Text style={[styles.txt_h2, styles.marginTop]}>Nos retours</Text>
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
                            <Text>Jon</Text>
                          </View>
                          <View style={styles.item30}>
                            {/* Contenu de la troisième View */}
                            {Note_user}
                          </View>
                        </View>
                        <View style={styles.singleItem}>
                          {/* Contenu de la quatrième View */}
                          <Text>Mon plat préféré</Text>
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
                            <Text> RenaudDu77</Text>
                          </View>
                          <View style={styles.item30}>
                            {/* Contenu de la troisième View */}
                            {Note_user}
                          </View>
                        </View>
                        <View style={styles.singleItem}>
                          {/* Contenu de la quatrième View */}
                          <Text>Alors, je suis tombé sur mes fesses. Ce poulet crémeux est vraiment un délice !</Text>
                        </View>
                      </View>
                  </View>
                </View>
              </View>


              <View style={styles.section_btn_register}>
                <Text style={styles.titre_register}>On se connait déjà ?</Text>
                <View style={styles.container_btn}>
                  <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in}  onPress={() => navigation.navigate('Sign_in')}>
                      <Text style={styles.buttonText_sign_in}>Se connecter</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={() => navigation.navigate('Sign_up')}>
                      <Text style={styles.buttonText_sign_up}>S'inscrire</Text>
                  </TouchableOpacity>
                </View>
              </View>

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
  marginTop:{
    marginTop : 20,
  },
//----------- Font  ---------------
  txt_h2 : {
    color: '#5959F0',
    fontSize: 20,
    marginBottom : 20,
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


//-------------- BOX EN DESOUS DE LA PHOTO------------
box_description : {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
  marginLeft : 5,
},
photo_preferences :{
  width: 30,
  height: 30
},
container_description_recette: {
  width: "100%",
  padding: 20,

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
  marginTop: 30,
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

});