import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function Register() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();
  const login = "/api/login";
  const register = "/api/join";
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname);
    setTimeout(() => {
      setIsAnimated(false);
    }, 500); //애니메이션 종료
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
  const confirm = (e: any) => {
    if (pathname === register) {
      if (name && nickname && email && password) {
        //회원가입
        const userData = {
          "name": name,
          "nickname": nickname,
          "email": email,
          "password": password,
        };
        axios
          .post("http://43.201.86.247:8080/api/join", JSON.stringify(userData))
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("빈칸을 모두 채워주세요.");
      }
    }
    if (pathname === "/login") {
      alert("로그인.");
    }
  };
  return (
    <Container>
      <Form isAnimated={isAnimated}>
        {pathname === register ? (
          <>
            <Title>회원가입</Title>
            <Label>이름</Label>
            <Input
              type="text"
              id="name"
              onChange={onChange}
              value={name}
              placeholder="특수 문자, 숫자 제외"
            ></Input>
            <Label>닉네임</Label>
            <Input
              type="text"
              id="nickname"
              onChange={onChange}
              value={nickname}
              placeholder="특수 문자 제외"
            ></Input>
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
          placeholder="example@ooo.com"
        ></Input>
        <Label>비밀번호</Label>
        <Input
          type="password"
          id="password"
          onChange={onChange}
          value={password}
          placeholder={
            pathname === register
              ? "8~16자리 대소문자, 숫자, 특수문자 1개 이상 포함"
              : "Password"
          }
        ></Input>
        <Buttons>
          <div
            onClick={confirm}
            style={
              pathname === register
                ? { backgroundColor: "lightgreen" }
                : { backgroundColor: "skyblue" }
            }
          >
            {pathname === register ? "회원가입" : "로그인"}
          </div>
          <div>취소</div>
        </Buttons>
        {pathname === register ? (
          <LoginLink
            onClick={() => {
              setTimeout(() => {
                navigate("/login");
              }, 250);

              setIsAnimated(true);
            }}
          >
            계정이 있으면 로그인하기
          </LoginLink>
        ) : (
          <LoginLink
            onClick={() => {
              setTimeout(() => {
                navigate(register);
              }, 250);
              setIsAnimated(true);
            }}
          >
            계정이 없으면 회원가입하기
          </LoginLink>
        )}
      </Form>
    </Container>
  );
}

const fadein = keyframes`
  0% {
    transform: scale(1);
  }
  50%{
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--navHeight));
  height: auto;
  background: linear-gradient(to bottom, white, #d9f4ff);
  margin: 0;
  display: inline-block;
`;
const Form = styled.div<any>`
  transition: all 1s ease-in;
  overflow: hidden;
  animation: ${(props) => props.isAnimated === true && fadein} 0.5s ease-in;
  margin: 50px auto;
  /* opacity: ${(props) => (props.isAnimated ? 0 : 1)}; */
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
  & div:hover {
    cursor: pointer;
  }
`;
const LoginLink = styled.div`
  color: purple;
  width: 100%;
  text-align: center;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

export default Register;
