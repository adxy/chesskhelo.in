import styled from "styled-components";
import lottie from "lottie-web";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import headerAnimationData from "../public/lotties/header-animation.json";
import Button from "./Buttons/Button";
import { BREAK_POINTS } from "../styles/Responsive";
import { useUserState } from "../store/store";
import CreateChallengeDialog from "./Dialogs/CreateChallenge";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: calc(100% - 64px);
`;

const HeroTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  height: 80%;
  width: auto;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: #343399;
  ${BREAK_POINTS.mobile`
    font-size: 2.5rem;   
    align-items: center;   
  `};
  ${BREAK_POINTS.tablet`
    font-size: 4rem;      
  `};
  ${BREAK_POINTS.laptop`
    font-size: 5rem;      
  `};
  ${BREAK_POINTS.desktop`
    font-size: 6rem;      
  `};
`;

const SubText = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  ${BREAK_POINTS.mobile`
    font-size: 1rem;
    text-align: center;      
  `};
`;

const HeroAnimationContainer = styled.div`
  display: flex;
  height: 80%;
  width: auto;
  ${BREAK_POINTS.mobile`
    max-width: 70vw;
    height: 300px;    
  `};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  ${BREAK_POINTS.mobile`
    align-items: center; 
    flex-direction: column;  
  `};
`;

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.small}; ;
`;

export default function Hero() {
  const router = useRouter();

  const [showCreateChallengeDialog, setShowCreateChallengeDialog] =
    useState(false);
  const [userState, _] = useUserState();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("header-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: headerAnimationData,
    });
    lottie.loadAnimation({
      container: document.getElementById("header-animation-mob"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: headerAnimationData,
    });
  }, []);

  const toggleCreateChallengeDialog = () =>
    setShowCreateChallengeDialog((current) => !current);

  return (
    <>
      <HeroContainer>
        {showCreateChallengeDialog && (
          <CreateChallengeDialog onClickClose={toggleCreateChallengeDialog} />
        )}
        <HeroTextContainer>
          <HeroAnimationContainer
            id="header-animation-mob"
            className="visible-mobile"
          />
          Welcome to <b>ChessKhelo!</b>
          <SubText>Made for the ❤️ of Chess!</SubText>
          <Margin />
          <ButtonContainer>
            <Button
              title="Just load a Board!"
              onPress={() => router.push("/board")}
            />
            <Margin />
            <Button
              title={
                userState.loggedIn
                  ? "Create a challenge!"
                  : "SignIn for Multiplayer"
              }
              buttonType="secondary"
              onPress={toggleCreateChallengeDialog}
              disabled={userState.loggedIn ? false : true}
            />
          </ButtonContainer>
        </HeroTextContainer>
        <HeroAnimationContainer
          id="header-animation"
          className="hidden-mobile"
        />
      </HeroContainer>
    </>
  );
}
