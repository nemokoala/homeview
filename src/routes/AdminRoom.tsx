import { useState, useEffect } from "react";
import styles from "./AdminUser.module.css";
import { apiAddress } from "value";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setModal } from "slice/modalSlice";
import styled from "styled-components";

function AdminRoom() {
  const [rooms, setRooms] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const response = await axios.get(`${apiAddress}/admin/room/list`, {
        withCredentials: true,
      });
      console.log(JSON.stringify(response));
      setRooms(response.data);
    } catch (error: any) {
      dispatch(
        setModal({
          title: "에러",
          titleColor: "red",
          text: JSON.stringify(error),
        } as any)
      );
    }
  };

  const onClickDestroy = async (id: number) => {
    const answer = prompt(
      `해당 방의 아이디("${id}")를 입력하면 삭제처리가 됩니다.`
    );
    if (answer == null) alert("방 삭제를 취소하였습니다.");
    else if (parseInt(answer) === id) {
      try {
        const response = await axios.delete(`${apiAddress}/admin/room/${id}`, {
          withCredentials: true,
        });
        getRooms();
        alert("삭제가 완료되었습니다.");
        console.log(
          "AdminRoom.tsx(onClickDestroy): " + JSON.stringify(response)
        );
      } catch (error: any) {
        dispatch(
          setModal({
            title: "에러",
            titleColor: "red",
            text: JSON.stringify(error),
          } as any)
        );
        console.error(
          "AdminRoom.tsx(onClickDestroy): " + JSON.stringify(error)
        );
      }
    } else if (parseInt(answer) !== id)
      alert("id값을 잘못 입력하여서 방 삭제가 취소 되었습니다.");
  };

  const sortId = (n: number): void => {
    const sortedId = [...rooms].sort((a, b) => {
      if (a.room_id < b.room_id) return n;
      if (a.room_id > b.room_id) return -n;
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
  const sortSido = (n: number): void => {
    const sortedScore = [...rooms].sort((a, b) => {
      if (a.sido < b.sido) return n;
      if (a.sido > b.sido) return -n;
      return 0;
    });
    setRooms(sortedScore);
  };
  const sortaddress = (n: number): void => {
    const sortedaddress = [...rooms].sort((a, b) => {
      if (a.new_address < b.new_address) return n;
      if (a.new_address > b.new_address) return -n;
      return 0;
    });
    setRooms(sortedaddress);
  };

  return (
    <Container>
      <Table>
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
              시도 | 시군구 | 동<button onClick={() => sortSido(-1)}>▲</button>
              <button onClick={() => sortSido(1)}>▼</button>
            </th>
            <th>
              방 주소<button onClick={() => sortaddress(-1)}>▲</button>
              <button onClick={() => sortaddress(1)}>▼</button>
            </th>
            <th>지역 좌표</th>
            <th>삭제</th>
          </tr>
          {rooms.map((room: any) => (
            <tr key={room.room_id}>
              <td>{room.room_id}</td>
              <td>{room.building}</td>
              <td>
                {room.sido} | {room.sigungu} | {room.dong}
              </td>
              <td>
                {room.new_address} | {room.old_address}
              </td>
              <td>
                {room.latitude.toFixed(4)},{room.longitude.toFixed(4)}
              </td>
              <td>
                <button
                  style={{ background: "rgb(228, 84, 84)" }}
                  onClick={() => onClickDestroy(room.room_id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminRoom;

const Container = styled.div`
  width: 100%;
  min-width: 850px;
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  border: 1px solid black;
  background-color: rgb(254, 255, 220);
  width: calc(100% - 20px);
  margin: 30px 0;
  & * {
    padding: 5px;
    text-align: center;
  }
  & th {
    border: 1px solid black;
  }
  & td {
    border: 1px solid black;
    margin: 1;
  }
  & td {
    border: 1px solid black;
    margin: 1;
  }
  & td:nth-child(1) {
    width: 50px;
  }
  & td:nth-child(2) {
    width: 150px;
  }
  & td:nth-child(3) {
    width: 150px;
  }
  & td:nth-child(5) {
    width: 150px;
  }
  & td:nth-child(6) {
    width: 50px;
  }
  & tr:nth-child(odd) {
    background-color: rgb(248, 250, 195);
  }
  & button {
    border-radius: 5px;
    border: 0px;
    color: white;
    background-color: rgb(88, 107, 219);
    margin: 0 3px;
    transition: all 0.7s;
  }
  & button:hover {
    cursor: pointer;
    background-color: rgb(117, 134, 228);
  }
`;
