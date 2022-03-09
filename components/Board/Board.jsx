import styled from "styled-components";

import Square from "./Square";
import { ALPHABETS } from "../../utils/constants";

const BoardContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  width: auto;
  max-width: 80vh;
  aspect-ratio: 1;
  margin: 40px;
  border-radius: 10px;
`;

export default function Board({ isWhitePlayer = true }) {
  let boardProperties = [];

  for (let i = 8; i > 0; i -= 1) {
    for (let j = 8; j > 0; j -= 1) {
      boardProperties.push({
        theme: (i + j) % 2 === 0 ? "l" : "d",
        id: `${ALPHABETS[ALPHABETS.length - j]}${i}`,
      });
    }
  }
  if (!isWhitePlayer) {
    boardProperties = boardProperties.reverse();
  }

  return (
    <BoardContainer id="board" key="board">
      {boardProperties.map((value) => (
        <Square key={value.id} id={value.id} type={value.theme} />
      ))}
    </BoardContainer>
  );
}
