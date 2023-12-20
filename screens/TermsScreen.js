import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import { CheckBox } from 'react-native-elements';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD

=======
>>>>>>> christof
export default function App() {

  const navigation = useNavigation();

  const [accepteConditions, setAccepteConditions] = useState(false);
<<<<<<< HEAD
  

  const handleSubmit = () => {
    navigation.navigate('HomeTabs', { screen: 'Main' });
=======
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Main')
>>>>>>> christof
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      
          <View style={styles.container_box_width}>
            {/* Fleche revenir sur la page précédente  */}
            <View style={styles.containeur_fleche}>
              <FontAwesome name='arrow-left' size={22}  />
            </View>
  
            {accepteConditions &&
            <View style={{flex: 1 , backgroundColor:'red', flexDirection:'column', justifyContent:'space-around' , alignItems:'center'}}>
                <View style={{width: "100%" , alignItems:'center'}}> 
                     <Image source={require('../assets/validationImage.png')} style={styles.photo} />
                </View>

                <View style={{alignItems:'center', marginTop: 20}}>
                    <Text style={styles.txt_h2}>Verification Réussie !</Text>
                    <Text style={styles.txt_p_regulard}>Tu as maintenant</Text> 
                    <Text style={styles.txt_p_regulard}>un accès </Text> 
                    <Text style={styles.txt_p_regulard}>total à notre app</Text>
                </View>
                <View>
                <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.marginBottom]}>
                  <Text style={{ color: 'white' }}>Confirmer</Text>
                </TouchableOpacity>
                </View>
            </View>
          }

{!accepteConditions && (
        <>
          {/* Box de navigation */}
          <View style={styles.containeur_navigation_view}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.detailContainer}>
                <View style={{ height: 5, width: '100%', backgroundColor: '#E9EBEE', marginBottom: 5 }}></View>
                <Text style={styles.txt_p_bold}>Detail</Text>
              </View>
              <View style={styles.detailContainer}>
                <View style={{ height: 5, width: '100%', backgroundColor: '#E9EBEE', marginBottom: 5 }}></View>
                <Text style={styles.txt_p_bold}>Preferences</Text>
              </View>
              <View style={styles.detailContainer}>
                <View style={{ height: 5, width: '100%', backgroundColor: '#9292FE', marginBottom: 5 }}></View>
                <Text style={styles.txt_p_bold}>Submit</Text>
              </View>
            </View>
<<<<<<< HEAD
            

              <Text style={styles.txt_h1_big}>Quelques termes and conditons </Text>
              <Text style={[styles.txt_h2, styles.marginTop]}>Nous respectons votre vie privée. Consultez notre politique de confidentialité pour comprendre comment nous collectons, utilisons et protégeons vos informations.</Text>


              <View style={{ margin : 40,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }}>
                <CheckBox
                  checked={accepteConditions}
                  onPress={() => setAccepteConditions(!accepteConditions)}
                />
              <Text >J'accepte les termes et conditions</Text>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.marginTop]}>
                      <Text style={{ color:'red'}}>Confirmer</Text>
            </TouchableOpacity>
=======
>>>>>>> christof
          </View>

          <Text style={styles.txt_h1_big}>Quelques termes and conditons </Text>
          <Text style={[styles.txt_h2, styles.marginTop]}>Nous respectons votre vie privée. Consultez notre politique de confidentialité pour comprendre comment nous collectons, utilisons et protégeons vos informations.</Text>

          <View style={{ margin: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <CheckBox
              checked={accepteConditions}
              onPress={() => setAccepteConditions(!accepteConditions)}
            />
            <Text>J'accepte les termes et conditions</Text>
          </View>

          <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.marginTop]}>
            <Text style={{ color: 'white' }}>Confirmer</Text>
          </TouchableOpacity>
        </>
      )}
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
  },

  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },


  //-----------------Pour la margin du Top------------------
  marginTop:{
    margin : 20,
  },

  //-----------------Styles de notre containeur box------------------
  container_box_width:{
    width: "80%",
    flex:1,

    alignItems: 'center',
  },
  
  containeur_fleche: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },

  
//------------ Navigation page details - preference - Submit -------------

     // Navigation View Styles
     containeur_navigation_view: {
      width: "100%",
      marginTop: 20,
      marginBottom: 20,
    },
  
  
    // Detail Container Styles
    detailContainer: {
      width: '32%',
      alignItems: 'center',
    },
  
    // Text Styles
    txt_p_bold: {
      color: '#615DEC',
      fontSize: 16,
      //fontWeight: 600,
    },
//------------ Police size -------------
    txt_h1_big : {
      color: '#5959F0',
      fontSize: 40,
      textAlign: 'center',
      marginTop : 20,
      textAlignVertical: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,
      //fontFamily: 'Inter',
      fontStyle: 'normal',
      //fontWeight: 600,
      //letterspacing: -1.5,
  },
  txt_p_regulard: {
    color: '#5959F0',
    fontSize: 12,
    textAlign: 'center', // Pour centrer horizontalement
    textAlignVertical: 'center', // Pour centrer verticalement si plusieurs lignes
},
txt_h2 : {
  color: '#5959F0',
  fontSize: 20,
  marginTop: 40,
  textAlign: 'center', // Pour centrer horizontalement
  textAlignVertical: 'center', // Pour centrer verticalement si plusieurs lignes
},


// ----------- Btn ---------------

button: {
  backgroundColor: '#9292FE',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  textAlign: 'center',
}, 
buttonText: {
  color: 'white',
  fontSize: 16,
  textAlign: 'center',
},
photo:{
  width : 250,
  height: 200
},

marginBottom: {
  marginBottom : 100,
},



// -------------- Police font ---------------

txt_h2 : {
  color: '#5959F0',
  fontSize: 20,
},
txt_p_regulard: {
  color: '#5959F0',
  fontSize: 12,
},


});