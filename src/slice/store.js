import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./mapSlice";
import userSlice from "./userSlice";
const isDevelopment = process.env.REACT_APP_ENV === "development";
export const store = configureStore({
  reducer: {
    mapSet: mapSlice,
    userSet: userSlice,
  },
  devTools: isDevelopment,
});
