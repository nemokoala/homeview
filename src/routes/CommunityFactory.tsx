import styled from "styled-components";

function CommunityFactory() {
  return (
    <Container>
      <Label>글 제목</Label>
      <Title />
      <Label>글 내용</Label>
      <Content />
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
  margin-bottom: 3px;
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
  height: 100px;
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
