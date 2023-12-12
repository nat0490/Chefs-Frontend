import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, TouchableOpacity,Image } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View>
        
        
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