import styled from "styled-components";

const CloseButtonContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 5%;
  left: 5%;
  width: 40px;
  height: 40px;
  z-index: 14;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  z-index: 15;
`;

export default function DialogCloseButton({ onClick, color = "white" }) {
  return (
    <CloseButtonContainer onClick={onClick}>
      <CloseButton
        src={`/icons/close-icon-${color === "white" ? "white" : "black"}.svg`}
      />
    </CloseButtonContainer>
  );
}
