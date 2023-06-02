import axios from "axios";
import Modal from "components/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSession } from "slice/userSlice";
import styled from "styled-components";

function Profile() {
  const session = useSelector((state: any) => state.userSet.session);
  const [password, setPassword] = useState("");
  const [newNickname, setNewNickname] = useState(session.nickname);
  const [newPassword, setNewPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "password") setPassword(value);
    console.log(password);
    if (id === "newNickname") setNewNickname(value);
    if (id === "newPassword") setNewPassword(value);
  };
  const enterPress = (e: any) => {
    if (e.key === "Enter") {
      confirm();
    }
  };

  const confirm = async () => {
    if (!checked) {
      //현재 비밀번호 맞나 확인
      try {
        const response = await axios.post(
          "https://api.binbinbin.site/api/checkPW",
          { password: password },
          { withCredentials: true }
        );

        if (response.data === "OK") {
          setChecked(true);
          setModal({
            ...defaultModal,
            title: "알림",
            text: "비밀번호 확인이 완료되었습니다. 수정하실 정보를 수정해 주세요.",
          });
        } else if (response.data === "EXPECTATION_FAILED") {
          setModal({
            ...defaultModal,
            title: "에러!",
            titleColor: "red",
            text: "비밀번호가 일치하지 않습니다.",
          });
        }
        console.log(JSON.stringify(response as any));
      } catch (error: any) {
        const errorText = error.response.data.toString();
        setModal({
          ...defaultModal,
          title: "에러!",
          titleColor: "red",
          text: errorText,
        });
      }
    } else if (checked) {
      //인증 후 바뀐 정보 보낼 때 함수
      const newData = {
        nickname: newNickname,
        password: newPassword === "" ? password : newPassword,
        email: session.email,
      };
      try {
        const response = await axios.post(
          "https://api.binbinbin.site/api/update",
          { ...newData },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setModal({
            ...defaultModal,
            title: "알림",
            text: "정보가 업데이트 되었습니다.",
          });
          dispatch(saveSession(JSON.parse(response.data as any)));
          navigate("/");
        }
        console.log(
          "업데이트 후 response : " + JSON.stringify(response as any)
        );
      } catch (error: any) {
        const errorText = error.tostring();
        setModal({
          ...defaultModal,
          title: "에러!",
          titleColor: "red",
          text: errorText,
        });
      }
    }
  };

  return (
    <Container>
      {checked ? (
        <Form>
          <Title>내 프로필 수정</Title>
          <Label>닉네임</Label>
          <Input
            type="text"
            id="newNickname"
            onChange={onChange}
            value={newNickname}
            placeholder={newNickname}
            autoComplete="on"
            onKeyPress={enterPress}
          ></Input>
          <Label>새 비밀번호</Label>
          <Input
            type="password"
            id="newPassword"
            onChange={onChange}
            value={newPassword}
            placeholder="빈칸일 경우 비밀번호를 그대로 유지"
            autoComplete="on"
            onKeyPress={enterPress}
          ></Input>
          <Buttons>
            <div style={{ background: "var(--orange)" }} onClick={confirm}>
              수정 확인
            </div>
            <div onClick={() => navigate("/")}>취소</div>
          </Buttons>
        </Form>
      ) : (
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
            <div style={{ background: "var(--orange)" }} onClick={confirm}>
              비밀번호 확인
            </div>
            <div onClick={() => navigate("/")}>취소</div>
          </Buttons>
        </Form>
      )}
      {modal.open && <Modal modal={modal} setModal={setModal}></Modal>}
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
