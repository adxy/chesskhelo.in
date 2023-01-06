import styled from "styled-components";
import { useState, useEffect } from "react";

import { BREAK_POINTS } from "../../styles/Responsive";
import { useChessState, useSocketState, useUserState } from "../../store/store";
import InfoContainer from "./InfoContainer";
import PgnContainer from "./PgnContainer";
import FenContainer from "./FenContainer";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.charcoal};
  height: 90vh;
  width: 100%;
  min-width: 200px;
  max-width: 500px;
  overflow: hidden;
  margin-right: ${({ theme }) => theme.layout.spaces.large};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};

  ${BREAK_POINTS.mobile`
    max-width: 95vw;
    max-height: 700px;
    margin-left: 20px;
  `} ${BREAK_POINTS.tablet`
    max-width: 95vw;
    max-height: 700px;
    margin-left: 20px;
  `} ${BREAK_POINTS.laptop`
    max-width: 95vw;
    max-height: 700px;
    margin-left: 20px;
  `};
`;

const SidebarHeader = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.blue};
  height: ${({ theme }) => theme.sideContainer.headerHeight};
  width: 100%;
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
`;

const SidebarHeaderButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  min-width: 120px;
  width: auto;
  margin: auto;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};

  p {
    margin: ${({ theme }) => theme.layout.spaces.extraSmall} 0 0;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.primary.pink};
  }
`;

const SidebarHeaderIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export default function SideContainer({ isMultiplayer, gameId, resetBoard }) {
  const [chessState, chessStateActions] = useChessState();
  const [userState, userStateActions] = useUserState();
  const [socketState, socketStateActions] = useSocketState();
  const [allowAbortingGame, setAllowAbortingGame] = useState(
    chessState.moves.length < 2
  );

  useEffect(() => {
    if (chessState.moves.length > 1) {
      setAllowAbortingGame(false);
    }
  }, [chessState.moves]);

  const copyToClipboard = (item) => {
    navigator.clipboard.writeText(
      item === "fen" ? chessState.chess.fen() : chessState.chess.pgn()
    );
    //Todo: replace alert with toast
    alert(`${item === "fen" ? "FEN" : "PGN"} copied to clipboard!`);
  };

  const getHeaderButtons = ({
    allowAbortingGame,
    isMultiplayer,
    resetBoard,
  }) => {
    const headerPropertiesSinglePlayer = [
      {
        onClick: () => copyToClipboard("fen"),
        src: "/icons/copy-icon.svg",
        text: "Copy FEN",
      },
      {
        onClick: () => copyToClipboard("pgn"),
        src: "/icons/copy-icon.svg",
        text: "Copy PGN",
      },
      {
        onClick: resetBoard,
        src: "/icons/reload.svg",
        text: "Reset Board",
      },
    ];

    const headerProperties = [
      {
        onClick: () =>
          socketState.socket.emit("resign", {
            gameId,
            userId: userState.userId,
          }),
        src: "/icons/flag.svg",
        text: "Resign",
      },

      {
        onClick: () =>
          socketState.socket.emit("offerDraw", {
            gameId,
            userId: userState.userId,
          }),
        src: "/icons/draw.svg",
        text: "Offer Draw",
      },
    ];

    const headerPropertiesWithAbort = [
      {
        onClick: () =>
          socketState.socket.emit("abort", {
            gameId,
            userId: userState.userId,
          }),
        src: "/icons/abort.svg",
        text: "Abort",
      },
    ];

    if (!isMultiplayer) {
      return headerPropertiesSinglePlayer.map((button) => (
        <SidebarHeaderButton onClick={button.onClick} key={button.text}>
          <SidebarHeaderIcon src={button.src} />
          <p>{button.text}</p>
        </SidebarHeaderButton>
      ));
    }

    return allowAbortingGame
      ? headerPropertiesWithAbort.map((button) => (
          <SidebarHeaderButton onClick={button.onClick} key={button.text}>
            <SidebarHeaderIcon src={button.src} />
            <p>{button.text}</p>
          </SidebarHeaderButton>
        ))
      : headerProperties.map((button) => (
          <SidebarHeaderButton onClick={button.onClick} key={button.text}>
            <SidebarHeaderIcon src={button.src} />
            <p>{button.text}</p>
          </SidebarHeaderButton>
        ));
  };

  return (
    <Container>
      <SidebarHeader>
        {getHeaderButtons({ allowAbortingGame, isMultiplayer, resetBoard })}
      </SidebarHeader>
      {isMultiplayer && <InfoContainer />}
      <FenContainer />
      <PgnContainer isMultiplayer={isMultiplayer} />
    </Container>
  );
}
