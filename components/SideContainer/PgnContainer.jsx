import styled from "styled-components";

import { useChessState } from "../../store/store";

const PgnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(
    100% - ${({ theme }) => theme.sideContainer.fenContainerHeight} -
      ${({ theme }) => theme.sideContainer.headerHeight} -
      ${({ theme, isMultiplayer }) =>
        isMultiplayer ? theme.sideContainer.messagesContainerHeight : "0px"} -
      32px
  );
  min-height: 200px;
  background-color: ${({ theme }) => theme.colors.charcoal};
`;

const MoveContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const MovesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  overflow-y: auto;
  background-color: #f6f6f6;
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
  /* top | right | bottom | left */
  padding: 16px 0 16px 16px;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary.blue};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: "";
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary.blue};
    border-radius: 20px;
  }
`;

const MoveNumber = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  min-width: 25px;
  margin: ${({ theme }) => theme.layout.spaces.extraSmall} 0;
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.primary.green};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
`;

const MoveLight = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  min-width: 60px;
  margin: ${({ theme }) => theme.layout.spaces.extraSmall}
    ${({ theme }) => theme.layout.spaces.large};
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.standardSquareLight};
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
`;

const MoveDark = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  min-width: 60px;
  margin: ${({ theme }) => theme.layout.spaces.extraSmall} 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.standardSquareDark};
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 13px;
  color: white;
  background-color: ${({ theme }) => theme.colors.charcoal};
  margin: 16px 0;
`;

export default function Pgn({ isMultiplayer }) {
  const [chessState, _] = useChessState();

  const getMoves = () => {
    let moves = chessState.moves;
    let tempMoves = [];
    for (let i = 0; i < moves.length; i += 2) {
      if (i + 2 <= moves.length) {
        tempMoves.push([`${i / 2 + 1}.`, moves[i], moves[i + 1]]);
      } else {
        tempMoves.push([`${i / 2 + 1}.`, moves[i]]);
      }
    }
    return tempMoves;
  };

  const moves = getMoves();

  return (
    <PgnContainer isMultiplayer={isMultiplayer}>
      <Title>Portable Game Notation (PGN)</Title>
      <MovesContainer>
        {chessState.moves &&
          moves &&
          moves.map((element) => (
            <MoveContainer key={element}>
              <MoveNumber>{element[0]}</MoveNumber>
              <MoveLight>{element[1]}</MoveLight>
              {element[2] && <MoveDark>{element[2]}</MoveDark>}
            </MoveContainer>
          ))}
      </MovesContainer>
    </PgnContainer>
  );
}
