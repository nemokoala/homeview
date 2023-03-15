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
  const navigate = useNavigate();
  const gotoDetail = (review: any): void => {
    navigate(`/review/${review.reviewId}`);
  };

  useEffect(() => {
    if (review !== null) setShowDetail(true);
  }, [review]);
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
          {reviews.map((review: any) => (
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
              <div>클릭하여 자세히 보기...</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Review;
