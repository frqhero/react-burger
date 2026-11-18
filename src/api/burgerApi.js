import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/utils/constants';

const baseUrl = API_URL + '/api';

const ingredientsQuery = {
  query: () => {
    return {
      url: '/ingredients',
    };
  },
  transformResponse: (response) => response.data,
};

const createOrderQuery = {
  query: (orderData) => {
    return {
      url: '/orders',
      method: 'POST',
      body: orderData,
    };
  },
};

export const burgerApi = createApi({
  reducerPath: 'burgerApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => {
    return {
      getIngredients: builder.query(ingredientsQuery),
      createOrder: builder.mutation(createOrderQuery),
    };
  },
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = burgerApi;
