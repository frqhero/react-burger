import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIngredient: null,
};

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    selectIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
  },
  selectors: {
    getSelectedIngredient: (state) => state.selectedIngredient,
  },
});

export const { selectIngredient } = selectedIngredientSlice.actions;
export const { getSelectedIngredient } = selectedIngredientSlice.selectors;
