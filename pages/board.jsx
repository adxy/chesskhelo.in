import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { BREAK_POINTS } from "../styles/Responsive";
import SideContainer from "../components/SideContainer/SideContainer";
import { useChessState } from "../store/chess";

const DynamicGameEnd = dynamic(() => import("../components/Dialogs/GameEnd"), {
  ssr: false,
});
const DynamicBoard = dynamic(() => import("../components/Board/Board"), {
  ssr: false,
});

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
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
  const [chessState, chessStateActions] = useChessState();
  const [renderBoard, setRenderBoard] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const isWhitePlayer = true;

  useEffect(() => {
    if (chessState.chess.game_over()) {
      setGameOver(chessState.chess.game_over());
    }
  }, [chessState]);

  const handleGameOverDialogClose = () => setGameOver(false);

  const resetBoard = () => {
    chessStateActions.resetChess();
    setRenderBoard(false);
    setTimeout(() => {
      setRenderBoard(true);
    }, []);
    handleGameOverDialogClose();
  };

  return (
    <MainContainer>
      {renderBoard && (
        <DynamicBoard
          isWhitePlayer={isWhitePlayer}
          isPlayable={true}
          allowBothSideMoves={true}
        />
      )}
      <Margin />
      <SideContainer isMultiplayer={false} resetBoard={resetBoard} />
      {gameOver && (
        <DynamicGameEnd
          reason={gameOver}
          isWhitePlayer={isWhitePlayer}
          onClickClose={handleGameOverDialogClose}
        />
      )}
    </MainContainer>
  );
}
