import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 53%;
  border-radius: 20px;
  height: calc(100% / 8);
  z-index: 10;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  overflow: hidden;
`;

const Pieces = styled.img`
  height: 100%;
  aspect-ratio: 1;

  :hover {
    background-color: #a5c9ca;
  }
`;

const CloseButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #395b64;

  :hover {
    background-color: #2c3333;
  }
`;

const CloseButton = styled.img`
  width: 50%;
`;

const promotionPieces = ["q", "r", "b", "n"];

export default function PawnPromotionDialogue({
  playerColor,
  onClick,
  onClickClose,
}) {
  return (
    <Container>
      {playerColor === "w"
        ? promotionPieces.map((piece) => {
            return (
              <Pieces
                src={`/images/pieces/w${piece}.png`}
                key={`p-piece-${piece}`}
                onClick={() => onClick({ piece })}
              />
            );
          })
        : promotionPieces.map((piece) => {
            return (
              <Pieces
                src={`/images/pieces/b${piece}.png`}
                key={`p-piece-${piece}`}
                onClick={() => onClick({ piece })}
              />
            );
          })}
      <CloseButtonContainer onClick={onClickClose}>
        <CloseButton src="/icons/close-icon-white.svg" alt="Close Button" />
      </CloseButtonContainer>
    </Container>
  );
}
