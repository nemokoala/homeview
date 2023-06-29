import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiAddress } from "value";

function Community() {
  const [posts, setPosts] = useState<any>([
    {
      post_id: 1,
      title: "글 정보 불러오는 중...",
      content: "첫번쨰 글",
      nickname: "로딩중...",
      postTime: "",
      postHits: 0,
      likes: 0,
      member: {
        id: 0,
      },
    },
  ]);
  const session = useSelector((state: any) => state.userSet.session);
  const navigate = useNavigate();
  useEffect(() => {
    getPostingData();
  }, []);

  const getPostingData = async () => {
    try {
      const response = await axios.get(`${apiAddress}/api/posting/list`);
      console.log("Community.tsx(getPostingData): " + JSON.stringify(response));
      setPosts(response.data);
      // dispatch(setModal({ text: JSON.stringify(response) } as any));
    } catch (error: any) {
      // dispatch(setModal({ text: JSON.stringify(error) } as any));
      console.error("Community.tsx(getPostingData): " + JSON.stringify(error));
    }
  };

  const deletePostingData = async (event: any, id: number) => {
    event.stopPropagation();
    const answer = prompt(
      `해당 게시글의 아이디("${id}")를 입력하면 삭제처리가 됩니다. `
    );
    if (answer === null) {
      alert("게시글 삭제를 취소하였습니다.");
      return;
    } else if (parseInt(answer) !== id) {
      alert("id를 잘못 입력하였습니다.");
      return;
    } else if (parseInt(answer) === id) alert("게시글을 삭제합니다.");
    try {
      const response = await axios.delete(`${apiAddress}/admin/posting/${id}`, {
        withCredentials: true,
      });
      console.log(
        "Community.tsx(deletePostingData): " + JSON.stringify(response)
      );
      // dispatch(setModal({ text: JSON.stringify(response) } as any));
    } catch (error: any) {
      // dispatch(setModal({ text: JSON.stringify(error) } as any));
      console.error(
        "Community.tsx(deletePostingData): " + JSON.stringify(error)
      );
    }
  };
  return (
    <Container>
      <Link
        to="/community/post"
        style={{ width: "80%", margin: "20px 0", textDecoration: "none" }}
      >
        <Button>글 작성</Button>
      </Link>
      {posts.map((post: any) => (
        <ContentBlock
          key={post.post_id}
          onClick={() => navigate(`/community/${post.post_id}`)}
        >
          <ContentText fontSize={1.3}>
            {post.title}{" "}
            {session.role === "ADMIN" && (
              <DeleteBtn
                onClick={(event: any) => deletePostingData(event, post.post_id)}
              >
                삭제
              </DeleteBtn>
            )}
          </ContentText>
          <Hr />
          <ContentText fontSize={1.1}>
            ❤️{0} 👀{post.postHits}
          </ContentText>
          <ContentText>
            {post.nickname}({post.member.id}) &nbsp;|&nbsp; {post.postTime}
          </ContentText>
        </ContentBlock>
      ))}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--navHeight));
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentBlock = styled.div`
  width: 90%;
  margin: 15px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 20px;
  border-radius: 20px;
  transition: all 0.7s;
  &:hover {
    background-color: rgb(255, 241, 195);
    cursor: pointer;
  }
`;
const ContentText = styled.div<any>`
  display: flex;
  align-items: center;
  height: auto;
  font-size: ${(props) => props.fontSize + "rem"};
  color: ${(props) => props.fontColor};
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  margin: 15px 0;
  background-color: var(--orange);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  border: 0px;
  border-radius: 20px;
  transition: all 0.7s;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(90deg);
  }
  &:focus {
    color: orange;
    border: 2px solid orange !important;
  }
`;

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  border: 0px;
  background-color: black;
  margin: 10px 0;
`;

const DeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  color: white;
  background-color: tomato;
  margin-left: auto;
  &:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(90deg);
  }
`;

export default Community;
