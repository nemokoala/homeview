import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSet",
  initialState: {
    session: JSON.parse(sessionStorage.getItem("session") as any),
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
