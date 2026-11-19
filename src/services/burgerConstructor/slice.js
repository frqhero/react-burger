import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const itsBun = action.payload.type === 'bun';
      if (itsBun) {
        state.bun = action.payload;
      } else {
        state.ingredients.push({
          ...action.payload,
          uniqueId: nanoid(),
        });
      }
    },
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients,
  },
});

export const { addIngredient } = burgerConstructorSlice.actions;
export const { getBun, getIngredients } = burgerConstructorSlice.selectors;
