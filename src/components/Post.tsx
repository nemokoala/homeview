import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Post() {
  const params = useParams();
  const postId = params.id;
  const [postData, setPostData] = useState({});
}
const Container = styled.div`
  width: 100%;
  height: calc(100vh - var(--navHeight));
`;
export default Post;
