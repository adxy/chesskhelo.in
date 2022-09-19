import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    name: undefined,
    email: undefined,
    userId: undefined,
    avatar: undefined,
    loggedIn: false,
  },

  actions: {
    logout:
      () =>
      ({ setState }) => {
        setState({
          name: undefined,
          email: undefined,
          userId: undefined,
          avatar: undefined,
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
    set:
      (user) =>
      ({ setState }) => {
        setState({
          name: user.name,
          email: user.email,
          userId: user.userId,
          avatar: user.avatar,
        });
      },
  },
  // optional, mostly used for easy debugging
  name: "user",
});

export const useUserState = createHook(Store);
