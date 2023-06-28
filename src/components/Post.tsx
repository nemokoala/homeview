import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Post() {
  const params = useParams();
  const postId = params.id;
  const [postData, setPostData] = useState({});
  return (
    <Container>
      <ContentBlock>
        <ContentText>게시글 : {postId}</ContentText>
      </ContentBlock>
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
`;
export default Post;
