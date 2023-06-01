import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSet",
  initialState: {
    session: JSON.parse(sessionStorage.getItem("session") as any),
  },
  reducers: {
    saveSession: (state, action: any): any => {
      console.log("reducer : " + JSON.parse(action.payload));
      sessionStorage.setItem("session", JSON.stringify(action.payload)); //sessionstoarge에 저장
      if (action.payload === "") sessionStorage.removeItem("session"); // 값이 비면 세선 삭제
      state.session = action.payload;
    },
  },
});

export const { saveSession } = userSlice.actions;
export default userSlice.reducer;
