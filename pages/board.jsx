import dynamic from "next/dynamic";
import styled from "styled-components";

import { BREAK_POINTS } from "../styles/Responsive";
import PgnContainer from "../components/PgnContainer";

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

const SideContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
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

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.large};
`;

export default function Board() {
  return (
    <MainContainer>
      <DynamicBoard
        isWhitePlayer={true}
        isPlayable={true}
        allowBothSideMoves={true}
      />
      <Margin />
      <SideContainer>
        <PgnContainer />
      </SideContainer>
    </MainContainer>
  );
}