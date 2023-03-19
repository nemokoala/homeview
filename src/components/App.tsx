import axios from "axios";
import { useEffect, useState } from "react";
import AppRouter from "./Router";

interface Reviews {
  reviewId: string;
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
}

function App() {
  const [reviewData, setReviewData] = useState<Reviews[]>([
    {
      reviewId: "1",
      building: "제일3차아파트",
      newAddress: "고봉로34길 35",
      oldAddress: "전북 익산시 영등동 821",
      pros: "시내랑 가까워요",
      cons: "가격이 비싸요",
      residenceType: "아파트",
      residenceFloor: "저층",
      livedYear: 2023,
      star: 4,
      lat: 35.9603410900727,
      lng: 126.973805773829,
      sido: "전북",
    },
    {
      reviewId: "2",
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
    },
    {
      reviewId: "3",
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
    },
    {
      reviewId: "4",
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
    },
    {
      reviewId: "5",
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
    },
    {
      reviewId: "6",
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
    },
    {
      reviewId: "7",
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
    },
    {
      reviewId: "8",
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
    },
  ]);
  return <AppRouter reviewData={reviewData} setReviewData={setReviewData} />;
}

export default App;
