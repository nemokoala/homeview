import styled from "styled-components";

function Register() {
  return (
    <Container>
      <Form>
        <Title>회원가입</Title>
        <Label>이메일</Label>
        <Input type="email" placeholder="Email"></Input>
        <Label>비밀번호</Label>
        <Input type="email" placeholder="Email"></Input>
      </Form>
    </Container>
  );
}

export default Register;
const Container = styled.div`
  width: 100%;
  height: calc(100vh - var(--navHeight));
  background: linear-gradient(
    to bottom,
    rgb(232, 251, 255),
    rgb(255, 255, 255),
    rgb(158, 227, 248)
  );
  margin: 0;
  display: inline-block;
`;
const Form = styled.div`
  margin: 100px auto;
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  background-color: rgba(138, 159, 231, 0.226);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 10px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 15px;
  padding: 20px 50px;
`;
const Title = styled.div`
  margin: 15px auto;
  color: white;
  font-size: 1.5rem;
`;
const Label = styled.span`
  color: white;
  font-size: 1rem;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 5px auto;
  border-radius: 15px;
  border: 0px;
`;
