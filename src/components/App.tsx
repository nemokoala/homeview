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
    },
  ]);
  return <AppRouter reviewData={reviewData} setReviewData={setReviewData} />;
}

export default App;
