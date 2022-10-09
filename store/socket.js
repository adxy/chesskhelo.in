import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    socket: undefined,
    isConnected: false,
  },

  actions: {
    set:
      (socket) =>
      ({ setState }) => {
        setState({
          socket: socket,
        });
      },

    setConnected:
      () =>
      ({ setState }) => {
        setState({
          isConnected: true,
        });
      },

    setDisconnected:
      () =>
      ({ setState }) => {
        setState({
          isConnected: false,
        });
      },
  },
  // optional, mostly used for easy debugging
  name: "sockets",
});

export const useSocketState = createHook(Store);
