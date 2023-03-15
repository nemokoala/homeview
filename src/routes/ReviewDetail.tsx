import MapContainer from "components/MapContainer";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import styles from "./Review.module.css";

function ReviewDetail({ reviewData }: any | null) {
  const { id } = useParams();
  if (reviewData != null) {
  }
  const review = reviewData?.find((reviewId: any) => reviewId.reviewId == id);
  const navigate = useNavigate();
  useEffect(() => {
    if (review == null) navigate("/");
  }, []);
  return (
    <div className={styles.container}>
      {review != null && (
        <>
          <MapContainer data={review}/>
          <h1>{review.building}</h1>
          <h3>{review.newAddress}</h3>
          <h3>{review.oldAddress}</h3>
          <h4>장점 : {review.pros}</h4>
          <h4>단점 : {review.cons}</h4>
        </>
      )}
    </div>
  );
}
export default ReviewDetail;
