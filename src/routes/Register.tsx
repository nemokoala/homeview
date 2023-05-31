import axios from "axios";
import Modal from "components/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveSession } from "slice/userSlice";
import styled, { keyframes } from "styled-components";

function Register() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAnimated, setIsAnimated] = useState(false); //로그인 회원가입 전환시 애니메이션
  const dispatch = useDispatch<any>();
  const defaultModal = {
    //모달값 초기화 편의를 위한 기본값
    open: false,
    title: "",
    titleColor: "",
    text: "",
    btn1Text: "",
    btn2Text: "",
    btn1Color: "",
    btn2Color: "",
    btn1Func: function () {},
    btn2Func: function () {},
  };
  const [modal, setModal] = useState({
    //모달값 컨트롤을 위한 오브젝트 변수
    ...defaultModal,
  });
  defaultModal.open = true; // 처음에 바로 열리면 안되기 떄문에 나중에 open만 true 처리

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
  const confirm = () => {
    if (pathname === register) {
      if (name && nickname && email && password) {
        //회원가입
        const userData = {
          name: name,
          nickname: nickname,
          email: email,
          password: password,
        };
        axios
          .post(
            "https://api.binbinbin.site/api/join",
            {
              ...userData,
            }
            //{ withCredentials: true }
          )
          .then((response: any) => {
            //회원가입 반응
            console.log("리스폰즈DATAthen : " + response.data);
            console.log("리스폰즈STATUS : " + response.status);
            if (response.status === "201") {
              setModal({
                ...defaultModal,
                title: "알림",
                text: "회원가입이 완료되었습니다. 로그인 해주세요.",
                btn1Func: function () {
                  navigate("/api/login");
                },
              }); // 모달창 오픈
            }
            if (response.data === "중복가입") {
              setModal({
                ...defaultModal,
                title: "오류!",
                titleColor: "red",
                text: "중복 가입 입니다.",
                btn1Func: function () {
                  setEmail(""); //이메일 중복이므로 이메일 칸을 비워줌
                },
              }); //모달창  오픈
            }
          })
          .catch((error) => {
            const errorText = error.response.data.toString();
            console.error("에러 : " + error);
            console.log("리스폰즈data : " + error.response.data);
            setModal({
              ...defaultModal,
              title: "에러!",
              titleColor: "red",
              text: errorText,
            });
          });
      } else {
        setModal({
          ...defaultModal,
          text: "빈칸을 모두 채워주세요.",
        });
      }
    }
    if (pathname === login) {
      //로그인
      const userData = {
        email: email,
        password: password,
      };
      axios
        .post(
          "https://api.binbinbin.site/api/login",
          {
            ...userData,
          }
          //{ withCredentials: true }
        )
        .then((response) => {
          console.log("리스폰즈 : " + response.data);
          console.log("response.status : " + response.status);
          console.log("토큰 " + response.data.token);
          console.log("headers : " + response.headers);
          if (response.data === "로그인 실패") {
            setModal({
              ...defaultModal,
              title: "로그인 실패!",
              titleColor: "red",
              text: "이메일과 패스워드를 확인해주세요.",
            }); //모달창 오픈
          } else {
            //로그인 성공 시
            sessionStorage.setItem("session", response.data);
            dispatch(saveSession(response.data));
            navigate("/");
          }
        })
        .catch((error) => {
          const errorText = error.toString();
          console.error("에러 : " + error);
          setModal({
            ...defaultModal,
            title: "에러!",
            titleColor: "red",
            text: errorText,
          });
        });
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
          autoComplete="on"
          onKeyPress={enterPress}
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
      {modal.open && <Modal modal={modal} setModal={setModal}></Modal>}
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
