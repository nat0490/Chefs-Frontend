import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container_box_width}>
      {/* Il faut ecrire tous sont code ici la couleur rouge seras a enlever*/}
      
      </View>
    </View>
  );
}
<StatusBar style="auto" />
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

  //-----------------Bar couleur mauve top------------------
  container_box_width:{
    width: "80%",
    flex:1,
    backgroundColor:'red',
    alignItems: 'center',
  },
      

});