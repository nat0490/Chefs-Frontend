import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: { 
      email: null,
      token: null,
      userProfile: {
        nom: null,
        prenom: null,
        dateOfBirth: null,
        adresse: {
          rue: null,
          ville: null,
          codePostal: null,
        },
        tel: null,
        chef: null,
        //orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'orders'}],
        //userPreference: [{type: mongoose.Schema.Types.ObjectId, ref: 'userPreference'}]
      }
}};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.email;
      userProfile : {
        state.value.userProfile.nom =action.payload.userProfile.nom ;
        state.value.userProfile.prenom = action.payload.userProfile.prenom ;
        state.value.userProfile.dateOfBirth = action.payload.userProfile.dateOfBirth ;
        adresse : {
          state.value.userProfile.adresse.rue = action.payload.userProfile.adresse.rue ;
          state.value.userProfile.adresse.ville = action.payload.userProfile.adresse.ville ;
          state.value.userProfile.adresse.codePostal = action.payload.userProfile.adresse.codePostal ;
        };
        state.value.userProfile.tel = action.payload.userProfile.tel ;
        state.value.userProfile.chef = action.payload.userProfile.chef  ;
        //orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'orders'}],
        //userPreference: [{type: mongoose.Schema.Types.ObjectId, ref: 'userPreference'}]
      }
    },
    logout: (state) => {
      state.value.email = null;
      state.value.token = null;
      userProfile : {
        state.value.userProfile.nom =null ;
        state.value.userProfile.prenom = null;
        state.value.userProfile.dateOfBirth = null ;
        adresse : {
          state.value.userProfile.adresse.rue = null ;
          state.value.userProfile.adresse.ville = null ;
          state.value.userProfile.adresse.codePostal = null ;
        };
        state.value.userProfile.tel = null ;
        state.value.userProfile.chef = null;
        //orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'orders'}],
        //userPreference: [{type: mongoose.Schema.Types.ObjectId, ref: 'userPreference'}]
      }
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

/*
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    value: {
      token: string | null;
      email: string | null;
      id: string | null;
    };
};

const initialState: UserState = {
    value: { 
    token: null, 
    email: null,
    id: null },
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.id = action.payload.id;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.id = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

*/