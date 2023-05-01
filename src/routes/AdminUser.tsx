import { useState, useEffect } from "react";
import styles from "./AdminUser.module.css";

function AdminUser() {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    const getMembers = async () => {
      const json = await (
        await fetch("http://43.200.254.30:8080/members")
      ).json();
      setUsers(json);
      console.log(json);
    };
    getMembers();
  }, []);

  const onClickDestroy = (id: any) => {
    const answer = prompt(
      `해당 유저의 아이디("${id}")를 입력하면 삭제처리가 됩니다.`
    );
    if (answer === null) alert("유저 삭제를 취소하였습니다.");
    else if (answer === id)
      setUsers((current: any) => current.filter((user: any) => user.id !== id));
    else if (answer != id)
      alert("id값을 잘못 입력하여서 유저저 삭제가 취소 되었습니다.");
  };
  const sortId = (n: any) => {
    const sortedId = [...users].sort((a, b) => {
      if (a.id < b.id) return n;
      if (a.id > b.id) return -n;
      return 0;
    });
    setUsers(sortedId);
  };
  const sortName = (n: any) => {
    const sortedName = [...users].sort((a, b) => {
      if (a.name < b.name) return n;
      if (a.name > b.name) return -n;
      return 0;
    });
    setUsers(sortedName);
  };
  const sortCreatedAt = (n: number) => {
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
              이메일
              <button onClick={() => sortCreatedAt(-1)}>▲</button>
              <button onClick={() => sortCreatedAt(1)}>▼</button>
            </th>
            <th>비밀번호</th>
            <th>관심 지역</th>
            <th>삭제</th>
          </tr>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>관심지역</td>
              {/*<td>
                {user.interestArea.map((area: any, index: any) => (
                  <span key={`${user.id}${index}_inter`}>
                    {area}
                    {user.interestArea.length - 1 != index ? "," : null}
                  </span>
                ))}
                </td>*/}
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
