import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null, 
    eamil: null,
    id: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.profilId = action.payload.id;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.profilId = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
