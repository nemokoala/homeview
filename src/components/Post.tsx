import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apiAddress } from "value";

function Post() {
  const params = useParams();
  const postId = params.id;
  const [postData, setPostData] = useState<any>({
    postId: 8,
    memberId: 2,
    memberNickname: "어드민계정",
    title: "줄바꿈2",
    content: "안녕\n줄바꿈테스트\n세번째줄",
    postTime: "2023-06-29T13:34:55.820+00:00",
    postHits: 1,
    postLikes: 0,
  });
  useEffect(() => {
    getPostDetail();
  }, []);
  const getPostDetail = async () => {
    try {
      const response = await axios.get(`${apiAddress}/api/posting/${postId}`);
      console.log("Post.tsx(getPostDetail): " + JSON.stringify(response));
      const updatedData = response.data;
      updatedData.content = updatedData.content.split("<br/>").join("\n");
      setPostData(updatedData);
    } catch (error: any) {
      console.error("Post.tsx(getPostDetail): " + JSON.stringify(error));
    }
  };
  return (
    <Container>
      {postData ? (
        <ContentBlock>
          <ContentText fontSize={1.2}>
            {postData.title}({postData.postId})
          </ContentText>
          <ContentText fontSize={0.9}>
            {postData.memberNickname}({postData.memberId})
          </ContentText>
          <hr />
          <ContentText>{postData.content}</ContentText>
          <ContentText>
            ❤️{postData.postLikes} 👀{postData.postHits}
          </ContentText>
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
export default Post;
