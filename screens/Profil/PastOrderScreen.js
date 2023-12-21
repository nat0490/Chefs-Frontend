import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  KeyboardAvoidingView,
  TouchableOpacity,
  Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';


export default function PastOrderScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  const userOrders = useSelector((state) => state.user.value.userProfile.orders)

  const vercelURL = 'https://chefs-backend-amber.vercel.app';

  //console.log(userOrders)

  const [ userOrdersDetails, setUserOrdersDetails ] = useState([]);
  const fetchAllOrders = async () => {
    if (userOrders.length > 0) {
      try {
        const orderPromises = userOrders.map(async (order) => {
          const response = await fetch(`${vercelURL}/orders/details/${order}`);
          const data = await response.json();
          return data.result ? data.data : null;
        });
  //UTILISATION DE PROMISE.ALL CAR SINON SEULEMENT UNE COMMANDE SENVOYAIS DANS LE USERORDERSDETAILS
        const orders = await Promise.all(orderPromises);
        const uniqueOrders = orders.filter(order => order !== null && !userOrdersDetails.some(existingOrder => existingOrder.id === order.id));
        setUserOrdersDetails(prevOrders => [...prevOrders, ...uniqueOrders]);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  useEffect(()=> {
    fetchAllOrders();
  },[]) 

  //FORMATAGE DATE
  function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
    return formattedDate;
  }

  //RECUPERER LE NOM DU CHEF AVEC ID DU PLAT
  //PAS FAIT
  const chefName = (dishId) => {
    try {

    } catch (error) {
      console.error(error)
    }
  }


//AFFICHAGE DES COMMANDES
  const myOrder = userOrdersDetails.length > 0 ? 
  userOrdersDetails.map((order, i) => (
     <View key={i} style={styles.oneOrder}>
            <View style={styles.topBox}> 
              <View style={styles.textOrder}> 
                <Text>Date: {formatDate(order.date)}</Text>
                <Text>Recette: {order.recipes.title}</Text>
                {/*<Text>Chef: Robert</Text> */}
                <Text>Montant: {order.montant} €</Text>
                <Text>Status: {order.status}</Text>
              </View>
              <Image source={{uri: order.recipes.image}} style={styles.photo_plats} />
            </View>
            <View style={styles.btnContainer}> 
              <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} >
                <Text style={styles.buttonText_sign_up}>Recommander ce plat?</Text>
              </TouchableOpacity>
             {/* <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} >
                <Text style={styles.buttonText_sign_up}>Recommander ce chef?</Text>
  </TouchableOpacity> */}
            </View>
          </View>
  ))
    : null ;



  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
      <View style={styles.nav_bar_color}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View> 
          <TouchableOpacity style={styles.backBtnAlone} onPress={()=> navigation.navigate('Setting')}>
            <Text style={styles.btnTextBack}>←</Text>
          </TouchableOpacity>
          <Text style={styles.txt_h1}>Historique des commandes</Text>
        </View>
        <View style={styles.allOrder}> 
       
          {userOrdersDetails.length > 0? myOrder : <View> 
            <View style={styles.oneOrder}>
              <View style={styles.topBox}> 
                  <View style={styles.textOrder}> 
                    <Text>Date: 12/11/2023</Text>
                    <Text>Recette: Burger</Text>
                    {/*<Text>Chef: Robert</Text> */}
                    <Text>Montant: 50 €</Text>
                    <Text>Status: consommé</Text>
                  </View>
                  <Image source={{uri: 'https://res.cloudinary.com/dawkemcl5/image/upload/v1703169464/fausse_commande_1_fwxkes.png'}} style={styles.photo_plats} /> 
                </View>
                <View style={styles.btnContainer}> 
                  <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} >
                    <Text style={styles.buttonText_sign_up}>Recommander ce plat?</Text>
                  </TouchableOpacity>
              </View>
              </View>

              <View style={styles.oneOrder}>
              <View style={styles.topBox}> 
                  <View style={styles.textOrder}> 
                    <Text>Date: 05/12/2023</Text>
                    <Text>Recette: Couscous</Text>
                    {/*<Text>Chef: Robert</Text> */}
                    <Text>Montant: 80 €</Text>
                    <Text>Status: consommé</Text>
                  </View>
                  <Image source={{uri: 'https://res.cloudinary.com/dawkemcl5/image/upload/v1703169660/fausse_commande_2_ewogwh.png'}} style={styles.photo_plats} />
                </View>
                <View style={styles.btnContainer}> 
                  <TouchableOpacity activeOpacity={1} style={styles.btn_sign_up} >
                    <Text style={styles.buttonText_sign_up}>Recommander ce plat?</Text>
                  </TouchableOpacity>
              </View>
              </View>

            </View>}
              

        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: "100%",
  },
  nav_bar_color: {
    backgroundColor : '#9292FE',
    width: '100%',
    height: 65,
  },
  scrollViewContent: {
    flexGrow: 1,
    width:'100%',
  },
  topPage: {
    width:"100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingRight: 100,
  },
  btnTextBack: {
    fontSize : 30,
    fontWeight: 'bold',
    color : '#9292FE'
  },
  backBtnAlone: {
    width: '20%',
    marginTop: 20,
    paddingBottom: 5, 
    paddingHorizontal: 15, 
    borderRadius:50,
    borderWidth: 2,
    borderColor: '#9292FE',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  txt_h1 : {
    color: '#5959F0',
    fontSize: 30,
},
//Box de commande
oneOrder: {
  borderWidth: 1,
  borderColor: '#9292FE',
  borderRadius:10,
  paddingVertical: 10,
  margin: 15,
},
textOrder: {
  paddingLeft: 10,
  marginRight: 20,
},
allOrder: {
  marginTop: 20,
},
//BOUTON
btn_sign_up : {
  paddingVertical: 10, 
  paddingHorizontal: 10, 
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#9292FE',
  backgroundColor: '#fff',
  marginTop: 5,
},
buttonText_sign_up: {
  fontSize : 15,
  color : '#9292FE',
  textAlign: 'center',
},
btnContainer: {
  alignItems: 'center',
  marginRight: 10,
},
photo_plats:{
  width : "100%",
  height: 80,
  width: 80,
},
topBox: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 10,
}
});