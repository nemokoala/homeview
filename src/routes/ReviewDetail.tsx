import Map from "components/Map";
import { useState } from "react";
import styles from "./Review.module.css";

interface Reviews {
  reviewId: string;
  newAddress: string;
  oldAddress: string;
  pros: string;
  cons: string;
}
function ReviewDetail(props: Reviews) {
  return (
    <div className={styles.container}>
      <Map address={props.newAddress} />
      {props.reviewId}
      {props.newAddress}
    </div>
  );
}
export default ReviewDetail;
