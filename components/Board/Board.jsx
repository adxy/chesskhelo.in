import styled from "styled-components";

import Square from "./Square";
import { ALPHABETS, PIECE_DEFAULT_POSITION_LIST } from "../../utils/constants";

const BoardContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  width: auto;
  max-width: 90vh;
  max-height: 90vh;
  aspect-ratio: 1;
  border-radius: 6px;
  resize: vertical;
`;

export default function Board({ isWhitePlayer = true }) {
  let boardProperties = [];

  // Generate board properties & arrange pieces to default location
  for (let i = 8; i > 0; i -= 1) {
    for (let j = 8; j > 0; j -= 1) {
      boardProperties.push({
        theme: (i + j) % 2 === 0 ? "l" : "d",
        id: `${ALPHABETS[ALPHABETS.length - j]}${i}`,
        piece: Object.keys(PIECE_DEFAULT_POSITION_LIST).includes(
          `${ALPHABETS[ALPHABETS.length - j]}${i}`
        )
          ? PIECE_DEFAULT_POSITION_LIST[
              `${ALPHABETS[ALPHABETS.length - j]}${i}`
            ]
          : false,
      });
    }
  }

  // Flip board for black player
  if (!isWhitePlayer) {
    boardProperties = boardProperties.reverse();
  }

  return (
    <BoardContainer id="board" key="board">
      {boardProperties.map((value) => (
        <Square
          key={value.id}
          id={value.id}
          type={value.theme}
          piece={value.piece}
        />
      ))}
    </BoardContainer>
  );
}
