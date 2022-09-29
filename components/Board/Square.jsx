import styled from "styled-components";

const SquareBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.5%;
  height: 12.5%;
  background-color: ${({ squareType }) =>
    squareType === "l" ? "#E9E5D6" : "#362706"};
  overflow: hidden;
  box-sizing: border-box;
`;

const Piece = styled.img`
  height: 100%;
  width: 100%;
`;

const getDraggable = ({ isWhitePlayer, allowBothSidesMove, piece }) => {
  if (allowBothSidesMove) {
    return "true";
  }
  if (isWhitePlayer && piece[0] === "w") {
    return "true";
  }
  if (!isWhitePlayer && piece[0] === "b") {
    return "true";
  }
  return "false";
};

export default function Square({
  id,
  squareType,
  piece,
  allowBothSidesMove,
  isWhitePlayer,
}) {
  return (
    <SquareBox id={id} squareType={squareType} className="square">
      {piece && (
        <>
          <Piece
            className={`piece ${piece[0] === "w" ? "piece-w" : "piece-b"}`}
            id={`${id}-${piece}`}
            src={`/images/pieces/${piece}.png`}
            draggable={getDraggable({
              isWhitePlayer,
              allowBothSidesMove,
              piece,
            })}
          />
        </>
      )}
    </SquareBox>
  );
}
