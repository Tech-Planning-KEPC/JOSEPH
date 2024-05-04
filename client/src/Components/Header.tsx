import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 70px;
  background-color: gray;
`;

const Title = styled.div`
  margin-left: 20px;
  margin-right: 50px;
  font-size: 20px;
  color: white;
`;

const LinkItem = styled.a`
  margin-left: 10px;
  color: white;
  &:hover {
    color: #d8d8d8;
  }
`;

export default function Header() {
  return (
    <Container>
      <Title>Joseph</Title>
      <LinkItem href="/">Home</LinkItem>
      <LinkItem href="/upload">Upload</LinkItem>
      <LinkItem href="/scan">Scan</LinkItem>
      <LinkItem href="/view">View</LinkItem>
    </Container>
  );
}
