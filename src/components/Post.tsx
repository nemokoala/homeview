import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setModal } from "slice/modalSlice";
import styled from "styled-components";
import { apiAddress } from "value";

function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const postId = params.id;
  const [postData, setPostData] = useState<any>("");
  const [comments, setComments] = useState<any>([]);
  const [likeToggle, setLikeToggle] = useState(false);
  const dispatch = useDispatch();
  // const example = {
  //   postId: 12,
  //   memberId: 2,
  //   memberNickname: "어드민계정",
  //   title: "하이",
  //   content: "안녕하세요<br/>hi<br/>33",
  //   postTime: "2023-07-01T10:49:10.162+00:00",
  //   postHits: 1,
  //   postLikes: 0,
  // };
  const session = useSelector((state: any) => state.userSet.session);
  useEffect(() => {
    getPostDetail();
    getComment();
    getLike();
  }, []);
  const getPostDetail = async () => {
    try {
      const response = await axios.get(`${apiAddress}/api/posting/${postId}`);
      console.log("Post.tsx(getPostDetail): " + JSON.stringify(response));
      const updatedData = response.data;
      updatedData.content = updatedData.content.split("<br/>").join("\n");
      const dateObj = new Date(updatedData.postTime);
      updatedData.postTime =
        dateObj.toLocaleDateString("ko-KR") +
        " " +
        dateObj.toLocaleTimeString("ko-KR", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        });
      setPostData(updatedData);
    } catch (error: any) {
      console.error("Post.tsx(getPostDetail): " + JSON.stringify(error));
    }
  };
  const getComment = async () => {
    try {
      const response = await axios.get(
        `${apiAddress}/api/comment/list/${postId}`
      );
      setComments(response.data);
    } catch (error: any) {
      console.error("Post.tsx(getComment): " + JSON.stringify(error));
    }
  };
  const likeUp = async () => {
    if (!likeToggle) {
      try {
        const response = await axios.post(
          `${apiAddress}/api/posting/like/save`,
          {
            memberId: session.id,
            postId: postId,
          }
        );
        if (response.status === 201) {
          setLikeToggle(true);
          dispatch(
            setModal({
              title: "알림",
              text: "좋아요가 반영되었습니다.",
            } as any)
          );
        }
        //202 는 이미 눌러져있음
        console.log("Post.tsx(likeUp): " + JSON.stringify(response));
      } catch (error: any) {
        console.error("Post.tsx(likeUp): " + JSON.stringify(error));
      }
    }

    if (likeToggle) {
      try {
        const response = await axios.post(
          `${apiAddress}/api/posting/like/delete`,
          {
            memberId: session.id,
            postId: postId,
          }
        );
        if (response.status === 201) {
          setLikeToggle(false);
          dispatch(
            setModal({
              title: "알림",
              text: "좋아요 취소가 반영되었습니다.",
            } as any)
          );
        }
        //202 는 이미 눌러져있음
        console.log("Post.tsx(likeUp): " + JSON.stringify(response));
      } catch (error: any) {
        console.error("Post.tsx(likeUp): " + JSON.stringify(error));
      }
    }
  };
  const getLike = async () => {
    try {
      const response = await axios.post(
        `${apiAddress}/api/posting/like/check`,
        {
          memberId: session.id,
          postId: postId,
        }
      );
      if (response.status === 201) setLikeToggle(false);
      if (response.status === 202) setLikeToggle(true);
      setPostData((prev: any) => ({ ...prev, postLikes: response.data }));
    } catch (error: any) {
      console.error("Post.tsx(likeUp): " + JSON.stringify(error));
    }
  };
  const deletePostingData = async (id: number) => {
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
      console.log("Post.tsx(deletePostingData): " + JSON.stringify(response));
      navigate("/community");
      // dispatch(setModal({ text: JSON.stringify(response) } as any));
    } catch (error: any) {
      // dispatch(setModal({ text: JSON.stringify(error) } as any));
      console.error("Post.tsx(deletePostingData): " + JSON.stringify(error));
    }
  };
  return (
    <Container>
      {postData ? (
        <>
          <ContentBlock>
            <ContentText fontSize={1.3}>
              {postData.title} 👀{postData.postHits}
            </ContentText>
            <ContentText fontSize={0.9} fontColor="gray">
              {postData.memberNickname}#{postData.memberId}
            </ContentText>
            <ContentText fontSize={0.9} fontColor="gray">
              {postData.postTime}
            </ContentText>
            {session.role === "ADMIN" && (
              <RedBtn onClick={() => deletePostingData(postData.postId)}>
                삭제
              </RedBtn>
            )}
            <hr />
            <ContentText>{postData.content}</ContentText>
            <RedBtn
              onClick={likeUp}
              style={
                likeToggle ? { background: "tomato" } : { background: "pink" }
              }
            >
              ❤️{postData.postLikes}
            </RedBtn>
          </ContentBlock>
          <ContentBlock>
            <ContentText fontSize={1.3}>댓글</ContentText>
          </ContentBlock>
          {comments.length > 0 &&
            comments.map((comment: any) => (
              <ContentBlock key={comment.commentId}>
                <ContentText fontSize={1.2}>
                  {comment.memberNickName}
                </ContentText>
                <ContentText>{comment.content}</ContentText>
              </ContentBlock>
            ))}
        </>
      ) : (
        <ContentBlock>
          <ContentText>로딩중...</ContentText>
        </ContentBlock>
      )}
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
  width: 95%;
  margin: 15px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  padding: 20px;
  border-radius: 20px;
  transition: all 0.7s;
`;
const ContentText = styled.div<any>`
  font-size: ${(props) => props.fontSize + "rem"};
  color: ${(props) => props.fontColor};
  white-space: pre-wrap;
`;
const RedBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  color: white;
  background-color: #fdadad;
  margin-top: 7px;
  transition: all 0.7s;
  &:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(90deg);
  }
`;
export default Post;
