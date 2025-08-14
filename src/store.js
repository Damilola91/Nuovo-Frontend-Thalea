import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import bookingReducer from "./reducer/bookingSlice";

const rootReducer = combineReducers({
  bookingSlice: bookingReducer, // lo slice si chiama 'booking'
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["booking"], // salva solo booking
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
