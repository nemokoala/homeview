import styled from "styled-components";

function Register() {
  return (
    <Form>
      <Title>회원가입</Title>
      <Label>이메일</Label>
      <Input type="email" placeholder="Email"></Input>
    </Form>
  );
}

export default Register;

const Form = styled.div`
  margin: 100px auto;
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: darkslategray;
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
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 5px auto;
  border-radius: 15px;
`;
