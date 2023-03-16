import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useEffect, useState } from "react";
function Nav() {
  const [hamOn, setHamOn] = useState<Boolean>(false);
  const toggleHam = () => {
    setHamOn((prev) => !prev);
  };
  return (
    <>
      <div className={styles.dummyNav}></div>
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
            <li>Home</li>
          </Link>
          <Link to="/review">
            <li>리뷰보기</li>
          </Link>
          <Link to="/reviewfac">
            <li>리뷰작성</li>
          </Link>
          <Link to="/admin">
            <li>Admin</li>
          </Link>
        </ul>
        <input className={styles.input} placeholder="검색" />
        <div className={styles.buttons}>
          <button>로그인</button>
          <button>회원가입</button>
        </div>
        <div
          className={`${styles.hamburger} ${hamOn && styles.active}`}
          onClick={toggleHam}
        >
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/hamburger-menu-icon.png"
            alt="hamburger"
            width="100%"
          />
        </div>
      </nav>
      <div className={`${styles.menu} ${hamOn === true && styles.active}`}>
        <ul className={styles.sideul}>
          <Link to="/" onClick={() => setHamOn(false)}>
            <li>Home</li>
          </Link>
          <Link to="/review" onClick={() => setHamOn(false)}>
            <li>리뷰보기</li>
          </Link>
          <Link to="/reviewfac" onClick={() => setHamOn(false)}>
            <li>리뷰작성</li>
          </Link>
          <Link to="/admin" onClick={() => setHamOn(false)}>
            <li>Admin</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Nav;
