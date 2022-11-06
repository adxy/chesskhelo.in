import styled from "styled-components";

import Button from "./Buttons/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin-left: 32px;
  height: 500px;
  overflow: hidden;
`;

const WaitingHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const InviteLink = styled.div`
  display: block;
  text-align: center;
  padding: ${({ theme }) => theme.layout.spaces.small};
  margin-top: 16px;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary.blue};
`;

const Margin = styled.div`
  margin: ${({ theme }) => theme.layout.spaces.large};
`;

export default function WaitingContainer({ gameId }) {
  const inviteLink = `${process.env.baseUrl}/games/${gameId}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    //Todo: add a toast here
  };

  return (
    <Container>
      <WaitingHeaderContainer>
        <p>Waiting for all players to join!</p>
        <p>
          <b>Invite your friends by sharing the link below:</b>
        </p>
      </WaitingHeaderContainer>
      <InviteLink>{inviteLink}</InviteLink>
      <Margin />
      <Button title="Copy Invite Link" onPress={handleCopyInviteLink} />
    </Container>
  );
}
