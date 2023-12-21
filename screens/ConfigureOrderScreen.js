import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'
import { faStar, faPhone, faMessage } from '@fortawesome/free-solid-svg-icons';
export default function ConfigureOrderScreen() {

      const [platsData , setPlatsData] = useState()
  // const noteMoyenne = platData && platData.notes
  // ? (platData.notes.reduce((a, b) => a + b, 0) / platData.notes.length).toFixed(2)
  // : "";
         const stars = []
          for (let i = 0; i < 5; i++) {
            let style = {};
            // console.log(noteMoyenne)
            // if (i < noteMoyenne - 1) {
            //   style = '#f1c40f' 
            //  }else {
            //   style = '#B8B8B8'
            // }
            stars.push(<FontAwesomeIcon key={i}  icon={faStar} name='star' size={10}/>);
          }
          useEffect(() => {
            (async () => {
              try {
                const platId = '658016a2bded833448fc118a'
                const response = await fetch(`https://chefs-backend-amber.vercel.app/recipes/displayRecipes/${platId}`);
                const data = await response.json();
          
                if (data.result) {
                  setPlatsData(data.recipe);
                }
              } catch (error) {
                console.error("Erreur lors de la récupération des données de la recette :", error);
              }
            })();
          }, []);

  if(!platsData) return <View><Text>Loading...</Text></View>

  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      <View style={styles.container_box_width}>
            {/* Il faut ecrire tous sont code ici la couleur rouge seras a enlever*/}
            <View style={{width: "100%" , alignItems:'center', marginTop : 40 ,justifyContent:'space-around ', flexDirection: 'row'}}> 
                <View>
                   <Image source={require('../assets/configurateOrder.png')} style={styles.photo} />
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.txt_h2}>Merci pour votre </Text>
                    <Text style={styles.txt_h2}>commande</Text>
                </View>
            </View>

            <View style={{alignItems: 'center', marginTop : 40}}>
                <Text style={styles.txt_h1}>Votre chef.fe est </Text>
                <Text style={styles.txt_h1}>confirmé.e</Text>
            </View>



            <View style={{width: "100%" , alignItems:'center', marginTop : 40 ,justifyContent:'space-between', flexDirection: 'row' }}> 
              <View style={{alignItems: 'center' ,width: "45%" }}>
                <Image source={require('../assets/configurateOrder.png')} style={styles.photo} />
                <View style={{alignItems: 'center' , height: 70, backgroundColor :'#9292FE47', marginTop: 10 , justifyContent: 'center', borderRadius: 15 , width:"100%"}}>
                  <Text>Chef : {platsData.userChef.userProfil.nom}</Text>
                  <View style={[styles.box_description, {marginTop : 10}]}>
                    <FontAwesomeIcon icon={faBowlFood}/>
                      <Text>{platsData.type}</Text>
                    </View>
                  </View>
              </View>
              <View style={{alignItems: 'center', width: "45%"}}>
                <Image source={{ uri: platsData.image }} style={styles.photo} />
                <View style={{alignItems: 'center' , height: 70, backgroundColor :'#9292FE47', marginTop: 10 , justifyContent: 'center', borderRadius: 15 ,width:"100%"}}>

                  <View style={{alignItems:'center'}}>
                      <Text style={{fontSize: 12}}>{platsData.title}</Text>
                      <Text style={{fontSize: 8, marginTop : 10}}>Cuisson : 1h40</Text>      
                  </View>
                  <View style={{ flexDirection: 'row', marginTop : 10}}>
                
                       {stars}

                  </View>
                 
                </View>
              </View>
            </View>

            <TouchableOpacity style={{marginTop: 40, marginBottom : 40}}>
              <Text>Order details</Text>
            </TouchableOpacity>

            <View style={{width: "100%", }}>
                <Text>Votre cheffe</Text>
                <View style={{flexDirection: 'row' , marginTop: 20, }}>
                  <View style={[styles.subContainer, { flex: 0.2 ,justifyContent: 'center'}]}>
                  <Image source={require('../assets/chefNaima.jpg')} style={styles.photoMini} />
                  </View>
                  <View style={[styles.subContainer, { flex: 0.5 , justifyContent: 'center'}]}>
                    <Text>{platsData.userChef.userProfil.nom} {platsData.userChef.userProfil.prenom}</Text>
                  </View>
                  <View style={ { flex: 0.3 , flexDirection:'row' , alignItems:'center', justifyContent:'space-around'}}>
                    <FontAwesomeIcon icon={faPhone} />
                    <FontAwesomeIcon icon={faMessage} />
                  </View>
                </View>
            </View>

            <View style={{width: "100%", flexDirection:'row', justifyContent:'center', marginTop: 20}}>
              <View style={{justifyContent:'center'}}> 
                <FontAwesomeIcon icon={faMessage} />
              </View>
                  <View style={{flexDirection:'column', marginLeft: 20}}>
                    <Text>Chat with</Text>
                    <Text>Support</Text>
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
   //-----------------Bar couleur mauve top------------------
   nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  photo:{
    width : 100,
    height: 100
  },
  photoMini : {
    width : 50,
    height: 50,
    borderRadius: 50
  },
  //-----------------Styles de notre containeur box------------------
  container_box_width:{
    width: "80%",
    flex:1,
    alignItems: 'center',
  },
  box_description : {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft : 5,
  },
  //  ------------ Size police ----------------

txt_h1 : {
  color: '#5959F0',
  fontSize: 30,
},
txt_h2 : {
  color: '#5959F0',
  fontSize: 20,
},

txt_p_regulard: {
  color: 'black',
  fontSize: 12,
},

txt_p_bold : {
  color: 'black',
  fontSize: 12,
  fontWeight: 'bold',
},
});