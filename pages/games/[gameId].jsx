/* eslint-disable no-case-declarations */
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { BREAK_POINTS } from "../../styles/Responsive";
import { useChessState } from "../../store/chess";
import { useUserState } from "../../store/user";
import { useSocketState } from "../../store/socket";
import SideContainer from "../../components/SideContainer/SideContainer";
import WaitingContainer from "../../components/WaitingContainer";
import Chess from "../../utils/moveValidation";
import { useGameState } from "../../store/game";
import { useMessagesState } from "../../store/messages";
import { GAME_OVER_REASONS } from "../../utils/constants";

const DynamicGameEnd = dynamic(
  () => import("../../components/Dialogs/GameEnd"),
  { ssr: false }
);
const DynamicBoard = dynamic(() => import("../../components/Board/Board"), {
  ssr: false,
});

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  overflow: hidden;

  ${BREAK_POINTS.mobile`
    flex-direction: column;
    align-items: center;
  `} ${BREAK_POINTS.tablet`
    flex-direction: column;
    align-items: center;
  `} ${BREAK_POINTS.laptop`
    flex-direction: column;
    align-items: center;
  `};
`;

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.large};
`;

export default function Board() {
  const [userState, userStateActions] = useUserState();
  const [chessState, chessStateActions] = useChessState();
  const [socketState, socketStateActions] = useSocketState();
  const [gameState, gameStateActions] = useGameState();
  const [renderBoard, setRenderBoard] = useState(false);
  const [gameStatus, setGameStatus] = useState(undefined);
  const [isWhitePlayer, setIsWhitePlayer] = useState(undefined);
  const [gameOver, setGameOver] = useState(false);
  const [messagesState, messagesStateActions] = useMessagesState();

  useEffect(() => messagesStateActions.clear(), []);

  const router = useRouter();
  const { gameId } = router.query;

  if (!gameId) {
    () => router.push("/404");
  }

  useEffect(() => {
    gameStateActions.setGameId(gameId);
  }, [gameId]);

  useEffect(() => {
    if (isWhitePlayer !== undefined) {
      setRenderBoard(true);
    }
  }, [isWhitePlayer]);

  useEffect(() => {
    if (socketState.socket && socketState.isConnected && userState.userId) {
      socketState.socket.emit("playerJoins", {
        gameId,
        userId: userState.userId,
      });

      socketState.socket.on("status", (event) => {
        switch (event.status) {
          case "notFound":
            setGameStatus("notFound");
            alert("Game Not Found");
            break;

          case "waiting":
            setGameStatus("waiting");
            break;

          case "inProgress":
            {
              const chess = new Chess();
              chess.load_pgn(event.game.pgn);
              chessStateActions.setChess(chess);
              setGameStatus("inProgress");
              const { wUserId, bUserId } = event.game;
              setIsWhitePlayer(wUserId === userState.userId ? true : false);
              const opponentUserId =
                wUserId === userState.userId ? bUserId : wUserId;
              gameStateActions.setOpponentUserId(opponentUserId);
            }
            break;

          case "gameOver":
            setGameOver(event.game.result);
            break;

          case "acceptedDraw":
            setGameOver(GAME_OVER_REASONS.drawByAgreement);
            messagesStateActions.removeDraw();
            break;

          case "rejectedDraw":
            messagesStateActions.removeDraw();
            break;

          default:
            break;
        }
      });
    }
  }, [socketState.isConnected && userState.userId]);

  const handleGameOverDialogClose = () => setGameOver(false);

  return userState.loggedIn ? (
    renderBoard ? (
      <MainContainer>
        <DynamicBoard
          isWhitePlayer={isWhitePlayer}
          isPlayable={true}
          allowBothSideMoves={false}
          isMultiplayer={true}
        />
        <Margin />
        <SideContainer isMultiplayer={true} gameId={gameId} />
        {gameOver && (
          <DynamicGameEnd
            reason={gameOver}
            isWhitePlayer={isWhitePlayer}
            onClickClose={handleGameOverDialogClose}
          />
        )}
      </MainContainer>
    ) : (
      gameStatus === "waiting" && <WaitingContainer gameId={gameId} />
    )
  ) : (
    <p>Login to continue</p>
  );
}
