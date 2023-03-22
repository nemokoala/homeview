import Map from "components/LegacyMapContainer";
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
function Review({ reviewData }: any) {
  const [showDetail, setShowDetail] = useState<Boolean>(false);
  const [review, setReview] = useState<any>(null);
  const [reviews, setReviews] = useState<[object]>(reviewData);
  const [sidoList, setSidoList] = useState<any>([]);
  const [sidoFilter, setSidoFilter] = useState("전체");
  const navigate = useNavigate();
  const gotoDetail = (review: any): void => {
    navigate(`/review/${review.reviewId}`);
  };
  useEffect(() => {
    createSidoBtn();
  }, []);
  useEffect(() => {
    if (review !== null) setShowDetail(true);
    console.log(reviews);
  }, [review]);

  const createSidoBtn = () => {
    const sidos = new Array();
    for (let i = 0; i < reviewData.length; i++) {
      let 중복 = false;
      sidos.forEach((sido) => {
        if (sido === reviewData[i].sido) 중복 = true;
      });
      if (중복 === false) sidos.push(reviewData[i].sido);
      console.log(sidos);
    }

    const sortedSidos = sidos.sort();
    setSidoList([...sortedSidos, "전체"]);
  };

  return (
    <>
      {showDetail ? (
        <>
          <div
            onClick={() => {
              setReview(null);
              setShowDetail(false);
            }}
          >
            뒤로가기
          </div>
          <Map title={review.building} address={review.newAddress} />
          <h1>{review.building}</h1>
          <h3>{review.newAddress}</h3>
          <h3>{review.oldAddress}</h3>
          <h4>장점 : {review.pros}</h4>
          <h4>단점 : {review.cons}</h4>
        </>
      ) : (
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

          {reviews.map(
            (review: any) =>
              (sidoFilter === review.sido || sidoFilter === "전체") && (
                <div
                  className={styles.reviewContainer}
                  key={review.reviewId}
                  onClick={() => gotoDetail(review)}
                >
                  <div>{review.building}</div>
                  <div>{review.newAddress}</div>
                  <div>{review.oldAddress}</div>
                  <div>장점 : {review.pros}</div>
                  <div>단점 : {review.cons}</div>
                  <div>별점 : {review.star}</div>
                  <div>지역 : {review.sido}</div>
                  <div>클릭하여 자세히 보기...</div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
}
export default Review;
