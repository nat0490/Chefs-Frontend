import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { DrawerActions } from '@react-navigation/routers';
import React from 'react';

export default function MainScreen() {
  
    const navigation = useNavigation();

   
 


  return (
    <View style={styles.container}>
      
      <Text>MAIN SCREEN</Text>
        <TouchableOpacity style={styles.btn_sign_up} onPress={() => navigation.navigate('Setting')}>
          <Text style={styles.buttonText_sign_up}>GO TO SETTING SCREEN</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});