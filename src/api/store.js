import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './ingredientsApi.js';

const rootReducer = combineSlices(ingredientsApi);

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
