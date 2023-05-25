import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import { useState } from "react";
function Nav({ searchTerm, setSearchTerm }: any) {
  const [hamOn, setHamOn] = useState<Boolean>(false);
  const toggleHam = () => {
    setHamOn((prev) => !prev);
  };
  const navigate = useNavigate();
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
          <Link to="/api/login">
            <button className={styles.loginBtn}>로그인</button>
          </Link>
          <Link to="/api/join">
            <button className={styles.registerBtn}>회원가입</button>
          </Link>
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
    </>
  );
}

export default Nav;
