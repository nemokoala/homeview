import axios from "axios";
import MapContainer from "components/MapContainer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { apiAddress } from "value";

function ReviewDetail() {
  const [reviewData, setReviewData] = useState<any>(null);
  const session = useSelector((state: any) => state.userSet.session);
  const params = useParams();
  const reviewId = params.id;

  useEffect(() => {
    getReviewDetail();
  }, []);

  useEffect(() => {
    if (reviewData) setStar();
  }, [reviewData]);

  const getReviewDetail = async () => {
    try {
      const response = await axios.get(`${apiAddress}/review/get/${reviewId}`);
      setReviewData(response.data);

      console.log(
        "ReviewDetail.tsx(getReviewDetail): " + JSON.stringify(response)
      );
    } catch (error: any) {
      console.error(
        "ReviewDetail.tsx(getReviewDetail): " + JSON.stringify(error)
      );
    }
  };

  const deleteReview = async () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?"))
      try {
        const response = await axios.get(
          `${apiAddress}/review/delete/${reviewId}`,
          { withCredentials: true }
        );
        if (response) navigate("/review");
        console.log(
          "ReviewDetail.tsx(deleteReview): " + JSON.stringify(response)
        );
      } catch (error: any) {
        console.error(
          "ReviewDetail.tsx(deleteReview): " + JSON.stringify(error)
        );
      }
  };

  let stars = "";
  const setStar = () => {
    for (let i = 0; i < reviewData.score; i++) {
      stars += "★";
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {reviewData && (
        <>
          <MapContainer data={reviewData} />
          <CustomDiv>
            <Building>
              {reviewData.room.building} <Star>{stars}</Star>{" "}
              <span style={{ color: "gray" }}> #{reviewData.review_id}</span>{" "}
            </Building>
            <Address>{reviewData.room.new_address}</Address>
            <Address>{reviewData.room.old_address}</Address>
            {reviewData.review_id === session.id && (
              <Btn onClick={() => deleteReview()}>삭제</Btn>
            )}
            <Hr></Hr>
            <Pros>장점 : {reviewData.pros}</Pros>
            <Cons>단점 : {reviewData.cons}</Cons>
            {reviewData.url && (
              <img src={reviewData.url} style={{ width: "100%" }} />
            )}
            <UserName>
              작성자 : {reviewData.nickname}#{reviewData.member_id}
            </UserName>
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
  width: 100%;
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

const Btn = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: ${(props) => props.height || "30px"};
  border-radius: 20px;
  color: white;
  background-color: ${(props) => props.backgroundColor || "rgb(253, 132, 132)"};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-top: 8px;
  margin-bottom: 3px;
  transition: all 0.7s;
  &:hover {
    filter: contrast(170%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(320deg);
  }
`;
export default ReviewDetail;
