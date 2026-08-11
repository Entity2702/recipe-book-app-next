import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipesApi = createApi({
 reducerPath: 'recipesApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/'}),
 endpoints: (builder) => ({

  getRecipes: builder.query({
   query: ({limit = 6, skip = 0}) => `recipes?limit=${limit}&skip=${skip}`,
  }),

  getRecipesById: builder.query({
   query: ({id}) => `recipes/${id}`,
  }),

  searchRecipes: builder.query({
   query: ({search, limit = 6}) => `recipes/search?q=${search}&limit=${limit}`,
  }),

 })
});

export const{
 useGetRecipesQuery,
 useGetRecipesByIdQuery,
 useSearchRecipesQuery
} = recipesApi