import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from 'react-redux'; // Import des fonctions de react-redux

export default function BookDateScreen() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dispatch = useDispatch();

  const handleConfirm = (date) => {
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time.toLocaleTimeString());
    hideTimePicker();
  };

  const saveDateTimeToServer = async () => {
    try {
      const response = await fetch(`https://192.168.94.247:3000/userChefAvailability/${chefId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedDate,
          selectedTime,
        }),
      });

      const data = await response.json();
      console.log('Réponse du serveur :', data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi au serveur :', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.nav_bar_color}></View>
      <View style={styles.container_box_width}>
        <Text>Choisis ta date :</Text>
        <Button title="Sélectionner une date" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {selectedDate !== '' && (
          <View>
            <Text>Date sélectionnée : {selectedDate}</Text>
            <Button title="Sélectionner une heure" onPress={showTimePicker} />
          </View>
        )}
        {selectedTime !== '' && (
          <Text>Heure sélectionnée : {selectedTime}</Text>
        )}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
         <Button title="Je valide mon chef !" onPress={() => saveDateTimeToServer(chefId)} />

       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container_box_width: {
    width: '80%',
    flex: 1,
  },
  nav_bar_color: {
    backgroundColor: '#9292FE',
    width: '100%',
    height: 65,
  },
});
