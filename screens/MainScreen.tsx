import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers';
import React from 'react';

export default function MainScreen() {
  /*
    const navigation = useNavigation();

    const openDrawer = () => {
      //navigation.openDrawer();
      navigation.dispatch(DrawerActions.openDrawer());
    };
  <TouchableOpacity onPress={openDrawer}>
          <Text>Open Drawer</Text>
          <Text>MAIN SCREEN</Text>
        </TouchableOpacity>
  
*/

  return (
    <View style={styles.container}>
      
      <Text>MAIN SCREEN</Text>
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
});