import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import  tasksSlice  from "./taskSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    task: tasksSlice,
  },
});
