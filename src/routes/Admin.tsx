import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import AdminRoom from "./AdminRoom";
import AdminUser from "./AdminUser";
function Admin() {
  const [location, setLocation] = useState("user");
  const [unlock, setUnlock] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const password = 1234;
    const answer: any = prompt(`패스워드를 입력하세요.`);

    if (answer == password) setUnlock(true);
    else if (answer != password) navigate("/");
  }, []);
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <div
          className={location == "user" ? styles.divOn : styles.divOff}
          onClick={() => setLocation("user")}
        >
          유저 관리
        </div>
        <div
          className={location == "room" ? styles.divOn : styles.divOff}
          onClick={() => setLocation("room")}
        >
          방 관리
        </div>
        <div>리뷰 관리</div>
        <div>게시물 관리</div>
        <div>댓글 관리</div>
      </aside>
      <section className={styles.section}>
        {location == "user" ? <AdminUser /> : null}
        {location == "room" ? <AdminRoom /> : null}
      </section>
    </div>
  );
}
export default Admin;
