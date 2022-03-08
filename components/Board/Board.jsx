import styled from "styled-components";

import Square from "./Square";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: 80vh;
  aspect-ratio: 1;
  border-color: black;
  border-style: solid;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 12.5%;
  width: inherit;
`;

export default function Board() {
  return (
    <BoardContainer id="board">
      <RowContainer>
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
      </RowContainer>
      <RowContainer>
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
      </RowContainer>
      <RowContainer>
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
      </RowContainer>
      <RowContainer>
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
      </RowContainer>
      <RowContainer>
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
      </RowContainer>
      <RowContainer>
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
      </RowContainer>
      <RowContainer>
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
      </RowContainer>
      <RowContainer>
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
        <Square color="black" />
        <Square color="white" />
      </RowContainer>
    </BoardContainer>
  );
}
