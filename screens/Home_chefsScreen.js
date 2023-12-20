import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image , TouchableOpacity} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
export default function OrderScreen() {
  const route = useRoute();
  const chefId = route.params?.chefId;

  const [chefData , setChefData ] = useState(null)
  const [platsData , setPlatsData] = useState(null)
  const navigation = useNavigation();
  useEffect(() => {

    (async () => {
       try {
         const response = await fetch(`http://172.20.10.5:3000/users/chef/${chefId}`);
         const data = await response.json();
         if(data.result) {
          console.log(data)
           setChefData(data.data);
           setPlatsData(data.data.recipes)
         }
       } catch (error) {
         console.error("Erreur lors du traitement des données :", error);
       }
     })()
     }, []);

   
  const stars = [];
  for (let i = 0; i < 5; i++) {
    // let style = {};
    // if (i < props.voteAverage - 1) {
    //   style = { 'color': '#f1c40f' };
    // }
    stars.push(<FontAwesome key={i} name='star' size={8}/>);
  }

  const Note_user = [];
  for (let i = 0; i < 5; i++) {
    // let style = {};
    // if (i < props.voteAverage - 1) {
    //   style = { 'color': '#f1c40f' };
    // }
    Note_user.push(<FontAwesome key={i} name='star' size={10}/>);
  }


  if(!platsData) return <View><Text>Loading...</Text></View>
  const diplayPlats =  platsData.length > 0 ? platsData.slice( 0 , 3 ).map((data , i) => (
    <TouchableOpacity activeOpacity={1} style={styles.box}>
                  <Image source={require('../assets/chefNaima.jpg')} style={styles.photo_plats} />
                    <Text style={styles.margin_rigth}>{data.title}</Text>
                    <View style={styles.box_description }>
                      <Image source={require('../assets/img_plats_categories.png')} style={styles.photo_preferences} />
                      <Text style={styles.txt_preferences}>{data.type}</Text>
                    </View>
                    <View style={styles.box_description }>
                      {stars}
                  </View>
      </TouchableOpacity>
  )) : (
    <TouchableOpacity activeOpacity={1} style={styles.box}>
          <Text style={styles.margin_rigth}></Text>
          <View style={{height: 80}}>
            <Text style={styles.txt_preferences}>Le chef dois encore ajouter quelque plats</Text>
          </View>
          <View style={styles.box_description }>
            {stars}
        </View>
  </TouchableOpacity>
  )
  
  return (
      <View style={styles.container}>
            <View style={styles.nav_bar_color}></View>
        <View style={styles.container_box_width}>
             <Text style={[styles.txt_h2, styles.marginTop]}>{chefData.userProfil.nom}</Text>
             <Image source={require('../assets/chefNaima.jpg')} style={styles.photo} />
              
            <View style={styles.containeur_box}>
                {diplayPlats}
            </View>
            
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


              <View style={styles.section_btn_register}>
                <Text style={styles.titre_register}>Do we know each other yet ?</Text>
                <View style={styles.container_btn}>
                  <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in}  onPress={() => navigation.navigate('Sign_in')}>
                      <Text style={styles.buttonText_sign_in}>Sign in</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} onPress={() => navigation.navigate('Sign_up')}>
                      <Text style={styles.buttonText_sign_up}>Sign up</Text>
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius : 10,
    borderWidth: 2,
    borderColor: '#5959F0',
    justifyContent : 'space-between',
    flexDirection: 'column',
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
    width: 10,
    height: 10
  },
  txt_preferences : {
    fontSize: 8,
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

});