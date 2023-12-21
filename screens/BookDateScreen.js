import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'; // Importation des composants de React Native nécessaires
import { Calendar } from 'react-native-calendars'; // Importation du composant de calendrier
import DateTimePicker from '@react-native-community/datetimepicker'; // Importation du sélecteur de date/heure
// import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addDate} from '../reducers/infoPourCommande';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


export default function BookDateScreen() {

  const infoPourCommande = useSelector((state) => state.infoPourCommande.value);
  console.log(infoPourCommande);
  // États pour gérer les données et l'interface
  const [chefAvailability, setChefAvailability] = useState([]); // Disponibilités du chef
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Date sélectionnée
  const [selectedTime, setSelectedTime] = useState(new Date()); // Heure sélectionnée
  const [showTimePicker, setShowTimePicker] = useState(false); // Affichage du sélecteur d'heure
  const [selectedReservation, setSelectedReservation] = useState(null); // Réservation sélectionnée
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
 // const chefId = useSelector((state) => state.infoPourCommande.value.chefId);

  // L'ID du chef (à remplacer par une récupération dynamique)
  const chefId = '657f1e697bd0e0c4c6054e71';

  // Fonction asynchrone pour récupérer les disponibilités du chef depuis l'API
  async function fetchChefAvailability() {
    try {
      const response = await fetch(`https://chefs-backend-amber.vercel.app/userChefAvailability/${chefId}`); // Requête pour obtenir les disponibilités du chef

      if (!response.ok) {
        throw new Error('Erreur de réseau ou serveur');
      }

      const data = await response.json(); // Récupération des données de la réponse

      if (Array.isArray(data)) {
        setChefAvailability(data); // Mise à jour des disponibilités du chef
      } else {
        console.error('Les données reçues ne sont pas un tableau :', data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des indisponibilités :', error);
    }
  }

  // Appel à fetchChefAvailability() une seule fois après le montage du composant
  useEffect(() => {
    fetchChefAvailability();
  }, []);

  // Création d'un objet pour marquer les dates de disponibilité du chef dans le calendrier
  const markedDates = chefAvailability.reduce((dates, indispo) => {
    const dateString = new Date(indispo.date).toISOString().split('T')[0]; // Formatage de la date pour marquage dans le calendrier
    return { ...dates, [dateString]: { marked: true, dotColor: 'red' } }; // Ajout de la date marquée à l'objet
  }, {});

  // Fonction pour réserver le chef
  const reserveChef = async () => {
    console.log('reserver');
    try {
      if (!chefAvailability.find((availability) => availability.date === selectedDate)) {
        const formattedDate = selectedDate; // Formatage de la date sélectionnée
        // Envoi d'une requête POST pour réserver le chef à la date et l'heure sélectionnées
        const response = await fetch(`https://chefs-backend-amber.vercel.app/userChefAvailability/${chefId}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: formattedDate,
            time: selectedTime.toISOString(), // Formatage de l'heure sélectionnée
            isAvailable: true,
          }),
        });

        const data = await response.json(); // Récupération de la réponse
        console.log('Réponse du serveur pour la réservation :', data); // Affichage de la réponse du serveur
        
        dispatch(addDate({date : formattedDate}))
        //setSelectedReservation(selectedDate); // Mise à jour de la réservation sélectionnée
        navigation.navigate('OrderDetails');
        //navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation du chef :', error);
    }
  };

  // Initialisation de la variable pour afficher les détails de réservation
  let reservationDetails = null;

  // Vérification et affichage des détails de réservation s'il y a une réservation sélectionnée
  if (selectedReservation) {
    const dateWithTime = new Date(selectedReservation + 'T' + selectedTime.toTimeString().split(' ')[0]); // Combinaison de la date et de l'heure sélectionnées
  
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
  
    const formattedDateTime = dateWithTime.toLocaleString('fr-FR', options); // Formatage de la date et de l'heure
  
    // Affichage des détails de réservation
    reservationDetails = (
      <View style={styles.container_reservationDetails}>
      <View style={styles.reservationDetails}>
        <Text style={styles.detailText}>Date réservée : {formattedDateTime}</Text>
      </View>
      </View>
    );
  } 
  

  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      <TouchableOpacity onPress={() => navigation.navigate('CheckProfile')} style={styles.backButton}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.containerCalendar}>
        <Calendar 
          markedDates={{
            ...markedDates,
            [selectedReservation]: { selected: true, selectedColor: 'purple' },
          }}
          onDayPress={(day) => {
            if (day && day.dateString) {
              if (!chefAvailability.find((availability) => availability.date === day.dateString)) {
                setSelectedDate(day.dateString);
                setSelectedReservation(day.dateString);
              }
            }
          }}
        />

        
         <View style={styles.container_btn_bottom}> 

               <TouchableOpacity
                activeOpacity={1}
                style={styles.btn_heure}
                onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.buttonText_heure}>Sélectionner l'heure</Text>
                </TouchableOpacity>

                <TouchableOpacity
                activeOpacity={1}
                style={styles.btn_Reservation}
                onPress={reserveChef} 
                >
                  <Text style={styles.buttonText_Reservation}>Réserver ce chef</Text>
                </TouchableOpacity>

                </View>

        {reservationDetails}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={(event, selected) => {
              if (event.type === 'set') {
                setShowTimePicker(false);
                if (selected) {
                  setSelectedTime(selected);
                }
              } else {
                setShowTimePicker(false);
              }
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  containerCalendar: {
    flex: 1,
    justifyContent: 'center',
  },
  nav_bar_color: {
    backgroundColor: '#9292FE',
    width: '100%',
    height: 65,
    
  },


 backButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '10%',
    
  },
  
 

  btn_heure: {
    
    backgroundColor: '#9292FE',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },

  buttonText_heure :  {
    fontSize : 15,
    color : '#fff'
  },

  container_btn_bottom: {
    marginTop: 14,
    flexDirection : 'column',
    justifyContent: 'center',
  },

  buttonText_Reservation :  {
    fontSize : 15,
    color : '#fff'
  },

  btn_Reservation: {
    backgroundColor: '#9292FE',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },

  reservationDetails:{
    backgroundColor: '#9292FE',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },

  detailText: {
    
    fontSize : 15,
    color : '#fff'
  },

  


});


