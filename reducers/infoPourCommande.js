import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: {
      dishId: null,
      chefId: null,
      date: null,
      price: null,
      addresse: null,
      comments: '',
      totalAmount: 0,
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
    addDate: (state, action) => {p
      state.value.date = action.payload.date;
  },
    },
    addPrice: (state, action) => {
      state.value.price = action.payload.price;
    },
    addAddress: (state, action) => {
      state.value.address = action.payload.address;
    },
    addComments: (state, action) => {
      state.value.comments = action.payload.comments;
    },
    addTotalAmount: (state, action) => {
      state.value.totalAmount = action.payload;
    },
    removeInfo: (state) => {
      state.value.dishId = null;
      state.value.chefId = null
    },
  },
);

export const { addInfo, removeInfo , addDate, addPrice, addAddress, addComments, addTotalAmount } = infoPourCommandeSlice.actions;
export default infoPourCommandeSlice.reducer;
