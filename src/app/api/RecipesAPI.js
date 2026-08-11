import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipesApi = createApi({
 reducerPath: 'recipesApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/'}),
 endpoints: (builder) => ({

  getRecipes: builder.query({
   query: ({search = '', limit = 6, skip = 0}) => {
    if(search) return `recipes/search?q=${search}&limit=${limit}&skip=${skip}`;
    return `recipes?limit=${limit}&skip=${skip}`;
   },
  }),

  getRecipesById: builder.query({
   query: ({id}) => `recipes/${id}`,
  }),

 })
});

export const{
 useGetRecipesQuery,
 useGetRecipesByIdQuery,
} = recipesApi