import styled from "styled-components";

import { useUserState } from "../store/user";
import Avatar from "../components/Avatar";
import Button from "./Button";

const ProfileDialogueContainer = styled.div`
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
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  z-index: 11;
`;

const ProfileBackground = styled.div`
  background-color: #359b9b;
  height: 150px;
  width: 120%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
`;

const AvatarContainer = styled.div`
  margin-top: -50px;
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

const CloseButtonContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 5%;
  left: 5%;
  width: 40px;
  height: 40px;
  z-index: 14;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  z-index: 15;
`;

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.small};
`;

export default function ProfileDialogue({ handleLogOut, onClickClose }) {
  const [userState, _] = useUserState();

  return userState.loggedIn ? (
    <ProfileDialogueContainer>
      <CloseButtonContainer onClick={onClickClose}>
        <CloseButton src="/icons/close-icon-white.svg" />
      </CloseButtonContainer>
      <ProfileBackground />
      <AvatarContainer>
        <Avatar
          src={userState.avatar}
          thumbnailSize="extraLarge"
          userName={userState.name}
        />
      </AvatarContainer>
      <UserName>
        <p>
          {userState.name &&
            userState.name.charAt(0).toUpperCase() + userState.name.slice(1)}
        </p>
      </UserName>
      <Margin />
      <Button title={"Logout"} onPress={handleLogOut} />
      <Margin />
      <Margin />
    </ProfileDialogueContainer>
  ) : (
    <></>
  );
}
