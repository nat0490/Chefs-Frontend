import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { DrawerActions } from '@react-navigation/routers';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SettingScreen() {
  
    const navigation = useNavigation();

   
 


  return (
    <View style={styles.container}>
        <View style={styles.nav_bar_color}></View>
            <View style={styles.topPage}> 
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Main' )}>
                    <Text style={styles.buttonText_sign_up}>←</Text>
                </TouchableOpacity>
                <Text style={styles.txt_h1}>Setting</Text>
            </View>
      
        <View style={styles.container_box_width}>
            <Text style={styles.txt_h2}>Account</Text>

                <TouchableOpacity onPress={() => navigation.navigate('EditProfil' )}>
                  <Text><FontAwesome name="user" color="#9292FE" />EditProfil</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Securité</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Privé</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PastOrder' )}>
                    <Text>Commandes passées</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Terms & Policies</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Rapporter un problème</Text>
                </TouchableOpacity>

            <Text style={styles.txt_h2}>Actions</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PastOrder' )}>
                    <Text>Devenir un chef</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PastOrder' )}>
                    <Text>LOGOUT</Text>
                </TouchableOpacity>


        
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
    //justifyContent: 'center',
  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  container_box_width:{
    width: "80%",
    flex:1,
    alignItems: 'center',
  },
  txt_h1 : {
    color: '#5959F0',
    fontSize: 30,
},
btn_sign_up : {
    paddingVertical: 10, // 10 units of padding at the top and bottom
    paddingHorizontal: 25, // A
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
  },
  buttonText_sign_up: {
    fontSize : 30,
    fontWeight: 'bold',
    color : '#9292FE'
  },
  topPage: {
    width:"100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingRight: 150,
  },
  backBtn: {
    paddingBottom: 5, // 10 units of padding at the top and bottom
    paddingHorizontal: 15, // A
    borderRadius:50,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
  },
  txt_h2 : {
    color: '#5959F0',
    fontSize: 20,
    marginTop: 20,
},

});