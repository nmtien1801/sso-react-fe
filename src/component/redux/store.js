import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import roleSlice from "./roleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleSlice,
  },
});