import styled from "styled-components";
import { useGameState } from "../../store/game";

import { useMessagesState } from "../../store/messages";
import { useSocketState } from "../../store/socket";
import { useUserState } from "../../store/user";

const messageBarHeight = "40px";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => theme.sideContainer.messagesContainerHeight};
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - ${messageBarHeight} - 15px - 30px - 12px - 12px - 32px);
  width: 90%;
  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
  margin-bottom: 12px;
  padding-left: 16px;

  scrollbar-width: thin;
  scrollbar-color: "";

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
  margin: 16px;
`;

const PlayerName = styled.span`
  font-weight: bold;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary.blue};
`;

const OpponentName = styled.span`
  font-weight: bold;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary.pink};
`;

const SystemName = styled.span`
  font-weight: bold;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary.green};
`;

const Message = styled.p`
  margin: 0;
  margin-right: 16px;
`;

const MessageText = styled.span`
  font-size: 13px;
`;

const DrawResponseButton = styled.span`
  color: ${({ theme }) => theme.colors.primary.pink};
  cursor: pointer;
`;

const WriteMessageBar = styled.input`
  width: 90%;
  height: ${messageBarHeight};
  color: white;
  background: ${({ theme }) => theme.colors.gunmetal};
  border: none;
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
  padding-left: 16px;

  :focus {
    border: ${({ theme }) => theme.colors.white};
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #d3d3d3;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #d3d3d3;
    opacity: 1;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #d3d3d3;
    opacity: 1;
  }
`;

export default function InfoContainer() {
  const [messagesState, messagesStateActions] = useMessagesState();
  const [socketState, socketStateActions] = useSocketState();
  const [userState, userStateActions] = useUserState();
  const [gameState, gameStateActions] = useGameState();

  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value.length) {
      socketState.socket.emit("message", {
        userId: userState.userId,
        text: event.target.value,
        type: "chat",
        gameId: gameState.gameId,
      });

      event.currentTarget.value = "";
      scrollToBottom("messages-container");
    }
  };

  const handleDraw = (response) => {
    if (response === "accept") {
      socketState.socket.emit("acceptDraw", {
        gameId: gameState.gameId,
        userId: userState.userId,
      });
      return;
    }
    socketState.socket.emit("rejectDraw", {
      gameId: gameState.gameId,
      userId: userState.userId,
    });
  };

  return (
    <Container>
      <Title>Messages & System Events</Title>
      <MessagesContainer id="messages-container">
        {messagesState.messages &&
          messagesState.messages.map((message) => {
            if (message.type === "system") {
              return (
                <Message>
                  <SystemName>ChessKheloBot: </SystemName>
                  <MessageText>{message.text}</MessageText>
                </Message>
              );
            }
            if (message.type === "chat") {
              return message.userId === userState.userId ? (
                <Message>
                  <PlayerName>{userState.name + `: `}</PlayerName>
                  <MessageText>{message.text}</MessageText>
                </Message>
              ) : (
                <Message>
                  <OpponentName>{gameState.opponentName + `: `}</OpponentName>
                  <MessageText>{message.text}</MessageText>
                </Message>
              );
            }
            if (message.type === "draw") {
              return message.userId === userState.userId ? (
                <Message>
                  <SystemName>ChessKheloBot: </SystemName>
                  <MessageText>{userState.name} offered a draw.</MessageText>
                </Message>
              ) : (
                <Message>
                  <SystemName>ChessKheloBot: </SystemName>
                  <MessageText>
                    <span>
                      {`${gameState.opponentName} ` + `offered a draw. `}
                    </span>
                    <DrawResponseButton onClick={() => handleDraw("accept")}>
                      Accept
                    </DrawResponseButton>{" "}
                    /{" "}
                    <DrawResponseButton onClick={() => handleDraw("reject")}>
                      Reject
                    </DrawResponseButton>
                  </MessageText>
                </Message>
              );
            }
          })}
      </MessagesContainer>
      <WriteMessageBar
        placeholder="Type & press enter to send a message."
        type="text"
        maxlength="20"
        id="message-bar"
        onKeyUp={sendMessage}
      />
    </Container>
  );
}
