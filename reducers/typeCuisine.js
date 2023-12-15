import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: []
};


export const typeCuisineSlice = createSlice({
  name: 'typeCuisine',
  initialState,
  reducers: {
    add: (state, action) => {
        state.value = state.value.concat({
            id : action.payload.id,
            cuisine : action.payload.typeCuisine,
        })
    },
    remove: (state) => {
      state.value = []
    },
  },
});

export const { add, remove } = typeCuisineSlice.actions;
export default typeCuisineSlice.reducer;
