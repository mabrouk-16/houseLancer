import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./slices/modelSlice";
import canvaReducer from "./slices/canvaSlice";
import { allProjects } from '../services/api';
import { setupListeners } from '@reduxjs/toolkit/query/react'; // Import setupListeners function
import { allOffers } from "../services/offer";
import { allUsers } from "../services/user";

const store = configureStore({
  reducer: {
    modelReducer,
    canvaReducer,
    [allProjects.reducerPath]: allProjects.reducer,
    [allOffers.reducerPath]: allOffers.reducer,
    [allUsers.reducerPath]: allUsers.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      allProjects.middleware,
      allOffers.middleware,
      allUsers.middleware
    ), // Add both RTK Query middlewares in an array
});

setupListeners(store); // Attach listeners

export default store;
