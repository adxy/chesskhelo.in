import styled from "styled-components";
import { useEffect, useState } from "react";

import Square from "./Square";
import Notations from "./Notations";
import {
  BLACK_ROOK_KING_SIDE_ID,
  BLACK_ROOK_QUEEN_SIDE_ID,
  CASTLED_BLACK_ROOK_KING_SIDE_DESTINATION_ID,
  CASTLED_BLACK_ROOK_QUEEN_SIDE_DESTINATION_ID,
  CASTLED_WHITE_ROOK_KING_SIDE_DESTINATION_ID,
  CASTLED_WHITE_ROOK_QUEEN_SIDE_DESTINATION_ID,
  CHESS_BOARD_ID,
  KING_SIDE_CASTLING,
  MOVE_COLOR_WHITE,
  QUEEN_SIDE_CASTLING,
  STANDARD_CAPTURE,
  WHITE_ROOK_QUEEN_SIDE_ID,
  WHITE_ROOK_KING_SIDE_ID,
  WHITE_KING_ID,
  BLACK_KING_ID,
  CASTLED_WHITE_KING_QUEEN_SIDE_DESTINATION_ID,
  CASTLED_BLACK_KING_QUEEN_SIDE_DESTINATION_ID,
  CASTLED_WHITE_KING_KING_SIDE_DESTINATION_ID,
  CASTLED_BLACK_KING_KING_SIDE_DESTINATION_ID,
  NON_CAPTURE_PROMOTION,
  CAPTURE_PROMOTION,
  EN_PASSANT_CAPTURE,
} from "../../utils/constants";
import {
  getEventPosition,
  getKeyAtDomPos,
  disableScroll,
  enableScroll,
} from "../../utils/commonFunctions";
import PawnPromotionDialogue from "./PawnPromotionDialogue";
import { useChessState } from "../../store/chess";
import Loader from "../Loader";
import {
  moveSelfAudio,
  captureAudio,
  castleAudio,
  promoteAudio,
  gameStartAudio,
} from "../../utils/audio";
import { useSocketState } from "../../store/socket";
import { useUserState } from "../../store/user";
import { useGameState } from "../../store/game";

const BoardContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  aspect-ratio: 1;
  max-height: 97%;
  max-width: 97%;
  border-radius: ${({ theme }) => theme.layout.standardBorderRadius};
`;

const NotationsContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  top: 0px;
  right: 0px;
  width: 100%;
`;

const OuterBoardContainer = styled.div`
  position: relative;
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  width: calc(100% - 16px);
  aspect-ratio: 1;
  min-height: 200px;
  min-width: 200px;
  max-width: 90vh;
  max-height: 90vh;
  resize: horizontal;
`;

