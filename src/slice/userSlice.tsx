import { createSlice } from "@reduxjs/toolkit";

let loadData = JSON.parse(localStorage.getItem("session") as any);
let now = new Date();
if (loadData) {
  let diff = now.getTime() - loadData.date.getTime();
  let diffMinutes = Math.floor(diff / 1000 / 60);
  console.log("시간차이" + diffMinutes);
  if (diffMinutes >= 30) {
    localStorage.removeItem("session");
    loadData = "";
  }
}

export const userSlice = createSlice({
  name: "userSet",
  initialState: {
    session: JSON.parse(localStorage.getItem("session") as any),
  },
  reducers: {
    saveSession: (state, action: any): any => {
      console.log("reducer : " + JSON.stringify(action.payload));
      const data = { ...action.payload, date: now };
      localStorage.setItem("session", JSON.stringify(data)); //sessionstoarge에 저장
      if (action.payload === "") localStorage.removeItem("session"); // 값이 비면 세선 삭제
      state.session = action.payload;
    },
  },
});

export const { saveSession } = userSlice.actions;
export default userSlice.reducer;
