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
      <Building>
        {review.building}{" "}
        <span
          style={{
            fontSize: "1.2rem",
            verticalAlign: "6px",
            color: "rgb(255, 202, 44)",
          }}
        >
          {stars}
        </span>
      </Building>
      <Address>{review.newAddress}</Address>
      <Address>{review.oldAddress}</Address>
      <hr
        style={{
          width: "100%",
          height: "1px",
          border: "0px",
          background: "black",
        }}
      ></hr>
      <Pros>장점 : {review.pros}</Pros>
      <Cons>단점 : {review.cons}</Cons>
      <Detail>클릭하여 자세히 보기...</Detail>
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
  font-size: 1.5rem;
  font-weight: bolder;
`;
const Address = styled.div`
  font-size: 0.9rem;
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
const Detail = styled.div`
  font-size: 0.9rem;
  color: rgb(70, 142, 190);
  margin-top: 10px;
`;

export default ReviewBlock;
