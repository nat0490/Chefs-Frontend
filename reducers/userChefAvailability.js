import { createSlice } from '@reduxjs/toolkit';

// État initial pour la disponibilité de l'utilisateur chef
const initialState = {
  userChef: null, // ID ou détails de l'utilisateur chef
  availability: {
    date: null, // Date de disponibilité
    time: '', // Heure de disponibilité
    isAvailable: true, // Disponibilité
  },// Autres données relatives à l'utilisateur chef si nécessaire
};

// Création du slice pour gérer l'état de la disponibilité de l'utilisateur chef
export const availabilitySlice = createSlice({
  name: 'availability', // Nom du slice
  initialState, // État initial
  reducers: {
    // Action pour mettre à jour la disponibilité de l'utilisateur chef
    setUserChefAvailability: (state, action) => {
      state.userChef = action.payload.userChef; // Mise à jour des informations de l'utilisateur chef
      state.availability.date = action.payload.availability.date; // Mise à jour de la date de disponibilité
      state.availability.time = action.payload.availability.time; // Mise à jour de l'heure de disponibilité
      state.availability.isAvailable = action.payload.availability.isAvailable; // Mise à jour de la disponibilité
     
    },
   
  },
});

// Export des actions du slice
export const { setUserChefAvailability } = availabilitySlice.actions;

// Export du reducer du slice
export default availabilitySlice.reducer;
