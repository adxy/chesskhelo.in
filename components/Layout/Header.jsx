import styled from "styled-components";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import Avatar from "../Avatar";
import { useAccessTokenState, useUserState } from "../../store/store";
import { del } from "../../utils/networkUtils";
import ProfileDialogue from "../Dialogs/Profile";

const DynamicSignInWithGoogle = dynamic(() => import("../SignInWithGoogle"));

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
`;

const Logo = styled.img`
  margin: ${({ theme }) => theme.layout.spaces.large}
    ${({ theme }) => theme.layout.spaces.extraLarge};
  height: calc(100% - 32px);
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-right: ${({ theme }) => theme.layout.spaces.large};
`;

const User = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.layout.spaces.extraSmall};
  width: auto;
  margin-right: ${({ theme }) => theme.layout.spaces.extraLarge};
  cursor: pointer;
  border-radius: 25px;
  img {
    margin: 5px;
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const UserName = styled.div`
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

export default function Header() {
  const [accessTokenState, accessTokenStateActions] = useAccessTokenState();
  const [userState, userStateActions] = useUserState();
  const [showProfileDialogue, setShowProfileDialogue] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    const logOutResponse = await del({
      url: "/v1/login",
      params: {},
      config: { headers: { Authorization: accessTokenState.token } },
    });
    if (logOutResponse && logOutResponse.ok) {
      accessTokenStateActions.update(undefined);
      setShowProfileDialogue(false);
      userStateActions.logout();
      router.reload("/");
    }
  };

  const handleProfileDialogueClose = () => {
    setShowProfileDialogue(false);
  };

  return (
    <HeaderContainer>
      <Logo
        src="/images/logos/ck-logo.svg"
        className="hidden-mobile"
        onClick={() => router.push("/")}
        alt="chesskhelo.in logo large"
      />
      <Logo
        src="/images/logos/ck-logo-mobile.svg"
        className="visible-mobile"
        onClick={() => router.push("/")}
        alt="chesskhelo.in logo small"
      />
      {userState.loggedIn ? (
        <User onClick={() => setShowProfileDialogue(true)}>
          <Avatar src={userState.avatar} userName={userState.name} />
          <UserName className="hidden-mobile">
            <p>
              {userState.name &&
                userState.name.charAt(0).toUpperCase() +
                  userState.name.slice(1)}
            </p>
          </UserName>
        </User>
      ) : (
        <ButtonContainer>
          <DynamicSignInWithGoogle />
        </ButtonContainer>
      )}
      {showProfileDialogue && (
        <ProfileDialogue
          handleLogOut={handleLogOut}
          onClickClose={handleProfileDialogueClose}
        />
      )}
    </HeaderContainer>
  );
}
