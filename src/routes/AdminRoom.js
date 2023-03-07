import { useState, useEffect } from "react";
import styles from "./AdminUser.module.css";
function AdminRoom() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    setRooms([
      {
        id: 300,
        name: "올리브",
        totalScore: 10,
        address: "고봉로34길 35",
        coordinate: { x: 35.2323, y: 125.5312 },
      },

      {
        id: 301,
        name: "네모빌라",
        totalScore: 9,
        address: "고봉로34길 35",
        coordinate: { x: 35.7323, y: 125.4312 },
      },
      {
        id: 302,
        name: "세모원룸",
        totalScore: 8,
        address: "고봉로34길 35",
        coordinate: { x: 35.6623, y: 125.1312 },
      },
    ]);

    console.log(rooms);
  }, []);
  const onClickDestroy = (id) => {
    const answer = prompt(
      `해당 방의 아이디("${id}")를 입력하면 삭제처리가 됩니다.`
    );
    if (answer == null) alert("유저 삭제를 취소하였습니다.");
    else if (answer == id)
      setRooms((current) => current.filter((room) => room.id !== id));
    else if (answer != id)
      alert("id값을 잘못 입력하여서 유저저 삭제가 취소 되었습니다.");
  };
  const sortId = (n) => {
    const sortedId = [...rooms].sort((a, b) => {
      if (a.id < b.id) return n;
      if (a.id > b.id) return -n;
      return 0;
    });
    setRooms(sortedId);
  };
  const sortName = (n) => {
    const sortedName = [...rooms].sort((a, b) => {
      if (a.name < b.name) return n;
      if (a.name > b.name) return -n;
      return 0;
    });
    setRooms(sortedName);
  };
  const sortScore = (n) => {
    const sortedScore = [...rooms].sort((a, b) => {
      if (a.totalScore < b.totalScore) return n;
      if (a.totalScore > b.totalScore) return -n;
      return 0;
    });
    setRooms(sortedScore);
  };
  const sortaddress = (n) => {
    const sortedaddress = [...rooms].sort((a, b) => {
      if (a.address < b.address) return n;
      if (a.address > b.address) return -n;
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
              총점
              <button onClick={() => sortScore(-1)}>▲</button>
              <button onClick={() => sortScore(1)}>▼</button>
            </th>
            <th>방 주소</th>
            <th>지역 좌표</th>
            <th>삭제</th>
          </tr>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>{room.totalScore}</td>
              <td>{room.address}</td>
              <td>
                {room.coordinate.x},{room.coordinate.y}
              </td>
              <td>
                <button
                  style={{ background: "rgb(228, 84, 84)" }}
                  onClick={() => onClickDestroy(room.id)}
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
