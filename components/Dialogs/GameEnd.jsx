import styled from "styled-components";
import { useEffect } from "react";

import { useChessState } from "../../store/chess";
import { useUserState } from "../../store/user";
import Avatar from "../Avatar";
import DialogCloseButton from "../Buttons/DialogCloseButton";
import { GAME_OVER_REASONS } from "../../utils/constants";
import { gameEndAudio } from "../../utils/audio";

const GameEndDialogContainer = styled.div`
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
  height: 180px;
  width: 120%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  color: white;
  font-size: 2.5rem;
`;

const AvatarContainer = styled.div`
  margin-top: -50px;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-left: ${({ theme }) => theme.layout.spaces.small};
  p {
    margin: 0px;
    display: flex;
  }
`;

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.small};
`;

export default function GameEndDialog({ reason, isWhitePlayer, onClickClose }) {
  const [userState, _] = useUserState();
  const [chessState, chessStateActions] = useChessState();

  useEffect(() => {
    gameEndAudio.play();
  }, []);

  const getResult = (reason) => {
    switch (reason) {
      case GAME_OVER_REASONS.checkmate:
        return "Checkmate";
      case GAME_OVER_REASONS.stalemate:
        return "Stalemate";
      case GAME_OVER_REASONS.resignation:
        return "Resignation";
      case GAME_OVER_REASONS.timeout:
        return "Timeout";
      case GAME_OVER_REASONS.fiftyMoveRule:
        return "Fifty Move Rule";
      case GAME_OVER_REASONS.insufficientMaterial:
        return "Insufficient Material";
      case GAME_OVER_REASONS.threefoldRepetition:
        return "Threefold Repetition";
      case GAME_OVER_REASONS.drawByAgreement:
        return "Agreement";
      default:
        return "Error";
    }
  };

  const getGameEndResult = (reason) => {
    if (reason === "aborted") {
      return { title: "ABORTED", message: "The game has been aborted!" };
    }

    const isDraw = [
      GAME_OVER_REASONS.drawByAgreement,
      GAME_OVER_REASONS.stalemate,
      GAME_OVER_REASONS.fiftyMoveRule,
      GAME_OVER_REASONS.insufficientMaterial,
      GAME_OVER_REASONS.threefoldRepetition,
    ].includes(reason);

    const winner = chessState.chess.turn() === "b" ? "White" : "Black";
    const title = isDraw
      ? "DRAW"
      : isWhitePlayer && winner === "White"
      ? "WIN"
      : "LOSS";
    const result = getResult(reason);

    const message = isDraw ? `Draw by ${result}` : `${winner} won by ${result}`;
    return { title, message };
  };

  const gameEndResult = getGameEndResult(reason);

  return (
    <GameEndDialogContainer>
      <DialogCloseButton onClick={onClickClose} color="white" />
      <TitleContainer>{gameEndResult.title}</TitleContainer>
      <AvatarContainer>
        <Avatar
          src={
            userState.avatar ? userState.avatar : "/images/avatar/default.jpg"
          }
          thumbnailSize="extraLarge"
          userName={userState.name}
        />
      </AvatarContainer>
      <Margin />
      <Result>
        <p>{gameEndResult.message}</p>
      </Result>
      <Margin />
      <Margin />
    </GameEndDialogContainer>
  );
}
