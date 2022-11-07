import styled from "styled-components";

import DialogCloseButton from "../Buttons/DialogCloseButton";

const InfoContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 250px;
  max-width: 350px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
  overflow: hidden;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  z-index: 11;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.green};
  height: 100px;
  width: 120%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  color: white;
  font-size: 2.5rem;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: center;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  padding: ${({ theme }) => theme.layout.spaces.large};
  p {
    text-align: center;
  }
`;

export default function GameEndDialog({ title, description, onClickClose }) {
  return (
    <InfoContainer>
      <DialogCloseButton onClick={onClickClose} color="white" />
      <TitleContainer>{title}</TitleContainer>

      <Description>
        <p>{description}</p>
      </Description>
    </InfoContainer>
  );
}
