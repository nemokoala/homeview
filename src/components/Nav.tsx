import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
function Nav() {
  return (
    <nav className={styles.nav}>
      <img
        className={styles.logo}
        src="https://icon-library.com/images/white-home-icon-png/white-home-icon-png-21.jpg"
        alt="logo"
      />
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
    </nav>
  );
}

export default Nav;
