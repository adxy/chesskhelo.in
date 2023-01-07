import styled from "styled-components";

const SquareBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 12.5%;
  height: 12.5%;
  background-color: ${({ squareType, theme }) =>
    squareType === "l"
      ? theme.colors.standardSquareLight
      : theme.colors.standardSquareDark};
  overflow: hidden;
  box-sizing: border-box;
`;

const Piece = styled.img`
  height: 100%;
  width: 100%;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;

export default function Square({ id, squareType, piece }) {
  return (
    <SquareBox id={id} squareType={squareType} className="square">
      {piece && (
        <Piece
          className={`piece ${piece[0] === "w" ? "piece-w" : "piece-b"}`}
          id={`${id}-${piece}`}
          src={`/images/pieces/${piece}.png`}
        />
      )}
    </SquareBox>
  );
}
