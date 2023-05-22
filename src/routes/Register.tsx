import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function Register() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname);
    setTimeout(() => {
      setIsAnimated(false);
    }, 250); //애니메이션 종료
  }, [pathname]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { id, value },
    } = e;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "name") setName(value);
    if (id === "nickname") setNickname(value);
    console.log(email, password);
  };
  return (
    <Container>
      <Form isAnimated={isAnimated}>
        {pathname === "/register" ? (
          <>
            <Title>회원가입</Title>
            <Label>이름</Label>
            <Input
              type="text"
              id="name"
              onChange={onChange}
              value={name}
              placeholder="Name"
            ></Input>
            <Label>닉네임</Label>
            <Input
              type="text"
              id="nickname"
              onChange={onChange}
              value={nickname}
              placeholder="Nickname"
            ></Input>{" "}
          </>
        ) : (
          <Title>로그인</Title>
        )}

        <Label>이메일</Label>
        <Input
          type="email"
          id="email"
          onChange={onChange}
          value={email}
          placeholder="Email"
        ></Input>
        <Label>비밀번호</Label>
        <Input
          type="email"
          id="password"
          onChange={onChange}
          value={password}
          placeholder="Password"
        ></Input>
        <Buttons>
          <div>{pathname === "/register" ? "회원가입" : "로그인"}</div>
          <div>취소</div>
        </Buttons>
        {pathname === "/register" ? (
          <Link to="/login" onClick={() => setIsAnimated(true)}>
            <LoginLink>계정이 있으면 로그인하기</LoginLink>
          </Link>
        ) : (
          <Link to="/register" onClick={() => setIsAnimated(true)}>
            <LoginLink>계정이 없으면 회원가입하기</LoginLink>
          </Link>
        )}
      </Form>
    </Container>
  );
}

export default Register;
const fadein = keyframes`
  from {
    transform: scaleY(0)
  }
  to {
    transform: scaleY(1)
  }
`;
const Container = styled.div`
  width: 100%;
  height: calc(100vh - var(--navHeight));
  background: linear-gradient(to bottom, white, rgb(158, 227, 248));
  margin: 0;
  display: inline-block;
`;
const Form = styled.div<any>`
  transition: all 1s ease-in;
  overflow: hidden;
  animation: ${fadein} 0.5s ease-in;
  margin: 100px auto;
  /* opacity: ${(props) => (props.isAnimated ? 0 : 1)}; */
  width: ${(props) => (props.isAnimated ? "1000px" : "500px")};
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 10px 5px;
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
  & div:nth-child(1) {
    background-color: rgba(236, 208, 49, 0.733);
  }
`;
const LoginLink = styled.div`
  color: purple;
  width: 100%;
  text-align: center;
`;
