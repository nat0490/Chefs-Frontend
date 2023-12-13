import { createSlice } from '@reduxjs/toolkit';


interface UserState {
    value: {
      token: string | null;
      email: string | null;
      userProfile: string | null;
    };
};

const initialState: UserState = {
    value: { 
    token: null, 
    email: null,
    userProfile: null },
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.userProfile = action.payload.userProfile;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.userProfile = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
