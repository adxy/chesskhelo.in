import styled from "styled-components";

import { useChessState } from "../store/chess";

const PgnContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.primary.green};
  scrollbar-width: thin;
  scrollbar-color: green rgba(255, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 20px;
  }
`;

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.large};
`;

const MoveContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: ${({ theme }) => theme.layout.spaces.large};
`;

const MoveNumber = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  min-width: 25px;
  margin: ${({ theme }) => theme.layout.spaces.extraSmall};
  font-size: 13px;
  background-color: white;
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
`;

const MoveLight = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  min-width: 60px;
  margin: ${({ theme }) => theme.layout.spaces.extraSmall};
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
  margin: ${({ theme }) => theme.layout.spaces.extraSmall};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.standardSquareDark};
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
`;

export default function Pgn() {
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
    <PgnContainer>
      <Margin />
      {moves &&
        moves.map((element) => (
          <MoveContainer key={element}>
            <MoveNumber>{element[0]}</MoveNumber>
            <MoveLight>{element[1]}</MoveLight>
            {element[2] && <MoveDark>{element[2]}</MoveDark>}
          </MoveContainer>
        ))}
    </PgnContainer>
  );
}
