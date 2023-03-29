import MapContainer from "components/MapContainer";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function ReviewDetail({ reviewData }: any | null) {
  const { id } = useParams();
  if (reviewData != null) {
  }

  const review = reviewData?.find((reviewId: any) => reviewId.reviewId == id);
  let stars = "";
  for (let i = 0; i < review.star; i++) {
    stars += "★";
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (review == null) navigate("/");
  }, []);
  return (
    <>
      {review != null && (
        <>
          <MapContainer data={review} />
          <CustomDiv>
            <Building>
              {review.building} <Star>{stars}</Star>{" "}
            </Building>
            <Address>{review.newAddress}</Address>
            <Address>{review.oldAddress}</Address>
            <Hr></Hr>
            <Pros>장점 : {review.pros}</Pros>
            <Cons>단점 : {review.cons}</Cons>
            <Year>거주년도 : {review.livedYear}년까지</Year>
            <Year>거주유형 : {review.residenceType}</Year>
            <Year>거주층 : {review.residenceFloor}</Year>
            <UserName>작성자 : {review.userName}</UserName>
          </CustomDiv>
        </>
      )}
    </>
  );
}

const CustomDiv = styled.div`
  margin: 20px 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 20px;
  border-radius: 20px;
  transition: all 0.7s;

  &:hover {
    transform: scale(1.005);
  }
`;
const Building = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
`;
const Address = styled.div`
  font-size: 1.1rem;
  color: rgb(134, 134, 134);
`;
const Star = styled.span`
  font-size: 1.3rem;
  vertical-align: 3px;
  color: rgb(255, 202, 44);
`;
const Pros = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
  color: rgb(107, 107, 240);
`;
const Cons = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
  color: rgb(240, 107, 107);
`;
const Year = styled.div`
  font-size: 1.1rem;
  color: rgb(46, 50, 53);
  margin: 15px 0;
`;
const Detail = styled.div`
  font-size: 0.9rem;
  color: rgb(70, 142, 190);
  margin-top: 10px;
`;
const Hr = styled.hr`
  width: 98%;
  height: 1px;
  border: 0px;
  background-color: black;
  margin: 10px 0;
`;
const UserName = styled.div`
  font-size: 1rem;
  color: rgb(156, 89, 0);
  text-align: right;
`;
export default ReviewDetail;
