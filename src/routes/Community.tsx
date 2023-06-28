import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { apiAddress } from "value";

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "자취 필수 용품 알려드립니다..",
      content: "첫번쨰 글",
      writer: "알라",
      createdAt: new Date(),
      views: 10,
      likes: 2,
    },
    {
      id: 2,
      title: "심심하다",
      content: "두번째 글",
      writer: "만보",
      createdAt: new Date(),
      views: 6,
      likes: 2,
    },
  ]);

  useEffect(() => {
    getPostingData();
  }, []);

  const getPostingData = async () => {
    try {
      const response = await axios.get(
        `${apiAddress}/api/posting/list/?page=0`,
        {
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));

      // dispatch(setModal({ text: JSON.stringify(response) } as any));
    } catch (error: any) {
      // dispatch(setModal({ text: JSON.stringify(error) } as any));
      console.error(JSON.stringify(error));
    }
  };
  return (
    <Container>
      <Link
        to="/community/post"
        style={{ width: "80%", marginTop: "20px", textDecoration: "none" }}
      >
        <Button>글 작성</Button>
      </Link>
      {posts.map((post) => (
        <ContentBlock key={post.id}>
          <ContentText fontSize={1.3}>{post.title}</ContentText>
          <hr></hr>
          <ContentText fontSize={1.1}>
            ❤️{post.likes} 👀{post.views}
          </ContentText>
          <ContentText>
            {post.writer} &nbsp;|&nbsp; {post.createdAt.toLocaleString()}
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
  margin: 20px 0;
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
  margin: 10px 0;
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
export default Community;
