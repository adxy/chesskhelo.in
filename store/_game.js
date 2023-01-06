import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    gameId: undefined,
    opponentUserId: undefined,
    opponentName: undefined,
    opponentAvatar: undefined,
  },

  actions: {
    setGameId:
      (gameId) =>
      ({ setState }) => {
        setState({ gameId: gameId });
      },
    setOpponentUserId:
      (opponentUserId) =>
      ({ setState }) => {
        setState({ opponentUserId: opponentUserId });
      },
    setOpponent:
      (opponent) =>
      ({ setState }) => {
        setState({
          opponentName: opponent.name,
          opponentAvatar: opponent.avatar,
        });
      },
    reset:
      () =>
      ({ setState }) => {
        setState({ gameId: undefined, opponentUserId: undefined });
      },
  },
  // optional, mostly used for easy debugging
  name: "game",
});

export const useGameState = createHook(Store);
