import { useState, useEffect } from "react";
import styles from "./AdminUser.module.css";
import { apiAddress } from "value";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setModal } from "slice/modalSlice";
import styled from "styled-components";

function AdminComment() {
  const [comments, setComments] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const response = await axios.get(`${apiAddress}/admin/comment/list`, {
        withCredentials: true,
      });
      console.log(JSON.stringify(response));
      setComments(response.data);
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
      `해당 댓글 아이디("${id}")를 입력하면 삭제처리가 됩니다.`
    );
    if (answer == null) alert("댓글 삭제를 취소하였습니다.");
    else if (parseInt(answer) === id) {
      try {
        const response = await axios.delete(
          `${apiAddress}/admin/comment/${id}`,
          {
            withCredentials: true,
          }
        );
        getComments();
        alert("삭제가 완료되었습니다.");
        console.log(
          "AdminComment.tsx(onClickDestroy): " + JSON.stringify(response)
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
          "AdminComment.tsx(onClickDestroy): " + JSON.stringify(error)
        );
      }
    } else if (parseInt(answer) !== id)
      alert("id값을 잘못 입력하여서 댓글 삭제가 취소 되었습니다.");
  };

  const sortId = (n: number): void => {
    const sortedId = [...comments].sort((a, b) => {
      if (a.commentId < b.commentId) return n;
      if (a.commentId > b.commentId) return -n;
      return 0;
    });
    setComments(sortedId);
  };
  const sortPostId = (n: number): void => {
    const sortedName = [...comments].sort((a, b) => {
      if (a.postId < b.postId) return n;
      if (a.postId > b.postId) return -n;
      return 0;
    });
    setComments(sortedName);
  };
  const sortMemberId = (n: number): void => {
    const sortedScore = [...comments].sort((a, b) => {
      if (a.memberId < b.memberId) return n;
      if (a.memberId > b.memberId) return -n;
      return 0;
    });
    setComments(sortedScore);
  };
  const sortMemberNickName = (n: number): void => {
    const sortedaddress = [...comments].sort((a, b) => {
      if (a.memberNickName < b.memberNickName) return n;
      if (a.memberNickName > b.memberNickName) return -n;
      return 0;
    });
    setComments(sortedaddress);
  };
  const sortTime = (n: number): void => {
    const sortedaddress = [...comments].sort((a, b) => {
      if (changeDate(a.commentTime) < changeDate(b.commentTime)) return n;
      if (changeDate(a.commentTime) > changeDate(b.commentTime)) return -n;
      return 0;
    });
    setComments(sortedaddress);
  };

  const changeDate = (time: any) => {
    const dateObj = new Date(time);
    const changedTime =
      dateObj.toLocaleDateString("ko-KR") +
      " " +
      dateObj.toLocaleTimeString("ko-KR", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
    return changedTime;
  };

  return (
    <Container>
      <Table>
        <tbody>
          <tr>
            <th>
              댓글 id
              <br />
              <button onClick={() => sortId(-1)}>▲</button>
              <button onClick={() => sortId(+1)}>▼</button>
            </th>
            <th>
              글 id
              <br />
              <button onClick={() => sortPostId(-1)}>▲</button>
              <button onClick={() => sortPostId(1)}>▼</button>
            </th>
            <th>
              유저 id
              <br />
              <button onClick={() => sortMemberId(-1)}>▲</button>
              <button onClick={() => sortMemberId(1)}>▼</button>
            </th>
            <th>
              유저 닉네임
              <br />
              <button onClick={() => sortMemberNickName(-1)}>▲</button>
              <button onClick={() => sortMemberNickName(1)}>▼</button>
            </th>
            <th>댓글 내용</th>
            <th>
              작성 시간
              <br />
              <button onClick={() => sortTime(-1)}>▲</button>
              <button onClick={() => sortTime(1)}>▼</button>
            </th>
            <th>삭제</th>
          </tr>
          {comments.map((comment: any) => (
            <tr key={comment.commentId}>
              <td>{comment.commentId}</td>
              <td>{comment.postId}</td>
              <td>{comment.memberId}</td>
              <td>{comment.memberNickName}</td>
              <td>{comment.content}</td>
              <td>{changeDate(comment.commentTime)}</td>
              <td>
                <button
                  style={{ background: "rgb(228, 84, 84)" }}
                  onClick={() => onClickDestroy(comment.commentId)}
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

export default AdminComment;

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
    width: 80px;
  }
  & td:nth-child(2) {
    width: 80px;
  }
  & td:nth-child(3) {
    width: 80px;
  }
  & td:nth-child(4) {
    width: 150px;
  }
  & td:nth-child(7) {
    width: 65px;
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
