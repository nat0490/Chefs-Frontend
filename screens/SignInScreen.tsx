import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Text, 
  View,
  KeyboardAvoidingView,
  TextInput,
 } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View> 
        <Text>Salut toi ! Prêt a passer a la casserole ?</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.contentContainer}> 
        <TextInput 
        style={styles.input} 
        placeholder= 'Email' 
        keyboardType='email-address'    
      />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});