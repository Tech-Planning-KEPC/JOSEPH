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
  margin-right: 50px;
  color: white;
  &:hover {
    color: #d8d8d8;
  }
`;

export default function Header() {
  return (
    <Container>
      <Title>Joseph</Title>
      <LinkItem href="/upload">등록</LinkItem>
      <LinkItem href="/scan">스캔</LinkItem>
      <LinkItem href="/view">재고</LinkItem>
    </Container>
  );
}
