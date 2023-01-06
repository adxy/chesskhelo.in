import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    token: undefined,
  },

  actions: {
    update:
      (accessToken) =>
      ({ setState }) => {
        setState({
          token: accessToken,
        });
      },
  },
  // optional, mostly used for easy debugging
  name: "accessToken",
});

export const useAccessTokenState = createHook(Store);
