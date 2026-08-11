import { configureStore } from "@reduxjs/toolkit";
import { recipesApi } from "@/app/api/RecipesAPI";

export const makeStore = configureStore({
 reducer: {
  [recipesApi.reducerPath]: recipesApi.reducer,
 },

 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipesApi.middleware),
 
});