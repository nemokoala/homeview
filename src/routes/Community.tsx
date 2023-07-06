import axios from "axios";
import Category from "components/Category";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setModal } from "slice/modalSlice";
import styled, { keyframes } from "styled-components";
import { apiAddress } from "value";

function Community() {
  const [posts, setPosts] = useState<any>({
    content: [
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
    ],
    totalPages: 25,
  });
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchTemp, setSearchTemp] = useState([]);
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSet, setPageSet] = useState({ now: 1, max: 1 });
  const session = useSelector((state: any) => state.userSet.session);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getPostingData();
  }, []);

  const getPostingData = async () => {
    try {
      const response = await axios.get(
        `${apiAddress}/api/posting/${category}/?page=${page}`
      );
      console.log("Community.tsx(getPostingData): " + JSON.stringify(response));
      setPosts(response.data);
      setPageSet({ now: 1, max: Math.ceil(response.data.totalPages / 5) });
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
    if (!search) return;
    try {
      const response = await axios.get(
        `${apiAddress}/api/posting/search/${category}?keyword=${search}&page=0`
      );
      console.log("Community.tsx(searching): " + JSON.stringify(response));
      let categoryName = getCategoryName(category);

      if (response.status === 203) {
        dispatch(setModal({ text: "카테고리 범위를 벗어났습니다." } as any));
      }
      if (response.data.content.length === 0) {
        setPosts([]);
        setSearchResult(
          `${search}에 대한 검색 결과가 없습니다.\n[게시판 종류: "${categoryName}"]`
        );
      } else {
        setPosts(response.data.content);
        setSearchResult(
          `"${search}"에 대한 검색 결과.\n[게시판 종류: "${categoryName}"]`
        );
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
  const getCategoryName = (categoryId: any) => {
    switch (categoryId) {
      case 0:
        return "전체";
      case 1:
        return "자유";
      case 2:
        return "질문";
      case 3:
        return "유머";
      case 4:
        return "정보";
    }
  };
  useEffect(() => {
    if (!search) getPostingData();
    else if (search) searching();
  }, [category]);
  return (
    <Container>
      <Link
        to="/community/post"
        style={{ width: "90%", margin: "10px 0", textDecoration: "none" }}
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
        <SearchResult onClick={deleteSearch}>
          {searchResult}
          <div>&nbsp;&nbsp;x</div>
        </SearchResult>
      )}
      <ContentBlock
        style={{
          padding: "0 0 20px 0",
          backgroundColor: "white",
        }}
      >
        <CategoryContainer>
          <Category category={category} setCategory={setCategory} />
        </CategoryContainer>
      </ContentBlock>
      <PageBlock>
        <div
          onClick={() => {
            if (pageSet.now > 1)
              setPageSet((prev) => ({ ...prev, now: prev.now - 1 }));
          }}
        >
          ◀
        </div>
        {[...Array(posts.totalPages > 5 ? 5 : posts.totalPages)].map(
          (page: any, index) => (
            <div
              onClick={() => {
                setPage(index + (pageSet.now - 1) * 5);
                getPostingData();
              }}
            >
              {index + (pageSet.now - 1) * 5 + 1}
            </div>
          )
        )}
        <div
          onClick={() => {
            if (pageSet.now < pageSet.max)
              setPageSet((prev) => ({ ...prev, now: prev.now + 1 }));
          }}
        >
          ▶
        </div>
      </PageBlock>
      {posts.content.map((post: any) => (
        <ContentBlock
          key={post.postId}
          onClick={() => navigate(`/community/${post.postId}`)}
        >
          <ContentText
            fontSize={1.3}
            fontColor={session.id === post.memberId && "rgb(86, 66, 177)"}
          >
            <span style={{ color: "gray" }}>
              [{getCategoryName(post.categoryId)}]
            </span>
            &nbsp;
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
          <ContentText
            fontColor={session.id === post.memberId && "rgb(86, 66, 177)"}
          >
            {post.memberNickname}#{post.memberId} &nbsp;| &nbsp;{" "}
            <span style={{ color: "gray" }}>{changeDate(post.postTime)}</span>
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
  background: linear-gradient(to bottom, white, #def4ff);
`;
const fadein = keyframes`
  from {
    opacity: 0;
    transform:translateY(-25px);
  }
  to {
    opacity: 1;
    transform:translateY(0);
  }
`;

const ContentBlock = styled.div`
  width: 90%;
  margin: 15px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 20px;
  border-radius: 20px;
  transition: all 0.7s;
  animation: ${fadein} 0.5s ease-out;
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
  margin: 20px 0;
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
    filter: contrast(130%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(340deg);
  }
  &:focus {
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
  width: 90%;
  height: 50px;
  display: flex;
  gap: 14px;
  margin-bottom: 25px;
  & div {
    width: 90px;
    height: 50px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgreen;
    transition: all 0.7s;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
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
  padding: 10px 14px;
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
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px 4px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  white-space: pre-wrap;
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
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const PageBlock = styled.div`
  width: 90%;
  margin: 15px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.7s;
  animation: ${fadein} 0.5s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & div {
    width: 50px;
    flex-grow: 1;
    font-size: 1.3rem;
    padding: 10px 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div:hover {
    background-color: rgb(255, 241, 195);
    cursor: pointer;
  }
`;
export default Community;

const json = {
  data: {
    content: [
      {
        postId: 21,
        member: {
          id: 5,
          name: "만보",
          nickname: "만보",
          email: "m1@naver.com",
          password:
            "$2a$10$vK9dDtRURea0FAvtOSluIuV5MpiJuK6r2VkUGX8gxGJ9X1Mepew42",
          role: "ROLE_MEMBER",
        },
        category: { categoryId: 4, name: "정보" },
        title: "레몬 하나에는 레몬4개 분량의 비타민이 들어있다.",
        content: "https://www.humorworld.net/?p=112320<br/>링크 테스트",
        postTime: "2023-07-06T07:08:19.241+00:00",
        postHits: 4,
        postLikes: 1,
      },
      {
        postId: 20,
        member: {
          id: 1,
          name: "박재연",
          nickname: "어드민",
          email: "admin@naver.com",
          password:
            "$2a$10$bZJ8UvBG2w6fnsK7t/L1quhX0ojYnbB6c0acGkSOsdMm27BAsFR2q",
          role: "ADMIN",
        },
        category: { categoryId: 2, name: "질문" },
        title: "질문",
        content: "ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄴㄴㄴㄴㄴ",
        postTime: "2023-07-05T12:38:26.494+00:00",
        postHits: 73,
        postLikes: 1,
      },
      {
        postId: 19,
        member: {
          id: 4,
          name: "정유선",
          nickname: "ys",
          email: "seon7129@naver.com",
          password:
            "$2a$10$DAEo4CrGJYC92PHr4UzAgeSq3XZhjFBMdDhbZe4x7AjNVq.QaHrHi",
          role: "ROLE_MEMBER",
        },
        category: { categoryId: 3, name: "유머" },
        title: "새로운 글",
        content: "테스트",
        postTime: "2023-07-04T14:12:40.229+00:00",
        postHits: 49,
        postLikes: 3,
      },
      {
        postId: 17,
        member: {
          id: 5,
          name: "만보",
          nickname: "만보",
          email: "m1@naver.com",
          password:
            "$2a$10$vK9dDtRURea0FAvtOSluIuV5MpiJuK6r2VkUGX8gxGJ9X1Mepew42",
          role: "ROLE_MEMBER",
        },
        category: { categoryId: 1, name: "자유" },
        title: "하이를 ㅂㅇ",
        content: "하이 수정",
        postTime: "2023-07-04T12:18:44.034+00:00",
        postHits: 48,
        postLikes: 2,
      },
      {
        postId: 16,
        member: {
          id: 2,
          name: "박재연",
          nickname: "t1t1",
          email: "t1@naver.com",
          password:
            "$2a$10$gRqPap0PyWbuwOt.8vbpX.0OpjbQhPxuyF2J0cTS/bm2D/OKWaofm",
          role: "ADMIN",
        },
        category: { categoryId: 1, name: "자유" },
        title: "안녕하세요",
        content: "안녕",
        postTime: "2023-07-04T12:17:52.913+00:00",
        postHits: 9,
        postLikes: 1,
      },
    ],
    pageable: {
      sort: { empty: false, sorted: true, unsorted: false },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false,
    },
    totalPages: 1,
    totalElements: 5,
    last: true,
    size: 10,
    number: 0,
    sort: { empty: false, sorted: true, unsorted: false },
    numberOfElements: 5,
    first: true,
    empty: false,
  },
  status: 200,
  statusText: "",
  headers: {
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
    "content-type": "application/json",
    expires: "0",
    pragma: "no-cache",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ["xhr", "http"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: { Accept: "application/json, text/plain, */*" },
    method: "get",
    url: "https://api.binbinbin.site/api/posting/list/0",
  },
  request: {},
};