export default function Board({
  isWhitePlayer = true,
  isMultiplayer = false,
  isPlayable = false,
  allowBothSideMoves = false,
  fen = undefined,
  pgn = undefined,
}) {
  const [chessState, chessStateActions] = useChessState();
  const [socketState, socketStateActions] = useSocketState();
  const [userState, userStateActions] = useUserState();
  const [gameState, gameStateActions] = useGameState();

  const [showPawnPromotionDialogue, setShowPawnPromotionDialogue] =
    useState(false);
  const [promotionMoves, setPromotionMoves] = useState({
    from: "",
    to: "",
  });
  const [piecesPromotedCount, setPiecesPromotedCount] = useState(0);
  const [boardState, setBoardState] = useState(undefined);

  let lastTouchPosition = null;

  useEffect(() => {
    if (isMultiplayer && socketState.socket) {
      socketState.socket.on("move", (move) => makeMove(move));
    }
  }, [isMultiplayer, socketState.isConnected]);

  useEffect(() => {
    // fetch board state from backend here, or init default
    setTimeout(() => {
      if (fen) {
        chessStateActions.setChess(chessState.chess.load(fen));
      }
      if (pgn) {
        chessStateActions.setChess(chessState.chess.load_pgn(pgn));
      }
      chessStateActions.setMoves(chessState.chess.history());
      setBoardState(
        isWhitePlayer
          ? chessState.chess.boardProperties()
          : chessState.chess.boardProperties().reverse()
      );
      gameStartAudio.play();
    }, [0]);
  }, []);

  const isPromotion = ({ from, to }) => {
    const piece = chessState.chess.get(from);

    if (piece?.type !== "p") {
      return false;
    }

    if (piece.color !== chessState.chess.turn()) {
      return false;
    }

    if (!["1", "8"].some((num) => to.endsWith(num))) {
      return false;
    }

    return chessState.chess
      .moves({ square: from, verbose: true })
      .map((move) => move.to)
      .includes(to);
  };

  const makeMove = ({ from, to, promotion = 0 }) => {
    const moveObject = { from, to };
    if (promotion) {
      moveObject.promotion = promotion;
    }

    const move = chessState.chess.move(moveObject);
    chessStateActions.setChess(chessState.chess);

    if (move) {
      if (isMultiplayer) {
        socketState.socket.emit("move", {
          move: moveObject,
          userId: userState.userId,
          gameId: gameState.gameId,
        });
      }

      chessStateActions.setMoves(chessState.chess.history());
      const destinationSquare = document.getElementById(to);
      const draggedPiece = document.getElementById(from).firstChild;
      const destinationPiece = document.getElementById(to).firstChild;

      switch (move.flags) {
        case STANDARD_CAPTURE:
          captureAudio.play();
          destinationSquare.removeChild(destinationPiece);
          destinationSquare.appendChild(draggedPiece);
          break;

        case KING_SIDE_CASTLING:
          castleAudio.play();
          handleCastling({
            moveColor: move.color,
          });
          break;

        case QUEEN_SIDE_CASTLING:
          castleAudio.play();
          handleCastling({
            moveColor: move.color,
            kingSide: false,
          });
          break;

        case NON_CAPTURE_PROMOTION:
          promoteAudio.play();
          handlePawnPromotion({
            draggedPiece,
            color: move.color,
            promotion,
            destinationSquare,
          });
          break;

        case CAPTURE_PROMOTION:
          promoteAudio.play();
          handlePawnPromotion({
            draggedPiece,
            color: move.color,
            promotion,
            destinationSquare,
            capture: true,
          });
          break;

        case EN_PASSANT_CAPTURE:
          {
            captureAudio.play();
            // eslint-disable-next-line no-case-declarations
            const capturedSquare = document.getElementById(
              String(move.to[0] + move.from[1])
            );
            capturedSquare.removeChild(capturedSquare.firstChild);
            destinationSquare.appendChild(draggedPiece);
          }
          break;

        default:
          moveSelfAudio.play();
          destinationSquare.appendChild(draggedPiece);
      }
    }
  };

  const handleCastling = ({ moveColor, kingSide = true }) => {
    let rookPositionId =
      moveColor === MOVE_COLOR_WHITE
        ? WHITE_ROOK_QUEEN_SIDE_ID
        : BLACK_ROOK_QUEEN_SIDE_ID;

    const kingPositionId =
      moveColor === MOVE_COLOR_WHITE ? WHITE_KING_ID : BLACK_KING_ID;

    let rookDestinationId =
      moveColor === MOVE_COLOR_WHITE
        ? CASTLED_WHITE_ROOK_QUEEN_SIDE_DESTINATION_ID
        : CASTLED_BLACK_ROOK_QUEEN_SIDE_DESTINATION_ID;

    let kingDestinationId =
      moveColor === MOVE_COLOR_WHITE
        ? CASTLED_WHITE_KING_QUEEN_SIDE_DESTINATION_ID
        : CASTLED_BLACK_KING_QUEEN_SIDE_DESTINATION_ID;

    if (kingSide) {
      rookPositionId =
        moveColor === MOVE_COLOR_WHITE
          ? WHITE_ROOK_KING_SIDE_ID
          : BLACK_ROOK_KING_SIDE_ID;

      rookDestinationId =
        moveColor === MOVE_COLOR_WHITE
          ? CASTLED_WHITE_ROOK_KING_SIDE_DESTINATION_ID
          : CASTLED_BLACK_ROOK_KING_SIDE_DESTINATION_ID;

      kingDestinationId =
        moveColor === MOVE_COLOR_WHITE
          ? CASTLED_WHITE_KING_KING_SIDE_DESTINATION_ID
          : CASTLED_BLACK_KING_KING_SIDE_DESTINATION_ID;
    }

    const king = document.getElementById(kingPositionId);
    const rook = document.getElementById(rookPositionId);
    const rookDestination = document.getElementById(rookDestinationId);
    const kingDestination = document.getElementById(kingDestinationId);
    rook.parentElement.removeChild(rook);
    king.parentElement.removeChild(king);
    rookDestination.appendChild(rook);
    kingDestination.appendChild(king);
  };

  const handlePawnPromotion = ({
    draggedPiece,
    color,
    promotion,
    destinationSquare,
    capture,
  }) => {
    draggedPiece.parentElement.removeChild(draggedPiece);
    const promotedPiece = document.createElement("img");
    promotedPiece.src = `/images/pieces/${color}${promotion}.png`;
    promotedPiece.draggable = true;
    promotedPiece.className = "piece";
    promotedPiece.id = `p-piece-${piecesPromotedCount}`;
    promotedPiece.style.objectFit = "contain";
    promotedPiece.style.height = "100%";
    promotedPiece.style.width = "100%";
    if (capture) {
      destinationSquare.removeChild(destinationSquare.firstChild);
    }
    destinationSquare.appendChild(promotedPiece);
    promotedPiece.addEventListener("mousedown", handleDragStart);
    promotedPiece.addEventListener("touchstart", handleDragStart);
    setPiecesPromotedCount(piecesPromotedCount + 1);
  };

  const handlePawnPromotionDialogue = ({ from, to }) => {
    setShowPawnPromotionDialogue(true);
    setPromotionMoves({ from, to });
  };

  const handleCloseButtonPress = () => setShowPawnPromotionDialogue(false);

  const handlePawnPromotionPieceSelection = ({ piece }) => {
    const { from, to } = promotionMoves;
    makeMove({ from, to, promotion: piece });
    setShowPawnPromotionDialogue(false);
    setPromotionMoves({ from: "", to: "" });
  };

  if (isPlayable) {
    useEffect(() => {
      let pieces;
      if (allowBothSideMoves) {
        pieces = document.querySelectorAll(".piece");
      } else {
        pieces = document.querySelectorAll(
          isWhitePlayer ? ".piece-w" : ".piece-b"
        );
      }

      pieces.forEach((piece) => {
        piece.addEventListener("mousedown", handleDragStart);
        piece.addEventListener("touchstart", handleDragStart);
      });
    }, [boardState]);
  }

  const handleDragStart = (event) => {
    event.preventDefault();

    if (window.scrollY !== 0 || window.scrollX !== 0) {
      window.scrollTo(0, 0);
    }

    disableScroll();
    const draggedPiece = document.getElementById(event.target.id);
    const isWhitePiece = draggedPiece.classList.contains("piece-w");

    const onlyMoveSingleSide = !allowBothSideMoves || isMultiplayer;
    const isMovingOpponentPiece =
      (!isWhitePlayer && isWhitePiece) || (isWhitePlayer && !isWhitePiece);

    if (onlyMoveSingleSide && isMovingOpponentPiece) {
      return;
    }

    const draggedPieceClone = draggedPiece.cloneNode();
    draggedPiece.classList.add("hide");

    const chessBoard = document.getElementById("chess-board");

    const boardHeight = chessBoard.offsetHeight;

    const pieceHeight = boardHeight / 8 + "px";

    draggedPieceClone.style.height = pieceHeight;
    draggedPieceClone.style.width = pieceHeight;
    draggedPieceClone.style.position = "absolute";
    draggedPieceClone.style.zIndex = 1000;
    document.body.append(draggedPieceClone);

    var chessBoardRect = chessBoard.getBoundingClientRect();

    const moveAt = ({ clientX, clientY }) => {
      const isInsideParent =
        clientX >= chessBoardRect.left &&
        clientX <= chessBoardRect.right &&
        clientY >= chessBoardRect.top &&
        clientY <= chessBoardRect.bottom;

      // Keep piece inside board
      if (isInsideParent) {
        draggedPieceClone.style.left = `${
          clientX - draggedPieceClone.offsetWidth / 2
        }px`;
        draggedPieceClone.style.top = `${
          clientY - draggedPieceClone.offsetHeight / 2
        }px`;
      } else {
        if (clientX >= chessBoardRect.right) {
          draggedPieceClone.style.left = `${
            chessBoardRect.right - draggedPieceClone.offsetWidth / 2
          }px`;
        }

        if (clientX <= chessBoardRect.left) {
          draggedPieceClone.style.left = `${
            chessBoardRect.left - draggedPieceClone.offsetWidth / 2
          }px`;
        }

        if (clientY >= chessBoardRect.bottom) {
          draggedPieceClone.style.top = `${
            chessBoardRect.bottom - draggedPieceClone.offsetHeight / 2
          }px`;
        }
        if (clientY <= chessBoardRect.top) {
          draggedPieceClone.style.top = `${
            chessBoardRect.top - draggedPieceClone.offsetHeight / 2
          }px`;
        }
      }
    };

    const [clientX, clientY] = getEventPosition(event);

    moveAt({ clientX, clientY });

    let lastElementId = null;

    const addOrRemoveSquareHighlight = ({ event }) => {
      const eventPosition = getEventPosition(event) || lastTouchPosition;

      let elementBelowId = getKeyAtDomPos({
        pos: eventPosition,
        asWhite: isWhitePlayer,
        bounds: chessBoardRect,
      });

      let elementBelow = document.getElementById(elementBelowId);

      if (!elementBelow) {
        return;
      }

      if (!elementBelow.classList.contains("square")) {
        return;
      }

      // don't highlight if over same color piece or origin
      if (
        elementBelow.firstElementChild &&
        elementBelow.firstElementChild.classList.contains(
          `piece-${isWhitePiece ? "w" : "b"}`
        )
      ) {
        return;
      }

      if (lastElementId && lastElementId !== elementBelow.id) {
        document
          .getElementsByClassName("inner-border-highlight")[0]
          .classList.remove("inner-border-highlight");
      }

      if (elementBelow) {
        lastElementId = elementBelow.id;
        elementBelow.classList.add("inner-border-highlight");
      }
    };

    const handleMoveEvent = (event) => {
      if (!event.touches || event.touches.length < 2) {
        lastTouchPosition = getEventPosition(event);
      }
      const [clientX, clientY] = getEventPosition(event);
      moveAt({ clientX, clientY });
      addOrRemoveSquareHighlight({ event });
    };

    const handleEndEvent = (event) => {
      event.preventDefault();
      enableScroll();
      document.removeEventListener("mousemove", handleMoveEvent);
      document.removeEventListener("mouseup", handleEndEvent);
      document.removeEventListener("touchmove", handleMoveEvent);
      document.removeEventListener("touchend", handleEndEvent);

      draggedPieceClone.remove();
      draggedPiece.classList.remove("hide");

      const highlightedSquares = Array.from(
        document.getElementsByClassName("inner-border-highlight")
      );

      if (highlightedSquares && highlightedSquares.length) {
        highlightedSquares.forEach((highlightedSquare) =>
          highlightedSquare.classList.remove("inner-border-highlight")
        );
      }

      const eventPosition = getEventPosition(event) || lastTouchPosition;

      if (!eventPosition) {
        return;
      }

      const destination = getKeyAtDomPos({
        pos: eventPosition,
        asWhite: isWhitePlayer,
        bounds: chessBoardRect,
      });

      const origin = draggedPiece.parentElement.id;

      if (!destination || !origin) {
        return;
      }

      const isPromotionMove = isPromotion({
        from: origin,
        to: destination,
      });

      if (isPromotionMove) {
        handlePawnPromotionDialogue({
          from: origin,
          to: destination,
        });
        return;
      }

      makeMove({ from: origin, to: destination });
    };

    document.addEventListener("mousemove", handleMoveEvent);
    document.addEventListener("mouseup", handleEndEvent);
    document.addEventListener("touchmove", handleMoveEvent);
    document.addEventListener("touchend", handleEndEvent);
  };

  return boardState ? (
    <OuterBoardContainer>
      <NotationsContainer>
        <Notations isWhitePlayer={isWhitePlayer} />
        <BoardContainer id={CHESS_BOARD_ID}>
          {boardState.map((value) => (
            <Square
              key={value.id}
              id={value.id}
              squareType={value.squareType}
              piece={value.piece}
            />
          ))}
          {showPawnPromotionDialogue && (
            <PawnPromotionDialogue
              playerColor={chessState.chess.turn()}
              onClick={handlePawnPromotionPieceSelection}
              onClickClose={handleCloseButtonPress}
            />
          )}
        </BoardContainer>
      </NotationsContainer>
    </OuterBoardContainer>
  ) : (
    <OuterBoardContainer
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader size="30px" />
    </OuterBoardContainer>
  );
}
