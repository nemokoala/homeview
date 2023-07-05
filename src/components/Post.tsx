import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommunityFactory from "routes/CommunityFactory";
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
  const [fixToggle, setFixToggle] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch();
  const session = useSelector((state: any) => state.userSet.session);
  const modal = useSelector((state: any) => state.modalSet.modal);
  let enterEnable = true;
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

  useEffect(() => {
    getPostDetail();
    getComment();
    if (session) getLike();
  }, []);

  useEffect(() => {
    //모달창 enter로 종료후 바로 onclick되는 현상 수정
    if (!modal.open) {
      enterEnable = false;
      setTimeout(() => {
        enterEnable = true;
      }, 300);
    }
  }, [modal]);
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
      console.log("Post.tsx(getComment): " + JSON.stringify(response));
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
            postId: postId,
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setLikeToggle(true);
          getLike();
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
        if (error.response.status === 500)
          dispatch(
            setModal({
              title: "알림",
              text: "500 failed",
            } as any)
          );
      }
    }

    if (likeToggle) {
      try {
        const response = await axios.post(
          `${apiAddress}/api/posting/like/delete`,
          {
            postId: postId,
          },
          { withCredentials: true }
        );
        if (response.status === 202) {
          setLikeToggle(false);
          getLike();
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
          postId: postId,
        },
        { withCredentials: true }
      );
      if (response.status === 201) setLikeToggle(false);
      if (response.status === 202) setLikeToggle(true);
      setPostData((prev: any) => ({ ...prev, postLikes: response.data }));
      console.log("Post.tsx(getLike): " + JSON.stringify(response));
    } catch (error: any) {
      console.error("Post.tsx(getLike): " + JSON.stringify(error));
    }
  };

  const deletePostingData = async (id: number) => {
    if (session.role === "ADMIN") {
      //admin 전용
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
        const response = await axios.delete(
          `${apiAddress}/admin/posting/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Post.tsx(deletePostingData): " + JSON.stringify(response));
        navigate("/community");
        // dispatch(setModal({ text: JSON.stringify(response) } as any));
      } catch (error: any) {
        // dispatch(setModal({ text: JSON.stringify(error) } as any));
        console.error("Post.tsx(deletePostingData): " + JSON.stringify(error));
      }
    } else if (session.id === postData.memberId) {
      //유저 전용
      try {
        const response = await axios.get(
          `${apiAddress}/api/posting/${postId}/delete`,
          { withCredentials: true }
        );
        console.log("Post.tsx(deletePostingData): " + JSON.stringify(response));
        navigate("/community");
      } catch (error: any) {
        console.error("Post.tsx(deletePostingData): " + JSON.stringify(error));
      }
    }
  };
  const postComment = async () => {
    try {
      const response = await axios.post(
        `${apiAddress}/api/comment/add`,
        {
          postId: postId,
          content: commentContent,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setLikeToggle(true);
        getComment();
        dispatch(
          setModal({
            title: "알림",
            text: "댓글 작성을 완료하였습니다.",
          } as any)
        );
      }
      //202 는 이미 눌러져있음
      console.log("Post.tsx(postComment): " + JSON.stringify(response));
    } catch (error: any) {
      console.error("Post.tsx(postComment): " + JSON.stringify(error));
      if (error.response.status === 500)
        dispatch(
          setModal({
            title: "알림",
            text: "500 failed",
          } as any)
        );
    }
  };
  const deleteComment = async (commentId: any) => {
    try {
      const response = await axios.get(
        `${apiAddress}/api/comment/${commentId}/delete`,
        { withCredentials: true }
      );
      if (response.status === 202) {
        getComment();
        dispatch(
          setModal({
            title: "알림",
            text: "댓글이 삭제되었습니다.",
          } as any)
        );
      }
      console.log("Post.tsx(deleteComment): " + JSON.stringify(response));
    } catch (error: any) {
      console.error("Post.tsx(deleteComment): " + JSON.stringify(error));
    }
  };
  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "comment") setCommentContent(value);
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
      {postData ? (
        <>
          <ContentBlock>
            <ContentText fontSize={1.4}>
              {postData.title} 👀{postData.postHits}
            </ContentText>
            <ContentText fontSize={0.9} fontColor="gray">
              {postData.memberNickname}#{postData.memberId}
            </ContentText>
            <ContentText fontSize={0.9} fontColor="gray">
              {postData.postTime}
            </ContentText>
            <Btns>
              {session.id === postData.memberId && (
                <Btn
                  backgroundColor={fixToggle ? "pink" : "skyblue"}
                  onClick={() => {
                    setFixToggle((prev) => !prev);
                  }}
                >
                  {fixToggle ? "수정 취소" : "글 수정"}
                </Btn>
              )}

              {(session.role === "ADMIN" ||
                session.id === postData.memberId) && (
                <Btn
                  backgroundColor="rgb(255,159,159)"
                  onClick={() => deletePostingData(postData.postId)}
                >
                  삭제
                </Btn>
              )}
            </Btns>
            <hr />
            <ContentText fontSize={1.2}>{postData.content}</ContentText>
            <Btn
              onClick={likeUp}
              style={
                likeToggle
                  ? { background: "rgb(247, 133, 133)" }
                  : { background: "pink" }
              }
            >
              ❤️{postData.postLikes}
            </Btn>
          </ContentBlock>
          {fixToggle && (
            <ContentBlock>
              <CommunityFactory postData={postData} />
            </ContentBlock>
          )}
          <ContentBlock>
            <ContentText fontSize={1.3} margin="0 0 10px 0">
              댓글
            </ContentText>
            <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
              <CommentInput
                id="comment"
                value={commentContent}
                onChange={onChange}
                placeholder="댓글 내용을 입력해주세요."
                onKeyUp={(e: any) => {
                  if (e.key === "Enter" && enterEnable) postComment();
                }}
              />
              <Btn
                style={{
                  flexGrow: 1,
                  margin: 0,
                  height: "50px",
                  borderRadius: "17px",
                  backgroundColor: "skyblue",
                }}
                onClick={postComment}
              >
                작성
              </Btn>
            </div>

            {comments.map((comment: any) => (
              <ContentBlock key={comment.commentId} style={{ width: "100%" }}>
                <ContentText fontSize={1.2}>
                  {comment.memberNickName}#{comment.memberId}
                </ContentText>
                <ContentText fontsize={0.9} color="lightgray">
                  {changeDate(comment.commentTime)}
                </ContentText>
                {session.id === comment.memberId && (
                  <Btn onClick={() => deleteComment(comment.commentId)}>
                    삭제
                  </Btn>
                )}
                <hr></hr>
                <ContentText>{comment.content}</ContentText>
              </ContentBlock>
            ))}
          </ContentBlock>
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
  margin: ${(props) => props.margin};
  white-space: pre-wrap;
`;
const Btns = styled.div`
  width: auto;
  display: flex;
  gap: 10px;
`;
const Btn = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: ${(props) => props.height || "35px"};
  border-radius: 20px;
  color: white;
  background-color: ${(props) => props.backgroundColor || "pink"};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  margin-top: 7px;
  transition: all 0.7s;
  &:hover {
    filter: contrast(170%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(320deg);
  }
`;

const CommentInput = styled.input`
  width: 87%;
  height: 50px;
  padding: 13px;
  margin: 0;
  border-radius: 15px;
  border: 0px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.712);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3582);
  &:focus {
    outline: 1px solid var(--orange) !important;
    border-color: var(--orange) !important;
    box-shadow: 0 0 7px var(--orange);
  }
`;
export default Post;
