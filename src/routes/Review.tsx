import Map from "components/LegacyMapContainer";
import ReviewBlock from "components/ReviewBlock";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Review.module.css";

interface Reviews {
  reviewId: string;
  building: string;
  newAddress: string;
  oldAddress: string;
  pros: string;
  cons: string;
}
function Review({ reviewData, searchTerm, setSearchTerm }: any) {
  const [reviews, setReviews] = useState<[object]>(reviewData);
  const [sidoList, setSidoList] = useState<any>([]);
  const [sidoFilter, setSidoFilter] = useState("전체");
  const [showNoResult, setShowNoResult] = useState(false);
  let filteredReview = [];
  useEffect(() => {
    createSidoBtn();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = reviewData.filter(
        (review: any) =>
          (review.building.includes(searchTerm) ||
            review.newAddress.includes(searchTerm) ||
            review.oldAddress.includes(searchTerm)) &&
          review.sido === sidoFilter
      );
      console.log(filtered);
      if (filtered.length === 0) setShowNoResult(true);
      else setShowNoResult(false);
    }
  }, [searchTerm, sidoFilter]); //시도 버튼 클릭 시 + 검색어 입력시 검색없음 텍스트 나오게하기.

  const createSidoBtn = () => {
    const sidos = new Array();
    for (let i = 0; i < reviewData.length; i++) {
      let 중복 = false;
      sidos.forEach((sido) => {
        if (sido === reviewData[i].sido) 중복 = true;
      });
      if (중복 === false) sidos.push(reviewData[i].sido);
    }

    const sortedSidos = sidos.sort();
    setSidoList([...sortedSidos, "전체"]);
  };

  filteredReview = reviewData.filter(
    (review: any) =>
      review.building.includes(searchTerm) ||
      review.newAddress.includes(searchTerm) ||
      review.oldAddress.includes(searchTerm)
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.btns}>
          {sidoList.map((sido: any) => (
            <div
              className={`${styles.sidoBtn} ${
                sidoFilter === sido && styles.active
              }`}
              key={sido}
              onClick={() => setSidoFilter(sido)}
            >
              {sido}
            </div>
          ))}
        </div>

        {searchTerm === ""
          ? reviews.map(
              (review: any) =>
                (sidoFilter === review.sido || sidoFilter === "전체") && (
                  <ReviewBlock review={review} key={review.reviewId} />
                )
            )
          : filteredReview.map(
              (review: any) =>
                (sidoFilter === review.sido || sidoFilter === "전체") && (
                  <ReviewBlock review={review} key={review.reviewId} />
                )
            )}
        {showNoResult && (
          <div
            className={styles.searchNothing}
            onClick={() => {
              setSearchTerm("");
              setShowNoResult(false);
            }}
          >
            <div>현재 검색어 필터 : "{searchTerm}"</div>
            <div>현재 시도 필터 : "{sidoFilter}"</div>
            <span className={styles.x}>x</span>
            <br />
            <span>검색 결과 없음</span>
          </div>
        )}
      </div>
    </>
  );
}
export default Review;
