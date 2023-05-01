import { useState, useEffect } from "react";
import styles from "./AdminUser.module.css";

function AdminRoom({ reviewData, setReviewData }: any) {
  const [rooms, setRooms] = useState<any>([...reviewData]);

  const onClickDestroy = (id: string): void => {
    const answer = prompt(
      `해당 방의 아이디("${id}")를 입력하면 삭제처리가 됩니다.`
    );
    if (answer == null) alert("방 삭제를 취소하였습니다.");
    else if (answer == id) {
      setRooms((current: any) =>
        current.filter((room: any) => room.reviewId !== id)
      );
      setReviewData((current: any) =>
        current.filter((room: any) => room.reviewId !== id)
      );
    } else if (answer != id)
      alert("id값을 잘못 입력하여서 방 삭제가 취소 되었습니다.");
  };
  const sortId = (n: number): void => {
    const sortedId = [...rooms].sort((a, b) => {
      if (a.reviewId < b.reviewId) return n;
      if (a.reviewId > b.reviewId) return -n;
      return 0;
    });
    setRooms(sortedId);
  };
  const sortName = (n: number): void => {
    const sortedName = [...rooms].sort((a, b) => {
      if (a.building < b.building) return n;
      if (a.building > b.building) return -n;
      return 0;
    });
    setRooms(sortedName);
  };
  const sortScore = (n: number): void => {
    const sortedScore = [...rooms].sort((a, b) => {
      if (a.star < b.star) return n;
      if (a.star > b.star) return -n;
      return 0;
    });
    setRooms(sortedScore);
  };
  const sortaddress = (n: number): void => {
    const sortedaddress = [...rooms].sort((a, b) => {
      if (a.newAddress < b.newAddress) return n;
      if (a.newAddress > b.newAddress) return -n;
      return 0;
    });
    setRooms(sortedaddress);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>
              id
              <button onClick={() => sortId(-1)}>▲</button>
              <button onClick={() => sortId(+1)}>▼</button>
            </th>
            <th>
              이름
              <button onClick={() => sortName(-1)}>▲</button>
              <button onClick={() => sortName(1)}>▼</button>
            </th>
            <th>
              별점
              <button onClick={() => sortScore(-1)}>▲</button>
              <button onClick={() => sortScore(1)}>▼</button>
            </th>
            <th>방 주소</th>
            <th>지역 좌표</th>
            <th>삭제</th>
          </tr>
          {rooms.map((room: any) => (
            <tr key={room.reviewId}>
              <td>{room.reviewId}</td>
              <td>{room.building}</td>
              <td>{room.star}</td>
              <td>{room.newAddress}</td>
              <td>
                {room.lat},{room.lng}
              </td>
              <td>
                <button
                  style={{ background: "rgb(228, 84, 84)" }}
                  onClick={() => onClickDestroy(room.reviewId)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRoom;
