import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { burgerApi } from '../api/burgerApi.js';
import { burgerConstructorSlice } from './burgerConstructor/slice.js';
import { selectedIngredientSlice } from './selectedIngredient/slice.js';

const rootReducer = combineSlices(
  burgerApi,
  selectedIngredientSlice,
  burgerConstructorSlice
);

export const configureStore = (initialState) => {
  return createStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      // Подключаем через middleware
      return getDefaultMiddleware().concat(burgerApi.middleware);
    },
  });
};
