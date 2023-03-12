import Map from "components/Map";
import { useState, useEffect } from "react";
import styles from "./Review.module.css";

interface Reviews {
  reviewId: string;
  building: string;
  newAddress: string;
  oldAddress: string;
  pros: string;
  cons: string;
}
function Review() {
  const [showDetail, setShowDetail] = useState<Boolean>(false);
  const [review, setReview] = useState<any>(null);
  const [reviews, setReviews] = useState<Reviews[]>([
    {
      reviewId: "0001",
      building: "제일3차아파트",
      newAddress: "고봉로 34길 35",
      oldAddress: "익산시 영등동",
      pros: "집이 싸고 넓어요",
      cons: "가격이 비싸요",
    },
    {
      reviewId: "0002",
      building: "홈플러스 근처 집",
      newAddress: "전북 익산시 고봉로34길 5-3",
      oldAddress: "익산시 영등동",
      pros: "집이 싸요",
      cons: "집이 좁아요",
    },
    {
      reviewId: "0003",
      building: "올리브",
      newAddress: "대구 남구 장전1길 182",
      oldAddress: "익산시 영등동",
      pros: "집이 싸요",
      cons: "집이 좁아요",
    },
    {
      reviewId: "0004",
      building: "올리브",
      newAddress: "대구 남구 대명동 1675-26",
      oldAddress: "익산시 영등동",
      pros: "집이 싸요",
      cons: "집이 좁아요",
    },
  ]);

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
          {reviews.map((review) => (
            <div
              className={styles.reviewContainer}
              key={review.reviewId}
              onClick={() => setReview(review)}
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
