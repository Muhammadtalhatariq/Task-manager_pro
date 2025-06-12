import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import tasksSlice from "./taskSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "Tasks",
  storage,
};

const tasksReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  tasks: tasksSlice,
});

const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
