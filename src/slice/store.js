import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./mapSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer: {
    mapSet: mapSlice,
    userSet: userSlice,
  },
});
