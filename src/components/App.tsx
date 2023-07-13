import axios from "axios";
import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { useDispatch } from "react-redux";
import { saveSession } from "slice/userSlice";
import { apiAddress, sessionTime } from "value";

interface Reviews {
  reviewId: string;
  userName: string;
  building: string;
  newAddress: string;
  oldAddress: string;
  pros: string;
  cons: string;
  residenceType: string;
  residenceFloor: string;
  livedYear: number;
  star: number;
  lat: number;
  lng: number;
  sido: string;
  sigungu: string;
  dong: string;
}

function App() {
  const dispatch = useDispatch();

  let loadData = JSON.parse(localStorage.getItem("session") as any);
  let now = new Date();

  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiAddress}/api/info`, {
        withCredentials: true,
      });
      console.log("App.tsx(getUserData): " + JSON.stringify(response));
      const userData = response.data;
      return userData;
      // dispatch(setModal({ text: JSON.stringify(response) } as any));
    } catch (error: any) {
      // dispatch(setModal({ text: JSON.stringify(error) } as any));
      console.error("App.tsx(getUserData): " + JSON.stringify(error));
      return "";
    }
  };
  const loadUserData = async () => {
    if (loadData) {
      let diff = now.getTime() - new Date(loadData.date).getTime();
      let diffMinutes = Math.floor(diff / 1000 / 60);
      console.log("시간차이" + diffMinutes);
      if (diffMinutes >= sessionTime) {
        localStorage.removeItem("session");
        loadData = "";
      } else {
        let userData = await getUserData();
        console.log("유저데이터 ", userData);
        if (userData !== "") dispatch(saveSession({ ...userData } as any));
        //만료되지 않았다면 localstorage정보를 redux에 업데이트
        else if (userData === "") dispatch(saveSession("" as any)); //만료되지 않았다면 localstorage정보를 redux에 업데이트
        setTimeout(() => {
          //x분뒤 세션 만료
          alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
          dispatch(saveSession("" as any));
        }, sessionTime * 60 * 1000 - diffMinutes * 60 * 1000);
      }
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);

  return <AppRouter />;
}

export default App;
