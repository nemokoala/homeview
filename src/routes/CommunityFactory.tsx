import { useCallback, useRef, useState } from "react";
import styled from "styled-components";

function CommunityFactory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null); //textarea 높이 자동조절
  const handleInput = useCallback((event: any) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  }, []);

  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "title") setTitle(value);
    if (id === "content") setContent(value);
  };

  return (
    <Container>
      <Label>글 제목</Label>
      <Title id="title" onChange={onChange} value={title} />
      <Label>글 내용</Label>
      <Content
        id="content"
        ref={textareaRef}
        className="autoresize-textarea"
        onInput={handleInput}
        onChange={onChange}
        value={content}
        rows={1}
      />
      <Button>작성 완료</Button>
    </Container>
  );
}
export default CommunityFactory;

const Container = styled.div`
  width: 100%;
  min-height: calc(100% - var(--navHeight));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.div`
  width: 90%;
  color: black;
  font-size: 1.5rem;
  margin-top: 23px;
  margin-bottom: 10px;
`;

const Title = styled.input`
  width: 90%;
  height: 50px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 15px;
  border: 0px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.712);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 5px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  &:focus {
    outline: 1px solid var(--orange) !important;
    border-color: var(--orange) !important;
    box-shadow: 0 0 7px var(--orange);
  }
`;

const Content = styled.textarea`
  width: 90%;
  min-height: 200px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 10px;
  resize: none;
  overflow-y: auto;
  border-radius: 15px;
  border: 0px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.712);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 5px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const Button = styled.button`
  width: 90%;
  height: 60px;
  margin: 40px 0;
  font-size: 1.5rem;
  background-color: var(--orange);
  border-radius: 15px;
  border: 0px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 15px 5px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  &:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  &:active {
    filter: hue-rotate(90deg);
  }
`;
