import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import billReducer from './billSlice'

const persistConfig = {
    key: "root",
    storage,
};
  
const persistedReducer = persistReducer(persistConfig, billReducer);
export const store = configureStore({
    reducer: {
        bill: persistedReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store);