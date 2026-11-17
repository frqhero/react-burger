import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsApi } from '../api/ingredientsApi.js';
import { selectedIngredientSlice } from './selectedIngredient/slice.js';

const rootReducer = combineSlices(ingredientsApi, selectedIngredientSlice);

export const configureStore = (initialState) => {
  return createStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      // Подключаем через middleware
      return getDefaultMiddleware().concat(ingredientsApi.middleware);
    },
  });
};
