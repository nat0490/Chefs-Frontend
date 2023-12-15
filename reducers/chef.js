import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: null
};


export const chefSlice = createSlice({
  name: 'chef',
  initialState,
  reducers: {
    addId: (state, action) => {
        state.value = action.payload
       
    },
    removeId: (state, action) => {
        state.value = null
    },
    removeUstensils: (state) => {
      state.value = []
    },
  },
});

export const { addId, removeId } = chefSlice.actions;
export default chefSlice.reducer;
