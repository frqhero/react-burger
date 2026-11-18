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
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
  selectors: {
    getSelectedIngredient: (state) => state.selectedIngredient,
  },
});

export const { selectIngredient, clearSelectedIngredient } =
  selectedIngredientSlice.actions;
export const { getSelectedIngredient } = selectedIngredientSlice.selectors;
