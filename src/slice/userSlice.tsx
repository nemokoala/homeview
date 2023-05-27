import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSet",
  initialState: {
    session: sessionStorage.getItem("session"),
  },
  reducers: {
    saveSession: (state, action: any): any => {
      console.log(action.payload);
      state.session = action.payload;
    },
  },
});

export const { saveSession } = userSlice.actions;
export default userSlice.reducer;
