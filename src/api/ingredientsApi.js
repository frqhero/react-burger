import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/utils/constants';

const baseUrl = API_URL;
const urlPath = '/api/ingredients';

const builderQueryObject = {
  query: () => {
    return {
      url: urlPath,
    };
  },
  transformResponse: (response) => response.data,
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => {
    return {
      getIngredients: builder.query(builderQueryObject),
    };
  },
});

export const { useGetIngredientsQuery } = ingredientsApi;
