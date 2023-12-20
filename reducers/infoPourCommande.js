import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: {
      dishId: null,
      chefId: null,
      date: null
    }
};


export const infoPourCommandeSlice = createSlice({
  name: 'infoPourCommande',
  initialState,
  reducers: {
    addInfo: (state, action) => {
        state.value.dishId = action.payload.dishId;
        state.value.chefId = action.payload.chefId
    },
    addDate: (state, action) => {
      state.value.date = action.payload.date;
  },
    
    removeInfo: (state) => {
      state.value.dishId = null;
      state.value.chefId = null
    },
  },
});

export const { addInfo, removeInfo , addDate} = infoPourCommandeSlice.actions;
export default infoPourCommandeSlice.reducer;
