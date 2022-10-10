import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    moves: [],
  },

  actions: {
    setMoves:
      (moves) =>
      ({ setState }) => {
        setState({
          moves: moves,
        });
      },
  },
  // optional, mostly used for easy debugging
  name: "chess",
});

export const useChessState = createHook(Store);
