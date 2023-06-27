import { useParams } from "react-router-dom";
import styled from "styled-components";

function Post() {
  const params = useParams();
  const postId = params.id;
}
const CustomDiv = styled.div`
  margin: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 20px;
  border-radius: 20px;
  transition: all 0.7s;
  &:hover {
    background-color: rgb(255, 241, 195);
    cursor: pointer;
    transform: scale(1.03);
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
const Star = styled.span`
  font-size: 1.2rem;
  vertical-align: 4px;
  color: rgb(255, 202, 44);
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
const Year = styled.div`
  font-size: 1rem;
  color: rgb(46, 50, 53);
`;
const Detail = styled.div`
  font-size: 0.95rem;
  color: rgb(96, 157, 197);
  margin-top: 10px;
`;
const Hr = styled.hr`
  width: 98%;
  height: 1px;
  border: 0px;
  background-color: black;
  margin: 10px 0;
`;
export default Post;