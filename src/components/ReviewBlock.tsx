import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function ReviewBlock({ review }: any) {
  const navigate = useNavigate();
  const gotoDetail = (review: any): void => {
    navigate(`/review/${review.reviewId}`);
  };
  let stars = "";
  for (let i = 0; i < review.star; i++) {
    stars += "★";
  }
  return (
    <CustomDiv className="reviewContainer" onClick={() => gotoDetail(review)}>
      <Building>{review.building}</Building>
      <Address>{review.newAddress}</Address>
      <Address>{review.oldAddress}</Address>
      <Pros>장점 : {review.pros}</Pros>
      <Cons>단점 : {review.cons}</Cons>
      <div>별점 : {stars}</div>
      <div>지역 : {review.sido}</div>
      <div>클릭하여 자세히 보기...</div>
    </CustomDiv>
  );
}

const CustomDiv = styled.div`
  margin: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 20px;
  border-radius: 20px;
  transition: all 0.7s;

  &:hover {
    background-color: var(--lightBlue);
    cursor: pointer;
  }
`;
const Building = styled.div`
  font-size: 1.6rem;
  font-weight: bolder;
`;
const Address = styled.div`
  font-size: 1rem;
  color: rgb(134, 134, 134);
`;
const Pros = styled.div`
  font-size: 1.1rem;
  font-weight: bolder;
  color: rgb(107, 107, 240);
`;
const Cons = styled.div`
  font-size: 1.1rem;
  font-weight: bolder;
  color: rgb(240, 107, 107);
`;

export default ReviewBlock;
