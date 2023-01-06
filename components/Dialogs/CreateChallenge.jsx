import styled from "styled-components";
import { useState } from "react";

import DialogCloseButton from "../Buttons/DialogCloseButton";
import Button from "../Buttons/Button";
import { getRandomInteger } from "../../utils/commonFunctions";
import { useSocketState, useUserState } from "../../store/store";
import { BREAK_POINTS } from "../../styles/Responsive";

const DialogContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 200px;
  width: auto;
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
  z-index: 10;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.white};
  background-color: #359b9b;
  height: 150px;
  width: 120%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  padding: ${({ theme }) => theme.layout.spaces.large};

  ${BREAK_POINTS.mobile`
  font-size: ${({ theme }) => theme.fontSize.medium};
  `};
`;

const ColorSelectionContainer = styled.div`
  width: auto;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: row;
  margin: ${({ theme }) => theme.layout.spaces.large} 0;
`;

const Piece = styled.img`
  width: 60px;
  height: 60px;

  ${BREAK_POINTS.mobile`
  width: 40px;
  height: 40px;
  `};
`;

const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
  cursor: pointer;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? `${theme.colors.primary.green}` : ""};
  margin: 0 ${({ theme }) => theme.layout.spaces.extraSmall};
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
  border: solid 2px ${({ theme }) => theme.colors.white};

  :hover {
    border: solid 2px ${({ theme }) => theme.colors.primary.green};
  }
`;

const ColorSelectionText = styled.p`
  text-transform: capitalize;
`;

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.large};
`;

const playerColorProperties = [
  {
    value: "white",
    image: "/images/pieces/wp.png",
    colorCode: "w",
  },
  {
    value: "black",
    image: "/images/pieces/bp.png",
    colorCode: "b",
  },
  {
    value: "random",
    image: "/images/pieces/rp.png",
    colorCode: getRandomInteger(1, 2) === 1 ? "w" : "b",
  },
];

export default function CreateChallengeDialog({ onClickClose }) {
  const [selectedColorOption, setSelectedColorOption] = useState(undefined);
  const [socketState, socketStateActions] = useSocketState();
  const [userState, userStateActions] = useUserState();

  const handleCreateChallange = () => {
    socketState.socket.emit("createNewGame", {
      userId: userState.userId,
      color: selectedColorOption.colorCode,
    });
  };

  return (
    <DialogContainer>
      <DialogCloseButton color={"white"} onClick={onClickClose} />
      <TitleContainer>Select your color</TitleContainer>
      <ColorSelectionContainer>
        {playerColorProperties.map((prop) => (
          <ColorContainer
            onClick={() =>
              setSelectedColorOption({
                value: prop.value,
                colorCode: prop.colorCode,
              })
            }
            isSelected={selectedColorOption?.value === prop.value || false}
            key={prop.value}
          >
            <Piece src={prop.image} />
            <ColorSelectionText>{prop.value}</ColorSelectionText>
          </ColorContainer>
        ))}
      </ColorSelectionContainer>
      <Button
        title="Create Challange"
        disabled={!selectedColorOption}
        onPress={handleCreateChallange}
      />
      <Margin />
    </DialogContainer>
  );
}
