import { useEffect } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";

import GlobalStyle from "../styles/GlobalStyles";
import Theme from "../styles/Theme";
import { useAccessTokenState } from "../store/accessToken";
import { useUserState } from "../store/user";
import { useSocketState } from "../store/socket";
import { useMessagesState } from "../store/messages";
import { setTokenHeader, get } from "../utils/networkUtils";
import Layout from "../components/Layout/Layout";
import { useGameState } from "../store/game";

function MyApp({ Component, pageProps }) {
  const [userState, userStateActions] = useUserState();
  const [accessTokenState, accessTokenStateActions] = useAccessTokenState();
  const [socketState, socketStateActions] = useSocketState();
  const [messagesState, messagesStateActions] = useMessagesState();
  const [gameState, gameStateActions] = useGameState();

  const router = useRouter();

  const updateAccessToken = async () => {
    const response = await get({
      url: "/v1/access-token",
      config: { withCredentials: true },
    });
    if (
      response &&
      response.ok &&
      response.data &&
      response.data.data &&
      response.data.data.token &&
      response.data.data.expiresIn &&
      response.data.data.userId
    ) {
      const { expiresIn, token, userId } = response.data.data;
      accessTokenStateActions.update(token);
      userStateActions.setUserId(userId);

      if (userState.loggedIn) {
        setTimeout(() => updateAccessToken(), [expiresIn * 1000 - 5000]);
      }
    }
  };

  const fetchAndSetUser = async () => {
    if (
      accessTokenState.token &&
      userState.userId &&
      !(userState.name && userState.email)
    ) {
      // fetch and set the user
      const userResponse = await get({
        url: `/v1/users/${userState.userId}`,
        config: { withCredentials: true },
      });
      if (userResponse && userResponse.ok) {
        userStateActions.set(userResponse.data.data);
        userStateActions.login();
      }
    }
  };

  const fetchAndSetOpponent = async () => {
    if (gameState.opponentUserId) {
      const opponentUserResponse = await get({
        url: `/v1/users/${gameState.opponentUserId}`,
        config: { withCredentials: true },
      });
      if (opponentUserResponse && opponentUserResponse.ok) {
        gameStateActions.setOpponent(opponentUserResponse.data.data);
      }
    }
  };

  useEffect(() => {
    if (accessTokenState.token && !socketState.isConnected) {
      if (socketState.socket) {
        return;
      }

      const socket = io(process.env.apiBase, {
        extraHeaders: {
          Authorization: accessTokenState.token,
        },
        path: "/v1/sockets",
        transports: ["websocket", "polling"],
        query: {
          token: accessTokenState.token,
        },
      });

      socketStateActions.set(socket);
    }
  }, [accessTokenState.token]);

  useEffect(() => {
    if (socketState.socket) {
      socketState.socket.on("connect", () => {
        socketStateActions.setConnected();
      });

      socketState.socket.on("disconnect", () => {
        socketStateActions.setDisconnected();
      });
    }
  }, [socketState.socket]);

  useEffect(() => {
    updateAccessToken();
  }, [userState.loggedIn]);

  useEffect(() => {
    if (accessTokenState.token) {
      setTokenHeader({ token: accessTokenState.token });
    }
  }, [accessTokenState]);

  useEffect(() => {
    if (userState.userId && !(userState.name && userState.email)) {
      fetchAndSetUser();
    }
  }, [accessTokenState.token, userState.userId]);

  useEffect(() => {
    if (socketState.isConnected) {
      socketState.socket.on("gameId", (value) => {
        router.push(`/games/${value.gameId}`);
      });
      socketState.socket.on("message", (message) =>
        messagesStateActions.newMessage(message)
      );
    }
  }, [socketState]);

  useEffect(() => {
    if (gameState.opponentUserId && accessTokenState.token) {
      fetchAndSetOpponent();
    }
  }, [gameState.opponentUserId]);

  return (
    <Theme>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}

export default MyApp;
