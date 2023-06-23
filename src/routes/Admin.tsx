import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import AdminRoom from "./AdminRoom";
import AdminUser from "./AdminUser";
import { useDispatch } from "react-redux";
import { setModal } from "slice/modalSlice";
import axios from "axios";
import { apiAddress } from "value";
function Admin({ reviewData, setReviewData }: any) {
  const [location, setLocation] = useState("user");
  const [unlock, setUnlock] = useState(false);
  const [members, setMembers] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    adminCheck();
  }, []);
  const adminCheck = async () => {
    try {
      const response = await axios.get(`${apiAddress}/admin/healthcheck`, {
        withCredentials: true,
      });
      console.log(JSON.stringify(response));
      if (response.data) {
        dispatch(
          setModal({
            title: "알림",
            text: JSON.stringify(response),
            titleColor: "red",
          } as any)
        );
      } else {
        dispatch(
          setModal({
            title: "알림",
            text: JSON.stringify(response),
            titleColor: "lightgreen",
          } as any)
        );
      }
    } catch (error: any) {
      const errorText = JSON.stringify(error);
      console.error("에러 : " + error);
      dispatch(
        setModal({
          title: "에러!",
          titleColor: "red",
          text: errorText,
        } as any)
      );
    }
  };
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <div
          className={location === "user" ? styles.divOn : styles.divOff}
          onClick={() => setLocation("user")}
        >
          유저 관리
        </div>
        <div
          className={location === "room" ? styles.divOn : styles.divOff}
          onClick={() => setLocation("room")}
        >
          방 관리
        </div>
        <div onClick={() => console.log(members)}>리뷰 관리</div>
        <div>게시물 관리</div>
        <div>댓글 관리</div>
      </aside>
      <section className={styles.section}>
        {location === "user" ? <AdminUser /> : null}
        {location === "room" ? (
          <AdminRoom reviewData={reviewData} setReviewData={setReviewData} />
        ) : null}
      </section>
    </div>
  );
}
export default Admin;
