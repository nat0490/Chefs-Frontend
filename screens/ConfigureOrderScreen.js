import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function ConfigureOrderScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      <View style={styles.container_box_width}>
            {/* Il faut ecrire tous sont code ici la couleur rouge seras a enlever*/}
      </View>
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
});