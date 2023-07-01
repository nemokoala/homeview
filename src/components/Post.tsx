import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apiAddress } from "value";

function Post() {
  const params = useParams();
  const postId = params.id;
  const [postData, setPostData] = useState<any>("");
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
  const likeUp = async () => {
    try {
      const response = await axios.post(`${apiAddress}/api/posting/like/save`, {
        member: {
          id: session.id,
          name: session.name,
          nickname: session.nickname,
          email: session.email,
          password: session.password,
          role: session.role,
        },
        title: postData.title,
        content: postData.content,
        postHits: postData.postHits,
        postLikes: postData.postLikes,
      });
      console.log("Post.tsx(likeUp): " + JSON.stringify(response));
    } catch (error: any) {
      console.error("Post.tsx(likeUp): " + JSON.stringify(error));
    }
  };
  return (
    <Container>
      {postData ? (
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
          <hr />
          <ContentText>{postData.content}</ContentText>
          <LikeBtn onClick={likeUp}>❤️{postData.postLikes}</LikeBtn>
        </ContentBlock>
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
const LikeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  color: white;
  background-color: #fdadad;
  margin-top: 7px;
  &:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(90deg);
  }
`;
export default Post;
