import styled from "styled-components";

const SquareBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.5%;
  height: 12.5%;
  background-color: ${({ type }) => (type === "l" ? "#E9E5D6" : "#362706")};
  overflow: hidden;
  box-sizing: border-box;
`;

const Piece = styled.img`
  height: 100%;
  width: 100%;
`;

export default function Square({ id, type, piece }) {
  return (
    <SquareBox id={id} type={type} className="square">
      {piece && (
        <>
          <Piece
            className="piece"
            id={`${id}-${piece}`}
            src={`/images/pieces/${piece}.png`}
            draggable="true"
          />
        </>
      )}
    </SquareBox>
  );
}
