import { useState, useEffect } from "react";
import styles from "./AdminUser.module.css";
function AdminUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers([
      {
        id: 0,
        name: "코알라",
        createdAt: "20230228",
        recentConnect: "202302281000",
        interestArea: ["서울", "인천", "부산"],
      },

      {
        id: 1,
        name: "김만보",
        createdAt: "20230328",
        recentConnect: "202304261020",
        interestArea: ["세종", "충주"],
      },
      {
        id: 2,
        name: "코알순",
        createdAt: "20230528",
        recentConnect: "202302281000",
        interestArea: ["대전", "대구", "일산"],
      },
      {
        id: 3,
        name: "바나나",
        createdAt: "20230725",
        recentConnect: "202302281104",
        interestArea: ["익산", "전주"],
      },
    ]);

    console.log(users);
  }, []);
  const onClickDestroy = (id) => {
    const answer = prompt(
      `해당 유저의 아이디("${id}")를 입력하면 삭제처리가 됩니다.`
    );
    if (answer == null) alert("유저 삭제를 취소하였습니다.");
    else if (answer == id)
      setUsers((current) => current.filter((user) => user.id !== id));
    else if (answer != id)
      alert("id값을 잘못 입력하여서 유저저 삭제가 취소 되었습니다.");
  };
  const sortId = (n) => {
    const sortedId = [...users].sort((a, b) => {
      if (a.id < b.id) return n;
      if (a.id > b.id) return -n;
      return 0;
    });
    setUsers(sortedId);
  };
  const sortName = (n) => {
    const sortedName = [...users].sort((a, b) => {
      if (a.name < b.name) return n;
      if (a.name > b.name) return -n;
      return 0;
    });
    setUsers(sortedName);
  };
  const sortCreatedAt = (n) => {
    const sortedCreatedAt = [...users].sort((a, b) => {
      if (a.createdAt < b.createdAt) return n;
      if (a.createdAt > b.createdAt) return -n;
      return 0;
    });
    setUsers(sortedCreatedAt);
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
              생성 날짜
              <button onClick={() => sortCreatedAt(-1)}>▲</button>
              <button onClick={() => sortCreatedAt(1)}>▼</button>
            </th>
            <th>마지막 접속</th>
            <th>관심 지역</th>
            <th>삭제</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.createdAt}</td>
              <td>{user.recentConnect}</td>
              <td>
                {user.interestArea.map((area, index) => (
                  <span key={`${user.id}${index}_inter`}>
                    {area}
                    {user.interestArea.length - 1 != index ? "," : null}
                  </span>
                ))}
              </td>
              <td>
                <button
                  style={{ background: "rgb(228, 84, 84)" }}
                  onClick={() => onClickDestroy(user.id)}
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

export default AdminUser;
