import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;

const CenterBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-content: center;
  gap: 10px;
`;

const GridItem = styled.div`
  height: 100px;
  width: 100px;

  button {
    width: 100%;
    height: 100%;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <CenterBox>
        <GridItem>
          <button onClick={() => navigate("upload")}>아이템 등록</button>
        </GridItem>
        <GridItem>
          <button>대쉬보드</button>
        </GridItem>
        <GridItem>
          <button>대쉬보드</button>
        </GridItem>
        <GridItem>
          <button>대쉬보드</button>
        </GridItem>
      </CenterBox>
    </Container>
  );
}
