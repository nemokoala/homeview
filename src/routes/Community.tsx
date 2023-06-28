import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiAddress } from "value";

function Community() {
  const [posts, setPosts] = useState<any>([
    {
      id: 1,
      title: "글 정보 불러오는 중...",
      content: "첫번쨰 글",
      nickname: "로딩중...",
      postTime: "",
      postHits: 0,
      likes: 0,
    },
  ]);
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
          onClick={() => navigate(`/community/${post.id}`)}
        >
          <ContentText fontSize={1.3}>{post.title}</ContentText>
          <Hr></Hr>
          <ContentText fontSize={1.1}>
            ❤️{0} 👀{post.postHits}
          </ContentText>
          <ContentText>
            {post.nickname}({post.member.id}) &nbsp;|&nbsp;{" "}
            {post.postHits.toLocaleString()}
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
    transform: scale(1.03);
  }
`;
const ContentText = styled.div<any>`
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
  width: 98%;
  height: 1px;
  border: 0px;
  background-color: black;
  margin: 10px 0;
`;
export default Community;
