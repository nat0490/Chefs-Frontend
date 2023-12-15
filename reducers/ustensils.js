import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: []
};


export const ustensilsSlice = createSlice({
  name: 'ustensil',
  initialState,
  reducers: {
    addUstensilesV2: (state, action) => {
        state.value = action.payload
       
    },
    addUstensiles: (state, action) => {
        state.value = state.value.concat({
            nom : action.payload.nom,
            emoji : action.payload.emoji,
        })
    },
    removeUstensils: (state) => {
      state.value = []
    },
  },
});

export const { addUstensiles, removeUstensils, addUstensilesV2 } = ustensilsSlice.actions;
export default ustensilsSlice.reducer;
