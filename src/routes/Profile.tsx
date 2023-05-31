import styled from "styled-components";

function Profile() {
  return (
    <Container>
      <Form></Form>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--navHeight));
  height: auto;
  background: linear-gradient(to bottom, white, #d9f4ff);
  margin: 0;
  display: inline-block;
`;

const Form = styled.form<any>`
  transition: all 1s ease-in;

  margin: 50px auto;
  width: 500px;
  height: auto;
  display: flex;
  flex-flow: column wrap;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  background-color: rgba(255, 253, 247, 0.438);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 20px 10px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 15px;
  padding: 20px 50px;
  @media screen and (max-width: 540px) {
    width: calc(100% - 40px);
    padding: 20px 10%;
  }
`;
export default Profile;
