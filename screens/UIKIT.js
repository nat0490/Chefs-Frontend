import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, TouchableOpacity,Image } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View>
    {/* Pour le bloc mauves au dessus */}
      <View style={styles.nav_bar_color}></View>

      {/* La div qui permet d'avoir des pages de 80% a mettre sur toutes les pages*/}
        <View style={styles.container}>
          <View style={styles.container_box_width}>
                {/* Il faut ecrire tous sont code ici la couleur rouge seras a enlever*/}
          </View>
        </View>


  {/* Permet d'avoir un régulariter de 20 margin au top -> Il faut ajouter deux style si vous en avez*/}
    <View style={[styles.QuetuChoisisPourTonStyle, styles.marginTop]}></View>

    {/* Style Input */}
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput style={styles.input}/>
    </View>



    {/* Box Plats */}
    <TouchableOpacity activeOpacity={1} style={styles.box}>
        <Image source={require('../assets/chefNaima.jpg')} style={styles.photo} />
        <Text style={styles.margin_rigth}>Pizza</Text>
        <View style={styles.box_description }>
            <FontAwesome name='bowl-food' size={22}  /> 
            <Text >Italien</Text>
        </View>
    </TouchableOpacity>



        {/* Texte H1 Principale page*/}
    <Text style={styles.txt_h1}>Our trendy recipes</Text>

       {/*  Texte H2 Principale page
       (Partous ou il n'y as pas de h1 et qui est un titre regarder sur figma)
       */}
    <Text style={styles.txt_h2}>Our trendy recipes</Text>


     {/* Paragraphe regulard */}
    <Text style={styles.txt_p_regulard}>Our trendy recipes</Text>

    {/* Paragraphe bold */}
    <Text style={styles.txt_p_bold}>Our trendy recipes</Text>




        {/* Les btn  */}
        <TouchableOpacity activeOpacity={1} style={styles.btn_sign_in} >
            <Text style={styles.buttonText_sign_in}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up}>
            <Text style={styles.buttonText_sign_up}>Sign up</Text>
        </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  //-----------------Bar couleur mauve top------------------
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
    backgroundColor:'red',
    alignItems: 'center',
  },





      // ------------  Les input  ----------------

  input: {
    height: 40,
    width: '100%',
    borderColor: '#9292FE',
    borderRadius:10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputContainer : {
    width: '70%',
   backgroundColor :'red',
   }, 
  label: {
    fontSize: 14,
    color: "#615DEC"
  },


// ------------ Box Plats ----------------
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
    marginLeft : 5,
  },
  photo:{
    width : "100%",
    height: 100
  },
  margin_rigth:{ // C'est pour décoler légérement du bord
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
txt_h1_big : {
  color: '#5959F0',
  fontSize: 40,
  textAlign: 'center',
  marginTop : 20,
  textAlignVertical: 'center',
  textShadowColor: 'rgba(0, 0, 0, 0.25)',
  textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 4,
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontweight: 600,
  letterspacing: -1.5,
},


//  ------------ Size police ----------------

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
  }
});