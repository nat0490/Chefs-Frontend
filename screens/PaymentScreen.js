import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; 
import { useNavigation } from '@react-navigation/native';

export default function PaymentScreen() {
  const navigation = useNavigation();

  const reserverChef = () => {
    console.log('Je réserve mon chef !');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navBarColor}></View>
      <View style={styles.containerBoxWidth}>
        <View style={styles.box1}>
          <TouchableOpacity onPress={() => navigation.navigate('OrderDetails')}>
            <Feather name="chevron-left" size={24} color="black" style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.subHeading}>Select payment method</Text>
        </View>

        {/* Animer l'apparition des méthodes de paiement */}
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.box2}>
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={styles.paymentOption}>
              <Text>Google Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption}>
              <Text>Apple Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption}>
              <Text>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption}>
              <Text>Paypal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption}>
              <Text>Wallet Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption}>
              <Text>Coupons</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        <View style={styles.box3}>
          <Text style={styles.total}>Total €37.51</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => {reserverChef}}
          >
            <Text style={styles.reserveText}>Je réserve mon chef !</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomLinks}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBarColor: {
    backgroundColor: '#9292FE',
    width: '100%',
    height: 65,
  },
  containerBoxWidth: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  box1: {
    marginBottom: 60,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  box2: {
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  box3: {
    marginBottom: 20,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  backButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '10%',
    alignItems: 'center',
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 10,
  },
  paymentMethods: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 35,
    marginBottom: 10,
    width: '90%',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: '#9292FE',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  reserveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
