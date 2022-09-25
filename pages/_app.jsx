import { useEffect } from "react";
import io from "socket.io-client";

import GlobalStyle from "../styles/GlobalStyles";
import Theme from "../styles/Theme";
import { useAccessTokenState } from "../store/accessToken";
import { useUserState } from "../store/user";
import { useSocket } from "../store/socket";
import { setTokenHeader, get } from "../utils/networkUtils";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  const [userState, userStateActions] = useUserState();
  const [accessTokenState, accessTokenStateActions] = useAccessTokenState();
  const [socketState, socketStateActions] = useSocket();

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
      response.data.data.expiresIn
    ) {
      const { expiresIn, token } = response.data.data;
      accessTokenStateActions.update(token);
      userStateActions.login();
      if (userState.loggedIn) {
        setTimeout(() => updateAccessToken(), [expiresIn * 1000 - 5000]);
      }
    }
  };

  const fetchAndSetUser = async () => {
    if (
      accessTokenState.token &&
      !(userState.name && userState.email && userState.userId)
    ) {
      // fetch and set the user
      const userResponse = await get({
        url: "/v1/users",
        config: { withCredentials: true },
      });
      if (userResponse && userResponse.ok) {
        userStateActions.set(userResponse.data.data);
      }
    }
  };

  useEffect(() => {
    if (accessTokenState.token && !socketState.isConnected) {
      if (socketState.socket) return;
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
      socketStateActions.setConnected();
      //return () => socket.disconnect();
    }
  }, [accessTokenState.token]);

  useEffect(() => {
    updateAccessToken();
  }, [userState.loggedIn]);

  useEffect(() => {
    if (accessTokenState.token) {
      setTokenHeader({ token: accessTokenState.token });
    }
  }, [accessTokenState]);

  useEffect(() => {
    if (!(userState.name && userState.email && userState.userId)) {
      fetchAndSetUser();
    }
  }, [accessTokenState.token]);

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
