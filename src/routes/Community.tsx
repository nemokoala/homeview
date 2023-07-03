import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiAddress } from "value";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Community() {
  const [posts, setPosts] = useState<any>([
    {
      postId: 1,
      title: "글 정보 불러오는 중...",
      content: "첫번쨰 글",
      memberNickname: "로딩중...",
      postTime: "",
      postHits: 0,
      postLikes: 0,
      memberId: 0,
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchTemp, setSearchTemp] = useState([]);
  const [animationParent] = useAutoAnimate();
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
      setSearchTemp(response.data);
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
      getPostingData();
    } catch (error: any) {
      console.error(
        "Community.tsx(deletePostingData): " + JSON.stringify(error)
      );
    }
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

  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "search") setSearch(value);
  };

  const searching = async () => {
    try {
      const response = await axios.get(
        `${apiAddress}/api/posting/search?keyword=${search}&page=0`
      );
      console.log("Community.tsx(searching): " + JSON.stringify(response));
      if (response.data.content.length === 0)
        setSearchResult("검색 결과가 없습니다.");
      else {
        setPosts(response.data.content);
        setSearchResult(`"${search}"에 대한 검색 결과`);
      }
    } catch (error: any) {
      console.error("Community.tsx(searching): " + JSON.stringify(error));
    }
  };

  const deleteSearch = () => {
    setSearchResult("");
    setPosts(searchTemp);
  };

  const enterPress = (e: any) => {
    if (e.key === "Enter") searching();
  };
  return (
    <Container>
      <Link
        to="/community/post"
        style={{ width: "80%", margin: "20px 0", textDecoration: "none" }}
      >
        <Button>글 작성</Button>
      </Link>
      <SearchContainer>
        <Input
          id="search"
          onChange={onChange}
          onKeyUp={enterPress}
          placeholder="게시글 제목 검색"
        />
        <div onClick={searching}>검색</div>
      </SearchContainer>
      {searchResult && (
        <SearchResult ref={animationParent} onClick={deleteSearch}>
          {searchResult}
          <div>&nbsp;&nbsp;x</div>
        </SearchResult>
      )}
      {posts.map((post: any) => (
        <ContentBlock
          key={post.postId}
          onClick={() => navigate(`/community/${post.postId}`)}
        >
          <ContentText fontSize={1.3}>
            {post.title}{" "}
            {session.role === "ADMIN" && (
              <DeleteBtn
                onClick={(event: any) => deletePostingData(event, post.postId)}
              >
                삭제
              </DeleteBtn>
            )}
          </ContentText>
          <Hr />
          <ContentText fontSize={1.1}>
            ❤️{post.postLikes} 👀{post.postHits}
          </ContentText>
          <ContentText>
            {post.memberNickname}#{post.memberId} &nbsp;|&nbsp;{" "}
            {changeDate(post.postTime)}
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
const SearchContainer = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  & div {
    width: 90px;
    height: 50px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgreen;
    transition: all 0.7s;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 15px 3px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  & div:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  & div:active {
    filter: hue-rotate(90deg);
  }
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: 15px;
  border: 0px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.712);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 15px 3px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  &:focus {
    outline: 1px solid var(--orange) !important;
    border-color: var(--orange) !important;
    box-shadow: 0 0 7px var(--orange);
  }
`;
const SearchResult = styled.div`
  display: flex;
  font-size: 1.3rem;
  margin: 5px auto;
  transition: 0.5s all;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px 4px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  & div {
    display: flex;
    align-items: center;
    transition: 0.5s all;
  }
  &:hover {
    cursor: pointer;
    background-color: tomato;
    color: white;
  }
  &:hover div {
    cursor: pointer;
    color: white;
  }
`;
export default Community;
