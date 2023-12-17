import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: { 
    id: null,
    spécialisation: null,
    userCompliment: [],
    experience: null,
    passion: null,
    services: null,
    userProfil: null,
    recipes: []
    }
};


export const chefSlice = createSlice({
  name: 'chef',
  initialState,
  reducers: {
    /*
    addId: (state, action) => {
        state.value = action.payload
    },
    removeId: (state, action) => {
        state.value = null
    },
    removeUstensils: (state) => {
      state.value = []
    }, */
    loginChef: (state, action) => {
      state.value.id = action.payload.id;
      state.value.spécialisation = action.payload.spécialisation;
      state.value.userCompliment = action.payload.userCompliment;
      state.value.experience =action.payload.experience;
      state.value.passion =action.payload.passion;
      state.value.services = action.payload.services;
      state.value.userProfil = action.payload.userProfil;
      state.value.recipes = action.payload.recipes;
    },
    logoutChef: (state, action) => {
      state.value.id = null;
      state.value.spécialisation = null;
      state.value.userCompliment = [];
      state.value.experience = null;
      state.value.passion =null;
      state.value.services = null;
      state.value.userProfil = null;
      state.value.recipes = [];
    },
  },
});

//export const { addId, removeId } = chefSlice.actions;
export const { loginChef, logoutChef } = chefSlice.actions;
export default chefSlice.reducer;
