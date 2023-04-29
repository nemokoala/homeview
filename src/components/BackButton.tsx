import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function BackButton() {
  const navigate = useNavigate();
  return <Div onClick={() => navigate(-1)}>◀</Div>;
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background-color: orange;
  color: black;
  font-size: 2rem;
  position: fixed;
  left: 20px;
  bottom: 20px;
  transition: all 0.5s;
  line-height: 1.7;
  z-index: 999;
  &:hover {
    cursor: pointer;
    background-color: #fdc55e;
  }
  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

export default BackButton;
