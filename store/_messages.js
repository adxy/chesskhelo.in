import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    messages: [],
  },

  actions: {
    newMessage:
      (message) =>
      ({ setState, getState }) => {
        setState({
          messages: [message, ...getState().messages],
        });
      },

    removeDraw:
      () =>
      ({ setState, getState }) => {
        setState({
          messages: getState().messages.filter(
            (message) => message.type !== "draw"
          ),
        });
      },

    clear:
      () =>
      ({ setState }) => {
        setState({ messages: [] });
      },
  },
  // optional, mostly used for easy debugging
  name: "messages",
});

export const useMessagesState = createHook(Store);
