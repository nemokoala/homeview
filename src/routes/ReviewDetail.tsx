import MapContainer from "components/MapContainer";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

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
    <>
      {review != null && (
        <>
          <MapContainer data={review} />
          <Div>
            <h1>{review.building}</h1>
            <h3>{review.newAddress}</h3>
            <h3>{review.oldAddress}</h3>
            <h4>장점 : {review.pros}</h4>
            <h4>단점 : {review.cons}</h4>
            <h4>거주유형 : {review.residenceType}</h4>
            <h4>거주층 : {review.residenceFloor}</h4>
            <h4>거주년도 : {review.livedYear}까지</h4>
            <h4>별점 : {review.star}</h4>
          </Div>
        </>
      )}
    </>
  );
}

const Div = styled.div`
  width: 100%;
  padding: 0 20px;
`;
export default ReviewDetail;
