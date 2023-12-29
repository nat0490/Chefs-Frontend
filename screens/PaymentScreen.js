import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; 
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function PaymentScreen() {
  const navigation = useNavigation();

  const infoPourCommande = useSelector((state) => state.infoPourCommande.value);
  console.log(infoPourCommande);

  const reserverChef = () => {
    console.log('Je réserve mon chef !');
    navigation.navigate('ConfigureOrder');
  }



//Test moyen de paiement
  const [selectedOption, setSelectedOption] = useState(null);

  const paymentOptions = [
    { id: 1, icon: 'credit-card', name: 'Carte de crédit' },
    { id: 2, icon: 'paypal', name: 'PayPal' },
    { id: 3, icon: 'google-wallet', name: 'Google Pay' },
    { id: 4, icon: 'apple', name: 'Apple Pay' },
    { id: 5, icon: 'ticket', name: 'Ticket Restaurant' },
   // { id: 6, icon: 'bitcoin', name: 'Bitcoin' },
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navBarColor}></View>
      <View style={styles.containerBoxWidth}>
        <View style={styles.box1}>

            <TouchableOpacity style={styles.backBtnAlone} onPress={()=> navigation.navigate('OrderDetails')}>
              <Text style={styles.btnTextBack}>←</Text>
            </TouchableOpacity>
            <View style={{width:'100%', alignItems: 'center'}}><Text style={styles.txt_h1}>Choisis ton moyen de paiement</Text></View>
          
        </View>

{/*METHOD DE PAIEMENT V2 */}
      <View> 
        {paymentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.paymentOption}
              onPress={() => handleOptionSelect(option.id)}
            >
              <FontAwesome
                name={option.icon}
                size={30}
                color={selectedOption === option.id ? 'purple' : '#5959F0'}
              />
              <Text style={styles.optionName}>{option.name}</Text>
              <View style={[styles.selectionIndicator, selectedOption === option.id && styles.selectedIndicator]}>
                {selectedOption === option.id && <View style={styles.selectedDot} />}
              </View>
            </TouchableOpacity>
          ))}
      </View>


        {/* Animer l'apparition des méthodes de paiement 
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
        </Animatable.View> */}

        <View style={styles.box3}>
          <Text style={styles.total}>Montant de la commande:  {infoPourCommande.price? infoPourCommande.price : 37.51} €</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={reserverChef}
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
    marginBottom: 40,
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
    marginVertical: 30,
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
    marginVertical: 30,
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
//Moyen de paiement V2
paymentOption: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
  paddingVertical: 10,
},
optionName: {
  marginLeft: 10,
  flex: 1,
  color: '#5959F0',
},
selectionIndicator: {
  marginLeft: 'auto',
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#5959F0',
  justifyContent: 'center',
  alignItems: 'center',
},
selectedIndicator: {
  backgroundColor: '#5959F0',
},
selectedDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: 'purple',
},
txt_h1 : {
  color: '#5959F0',
  fontSize: 30,
  textAlign: 'center',
},
//BACK BUTTON
backBtnAlone: {
  width: '15%',
  marginTop: 20,
  paddingBottom: 5, // 10 units of padding at the top and bottom
  paddingHorizontal: 15, // A
  borderRadius:50,
  borderWidth: 2,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
  marginBottom: 20,
},
btnTextBack: {
  fontSize : 30,
  fontWeight: 'bold',
  color : '#9292FE'
},
});
