import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function Profile() {
  const [password, setPassword] = useState("");
  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "password") setPassword(value);
  };
  const enterPress = (e: any) => {
    if (e.key === "Enter") {
      confirm();
    }
  };

  const confirm = async () => {
    if (password.length >= 8) {
      try {
        const response = await axios.post(
          "https://api.binbinbin.site/api/checkPW",
          password,
          { withCredentials: true }
        );

        console.log(JSON.parse(response as any));
      } catch (error: any) {
        //const errorText = error.response.data.toString();
        console.error("에러 : " + JSON.parse(error));
      }
    }
  };
  return (
    <Container>
      <Form>
        <Title>내 프로필 수정</Title>
        <Label>현재 비밀번호</Label>
        <Input
          type="password"
          id="password"
          onChange={onChange}
          value={password}
          placeholder="현재 비밀번호를 입력해주세요."
          autoComplete="on"
          onKeyPress={enterPress}
        ></Input>
        <Buttons>
          <div onClick={confirm}>비밀번호 확인</div>
          <div>취소</div>
        </Buttons>
      </Form>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--navHeight));
  height: auto;
  background: linear-gradient(to bottom, white, #d9f4ff);
  margin: 0;
  display: inline-block;
`;

const Form = styled.form<any>`
  transition: all 1s ease-in;

  margin: 50px auto;
  width: 500px;
  height: auto;
  display: flex;
  flex-flow: column wrap;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  background-color: rgba(255, 253, 247, 0.438);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 10px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 15px;
  padding: 20px 50px;
  @media screen and (max-width: 540px) {
    width: calc(100% - 40px);
    padding: 20px 10%;
  }
`;

const Title = styled.div`
  margin: 15px auto;
  color: black;
  font-size: 1.8rem;
`;
const Label = styled.span`
  color: black;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 5px auto;
  border-radius: 15px;
  border: 0px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.712);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 5px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  &:focus {
    outline: 1px solid var(--orange) !important;
    border-color: var(--orange) !important;
    box-shadow: 0 0 7px var(--orange);
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  gap: 25px;
  padding: 0;
  margin: 50px 0;
  justify-content: center;
  & div {
    flex-grow: 1;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: rgba(251, 252, 255, 0.226);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 5px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    font-size: 1.3rem;
  }
  & div:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  & div:active {
    filter: hue-rotate(90deg);
  }
`;
export default Profile;
