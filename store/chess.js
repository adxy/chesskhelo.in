import { createStore, createHook } from "react-sweet-state";
import Chess from "../utils/moveValidation";

const Store = createStore({
  initialState: {
    chess: new Chess(),
    moves: [],
  },

  actions: {
    setChess:
      (chess) =>
      ({ setState }) => {
        setState({ chess: chess });
      },

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
