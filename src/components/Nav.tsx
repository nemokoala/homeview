import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { saveSession } from "slice/userSlice";
import Modal from "./Modal";
function Nav({ searchTerm, setSearchTerm }: any) {
  const [hamOn, setHamOn] = useState<Boolean>(false);
  const toggleHam = () => {
    setHamOn((prev) => !prev);
  };
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
  const session = useSelector((state: any) => state.userSet.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("https://api.binbinbin.site/api/logout", { withCredentials: true })
      .then((response) => {
        sessionStorage.removeItem("session");
        dispatch(saveSession("" as any));
        if (response.status === 200)
          setModal({
            ...defaultModal,
            text: "로그아웃 되었습니다.",
          });
      })
      .catch((error) => {
        const errorText = error.toString();
        setModal({
          ...defaultModal,
          title: "에러!",
          titleColor: "red",
          text: errorText,
        });
      });
  };
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">
          <img
            className={styles.logo}
            src="https://icon-library.com/images/white-home-icon-png/white-home-icon-png-21.jpg"
            alt="logo"
          />
        </Link>
        <ul className={styles.ul}>
          <Link to="/">
            <li>리뷰 지도</li>
          </Link>
          <Link to="/review">
            <li>리뷰 목록</li>
          </Link>
          <Link to="/reviewfac">
            <li>리뷰 작성</li>
          </Link>
          <Link to="/admin">
            <li>관리 페이지</li>
          </Link>
        </ul>
        <input
          className={styles.input}
          placeholder="검색"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            navigate("/review");
          }}
        />
        <div className={styles.inputX} onClick={() => setSearchTerm("")}>
          x
        </div>
        <div className={styles.buttons}>
          {session ? (
            <>
              <button className={styles.loginBtn} onClick={logout}>
                로그아웃
              </button>
              <button className={styles.registerBtn}>프로필</button>
            </>
          ) : (
            <>
              <Link to="/api/login">
                <button className={styles.loginBtn}>로그인</button>
              </Link>
              <Link to="/api/join">
                <button className={styles.registerBtn}>회원가입</button>
              </Link>
            </>
          )}
        </div>
        <div
          className={`${styles.hamburger} ${hamOn && styles.active}`}
          onClick={toggleHam}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
            alt="hamburger"
            width="100%"
          />
        </div>
      </nav>
      <div className={`${styles.menu} ${hamOn === true && styles.active}`}>
        <ul className={styles.sideul}>
          <Link to="/" onClick={() => setHamOn(false)}>
            <li>리뷰 지도</li>
          </Link>
          <Link to="/review" onClick={() => setHamOn(false)}>
            <li>리뷰 목록</li>
          </Link>
          <Link to="/reviewfac" onClick={() => setHamOn(false)}>
            <li>리뷰 작성</li>
          </Link>
          <Link to="/admin" onClick={() => setHamOn(false)}>
            <li>관리 페이지</li>
          </Link>
        </ul>
      </div>
      {modal.open && <Modal modal={modal} setModal={setModal}></Modal>}
    </>
  );
}

export default Nav;
