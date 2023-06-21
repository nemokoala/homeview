import axios from "axios";
import Modal from "components/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveSession } from "slice/userSlice";
import { setModal } from "slice/modalSlice";
import styled, { keyframes } from "styled-components";
import { apiAddress } from "value";

function Register() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAnimated, setIsAnimated] = useState(false); //로그인 회원가입 전환시 애니메이션
  const [duplication, setDuplication] = useState(0); //이메일 중복체크
  const dispatch = useDispatch<any>();

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
  const enterPress = (e: any) => {
    if (e.key === "Enter") {
      confirm();
    }
  };
  const confirm = async () => {
    if (pathname === register) {
      if (name && nickname && email && password && duplication === 1) {
        const userData = {
          name: name,
          nickname: nickname,
          email: email,
          password: password,
        };
        try {
          const response = await axios.post(
            `${apiAddress}/api/join`,
            { ...userData },
            { withCredentials: true }
          );

          console.log("리스폰즈DATAthen : " + response.data);
          console.log("리스폰즈STATUS : " + response.status);
          if (response.status === 201) {
            dispatch(
              setModal({
                title: "알림",
                text: "회원가입이 완료되었습니다. 로그인 해주세요.",
                btn1Func: function () {
                  navigate("/api/login");
                },
              } as any)
            );
          }
        } catch (error: any) {
          const errorText = error.response.data.toString();
          console.error("에러 : " + error);
          console.error(
            "에러 리스폰즈data : " + JSON.stringify(error.response.data)
          );
          dispatch(
            setModal({
              title: "에러!",
              titleColor: "red",
              text: errorText,
            } as any)
          );
        }
      } else {
        dispatch(
          setModal({
            text: "이메일 중복 확인을 하거나 빈칸을 모두 채워주세요.",
          } as any)
        );
      }
    }
    if (pathname === login) {
      const formUserData = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          `${apiAddress}/api/login`,
          { ...formUserData },
          { withCredentials: true }
        );

        const jsonData = JSON.stringify(response.data);
        const userData = JSON.parse(jsonData);
        console.log("리스폰즈 : " + jsonData);
        console.log("response.status : " + response.status);
        console.log("토큰 " + response.data.token);
        console.log("headers : " + response.headers);

        if (response.data === "BAD_REQUEST") {
          dispatch(
            setModal({
              title: "에러!",
              titleColor: "red",
              text: "아이디 또는 비밀번호가 올바르지 않습니다.",
            } as any)
          );
        } else if (response.status === 200) {
          dispatch(saveSession(userData as any));
          navigate("/");
        }
      } catch (error: any) {
        const errorText = error.toString();
        console.error("에러 : " + error);
        dispatch(
          setModal({
            title: "에러!",
            titleColor: "red",
            text: errorText,
          } as any)
        );
      }
    }
  };

  const duplicationCheck = async () => {
    try {
      const response = await axios.get(
        `${apiAddress}/api/join/${email}/exists`,
        { withCredentials: true }
      );
      if (response.data) {
        setDuplication(-1);
        dispatch(
          setModal({
            title: "알림",
            text: "이메일이 중복입니다. 다른 이메일을 입력해주세요.",
            titleColor: "red",
          } as any)
        );
      } else {
        setDuplication(1);
        dispatch(
          setModal({
            title: "알림",
            text: "사용 가능한 이메일입니다.",
            titleColor: "lightgreen",
          } as any)
        );
      }
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
  };
  return (
    <Container>
      <Form isAnimated={isAnimated}>
        {pathname === register ? (
          <>
            <Title>회원가입</Title>
            <Label>이름 (2~10자)</Label>
            <Input
              type="text"
              id="name"
              onChange={onChange}
              value={name}
              placeholder="특수 문자, 숫자 제외"
              maxLength={10}
            ></Input>
            <Label>닉네임 (2~16자 특수문자X)</Label>
            <Input
              type="text"
              id="nickname"
              onChange={onChange}
              value={nickname}
              placeholder="특수 문자 제외"
              maxLength={10}
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
          autoComplete="on"
          onKeyPress={enterPress}
        ></Input>
        {pathname === register && (
          <DpButton
            onClick={duplicationCheck}
            bgColor={
              (duplication === 1 && "lightgreen") ||
              (duplication === -1 && "tomato")
            }
          >
            중복 확인
          </DpButton>
        )}
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
          autoComplete="on"
          onKeyPress={enterPress}
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
                navigate(login);
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
const Form = styled.form<any>`
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 5px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  &:focus {
    outline: 1px solid var(--orange) !important;
    border-color: var(--orange) !important;
    box-shadow: 0 0 7px var(--orange);
  }
`;
const DpButton = styled.div<any>`
  width: 100px;
  height: 30px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  background-color: ${(props) => props.bgColor || "white"};
  &:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(90deg);
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
