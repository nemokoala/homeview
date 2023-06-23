import axios from "axios";
import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { useDispatch } from "react-redux";
import { saveSession } from "slice/userSlice";

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
  const [reviewData, setReviewData] = useState<Reviews[]>([
    {
      reviewId: "1",
      userName: "코알라",
      building: "영등3차제일아파트",
      newAddress: "고봉로34길 35",
      oldAddress: "전북 익산시 영등동 821",
      pros: "시내랑 가까워요",
      cons: "가격이 비싸요",
      residenceType: "아파트",
      residenceFloor: "저층",
      livedYear: 2023,
      star: 4,
      lat: 35.9603410100727,
      lng: 126.973805773829,
      sido: "전북",
      sigungu: "익산시",
      dong: "영등동",
    },
    {
      reviewId: "111",
      userName: "코알라",
      building: "영등3차제일아파트",
      newAddress: "고봉로34길 35",
      oldAddress: "전북 익산시 영등동 821",
      pros: "222",
      cons: "222",
      residenceType: "아파트",
      residenceFloor: "저층",
      livedYear: 2023,
      star: 4,
      lat: 35.9603410100727,
      lng: 126.973805773829,
      sido: "전북",
      sigungu: "익산시",
      dong: "영등동",
    },
    {
      reviewId: "2",
      userName: "코알라",
      building: "우남샘물아파트",
      newAddress: "고봉로34길 5-4",
      oldAddress: "전북 익산시 영등동 800",
      pros: "가격이 싸요",
      cons: "복도식 아파트에요",
      residenceType: "아파트",
      residenceFloor: "고층",
      livedYear: 2023,
      star: 3,
      lat: 35.9602708316844,
      lng: 126.971596923903,
      sido: "전북",
      sigungu: "익산시",
      dong: "영등동",
    },
    {
      reviewId: "3",
      userName: "코알라",
      building: "예광교회",
      newAddress: "전북 익산시 고봉로34길 5-4",
      oldAddress: "전북 익산시 영등동 800",
      pros: "건물이 멋져요",
      cons: "건물이 오래됐어요",
      residenceType: "원룸/주택/빌라",
      residenceFloor: "저층",
      livedYear: 2022,
      star: 4,
      lat: 35.9599858688137,
      lng: 126.972019488308,
      sido: "전북",
      sigungu: "익산시",
      dong: "영등동",
    },
    {
      reviewId: "4",
      userName: "코알라",
      building: "수성못길 4",
      newAddress: "대구 수성구 수성못길 4",
      oldAddress: "대구 수성구 두산동 840-1",
      pros: "그냥 좋아요",
      cons: "건물이 오래됐어요",
      residenceType: "원룸/주택/빌라",
      residenceFloor: "저층",
      livedYear: 2022,
      star: 3,
      lat: 35.8256954560441,
      lng: 128.621712582663,
      sido: "대구",
      sigungu: "수성구",
      dong: "두산동",
    },
    {
      reviewId: "5",
      userName: "코알라",
      building: "경상길 1",
      newAddress: "대구 남구 경상길 1",
      oldAddress: "대구 남구 대명동 3019-30",
      pros: "그냥 좋아요",
      cons: "건물이 오래됐어요",
      residenceType: "원룸/주택/빌라",
      residenceFloor: "저층",
      livedYear: 2022,
      star: 3,
      lat: 35.8476347725294,
      lng: 128.574071383549,
      sido: "대구",
      sigungu: "남구",
      dong: "대명동",
    },
    {
      reviewId: "6",
      userName: "코알라",
      building: "동익산역",
      newAddress: "전북 익산시 옛둑2길 84",
      oldAddress: "",
      pros: "그냥 좋아요",
      cons: "건물이 오래됐어요",
      residenceType: "원룸/주택/빌라",
      residenceFloor: "저층",
      livedYear: 2022,
      star: 3,
      lat: 35.9212631577091,
      lng: 126.957043421827,
      sido: "전북",
      sigungu: "익산시",
      dong: "동산동",
    },
    {
      reviewId: "7",
      userName: "코알라",
      building: "카카오티",
      newAddress: "서울 관악구 관악로13길 20",
      oldAddress: "",
      pros: "ㄱㄱ",
      cons: "ㄴㄴㄴ",
      residenceType: "원룸/주택/빌라",
      residenceFloor: "저층",
      livedYear: 2022,
      star: 3,
      lat: 37.4794819160355,
      lng: 126.95108210547,
      sido: "서울",
      sigungu: "마포구",
      dong: "봉천동",
    },
    {
      reviewId: "8",
      userName: "코알라",
      building: "마포 네이버타운",
      newAddress: "서울 마포구 큰우물로 53",
      oldAddress: "서울 마포구 염리동 174-14",
      pros: "ㄱㄱ",
      cons: "ㄴㄴㄴ",
      residenceType: "원룸/주택/빌라",
      residenceFloor: "저층",
      livedYear: 2022,
      star: 3,
      lat: 37.5422914154608,
      lng: 126.94462959649,
      sido: "서울",
      sigungu: "관악구",
      dong: "염리동",
    },
    {
      reviewId: "5794",
      userName: "코알라",
      building: "송정크레지움센트럴아파트",
      newAddress: "광주 광산구 광산로89번길 27-7",
      oldAddress: "광주 광산구 송정동 731-1",
      pros: "집이 넓어요",
      cons: "지하철이 없어요",
      residenceType: "아파트",
      residenceFloor: "저층",
      livedYear: 2023,
      star: 4,
      lat: 35.1426484890633,
      lng: 126.799099466195,
      sido: "광주",
      sigungu: "광산구",
      dong: "송정동",
    },
    {
      reviewId: "3793",
      userName: "코알라",
      building: "파크하얏트부산호텔",
      newAddress: "부산 해운대구 마린시티1로 51",
      oldAddress: "부산 해운대구 우동 1409-3",
      pros: "바다가 가까워요",
      cons: "교통이 안좋아요",
      residenceType: "오피스텔",
      residenceFloor: "고층",
      livedYear: 2023,
      star: 2,
      lat: 35.15657960006,
      lng: 129.141874959976,
      sido: "부산",
      sigungu: "해운대구",
      dong: "우동",
    },
    {
      reviewId: "3615",
      userName: "코알라",
      building: "고봉로 156",
      newAddress: "전북 익산시 고봉로 156",
      oldAddress: "전북 익산시 영등동 548-68",
      pros: "3",
      cons: "3",
      residenceType: "아파트",
      residenceFloor: "저층",
      livedYear: 2023,
      star: 5,
      lat: 35.9462547669855,
      lng: 126.966804259277,
      sido: "전북",
      sigungu: "익산시",
      dong: "영등동",
    },
  ]);
  const [roomData, setRoomData] = useState([]);
  const dispatch = useDispatch();
  let loadData = JSON.parse(localStorage.getItem("session") as any);
  let now = new Date();

  if (loadData) {
    let diff = now.getTime() - new Date(loadData.date).getTime();
    let diffMinutes = Math.floor(diff / 1000 / 60);
    console.log("시간차이" + diffMinutes);
    if (diffMinutes >= 30) {
      localStorage.removeItem("session");
      loadData = "";
    } else {
      dispatch(saveSession({ ...loadData } as any)); //만료되지 않았다면 localstorage정보를 redux에 업데이트
      setTimeout(() => {
        //x분뒤 세션 만료
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        dispatch(saveSession("" as any));
      }, 30 - diffMinutes * 60 * 1000);
    }
  }
  return <AppRouter reviewData={reviewData} setReviewData={setReviewData} />;
}

export default App;
