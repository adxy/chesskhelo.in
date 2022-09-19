import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    loggedIn: false,
  },

  actions: {
    logout:
      () =>
      ({ setState }) => {
        setState({
          loggedIn: false,
        });
      },
    login:
      () =>
      ({ setState }) => {
        setState({
          loggedIn: true,
        });
      },
  },
  // optional, mostly used for easy debugging
  name: "loggedIn",
});

export const useLoggedIn = createHook(Store);
