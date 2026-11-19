import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

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
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (el) => el.uniqueId !== action.payload
      );
    },
    reorderIngredients: (state, action) => {
      const draggedIndex = state.ingredients.findIndex(
        (el) => el.uniqueId === action.payload.draggedId
      );
      const targetIndex = state.ingredients.findIndex(
        (el) => el.uniqueId === action.payload.targetId
      );
      const [draggedIngredient] = state.ingredients.splice(draggedIndex, 1);
      state.ingredients.splice(targetIndex, 0, draggedIngredient);
    },
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients,
  },
});

export const { addIngredient, removeIngredient, reorderIngredients } =
  burgerConstructorSlice.actions;
export const { getBun, getIngredients } = burgerConstructorSlice.selectors;

export const getConstructorCounts = createSelector(
  [getBun, getIngredients],
  (bun, ingredients) => {
    const counts = {};
    if (bun !== null) {
      counts[bun._id] = 2;
    }
    for (const ingredient of ingredients) {
      counts[ingredient._id] = (counts[ingredient._id] ?? 0) + 1;
    }
    return counts;
  }
);

export const getPrice = createSelector([getBun, getIngredients], (bun, ingredients) => {
  return [...(bun === null ? [] : [bun, bun]), ...ingredients].reduce(
    (accumulator, current) => {
      return accumulator + current.price;
    },
    0
  );
});
