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
      const response = await axios.get(`${apiAddress}/api/posting/?page=0`);
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
      <TableContainer>
        <thead>
          <tr>
            <TableHeader>글번호</TableHeader>
            <TableHeader>제목</TableHeader>
            <TableHeader>작성자</TableHeader>
            <TableHeader>작성일</TableHeader>
            <TableHeader>조회</TableHeader>
            <TableHeader>추천</TableHeader>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostTr key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.writer}</TableCell>
              <TableCell>{post.createdAt.toLocaleString()}</TableCell>
              <TableCell>{post.views}</TableCell>
              <TableCell>{post.likes}</TableCell>
            </PostTr>
          ))}
        </tbody>
      </TableContainer>
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

const TableContainer = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin-top: 30px;
`;

const TableHeader = styled.th`
  background-color: #c3ec53;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  &:nth-child(1) {
    border-radius: 20px 0 0 20px;
  }
  &:nth-last-child(1) {
    border-radius: 0 20px 20px 0;
  }
`;
const PostTr = styled.tr`
  &:hover > td {
    cursor: pointer;
    color: #ca55ca;
  }
`;
const TableCell = styled.td`
  font-size: 16px;
  text-align: center;
  padding: 10px;
  border: 0px solid #c5c5c5;
  &:nth-child(1) {
    border-radius: 20px 0 0 20px;
  }
  &:nth-last-child(1) {
    border-radius: 0 20px 20px 0;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  background-color: var(--orange);
  border-radius: 20px;
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
