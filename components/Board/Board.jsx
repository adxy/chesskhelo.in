import styled from "styled-components";
import { useEffect, useState } from "react";

import Square from "./Square";
import Notations from "./Notations";

import {
  ALPHABETS,
  BLACK_ROOK_KING_SIDE_ID,
  BLACK_ROOK_QUEEN_SIDE_ID,
  CASTLED_BLACK_ROOK_KING_SIDE_DESTINATION_ID,
  CASTLED_BLACK_ROOK_QUEEN_SIDE_DESTINATION_ID,
  CASTLED_WHITE_ROOK_KING_SIDE_DESTINATION_ID,
  CASTLED_WHITE_ROOK_QUEEN_SIDE_DESTINATION_ID,
  CHESS_BOARD_ID,
  KING_SIDE_CASTLING,
  MOVE_COLOR_WHITE,
  PIECE_DEFAULT_POSITION_LIST,
  QUEEN_SIDE_CASTLING,
  SQUARE_TYPE_DARK,
  SQUARE_TYPE_LIGHT,
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
import Chess from "../../utils/moveValidation";
import PawnPromotionDialogue from "./PawnPromotionDialogue";
import { useSocket } from "../../store/socket";

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
  border-radius: 6px;
`;

const NotationsContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  height: 100%;
  width: 100%;
`;

const OuterBoardContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  height: 70vh;
  width: auto;
  max-width: 90vh;
  max-height: 90vh;
  resize: vertical;
`;

const chess = new Chess();

export default function Board({ isWhitePlayer = true, isPlayable = false }) {
  const [socketState, socketStateActions] = useSocket();

  const socket = socketState.socket;
  let boardProperties = [];

  const [showPawnPromotionDialogue, setShowPawnPromotionDialogue] =
    useState(false);
  const [promotionMoves, setPromotionMoves] = useState({
    from: "",
    to: "",
  });
  const [piecesPromotedCount, setPiecesPromotedCount] = useState(0);

  const isPromotion = ({ from, to }) => {
    const piece = chess.get(from);

    if (piece?.type !== "p") {
      return false;
    }

    if (piece.color !== chess.turn()) {
      return false;
    }

    if (!["1", "8"].some((num) => to.endsWith(num))) {
      return false;
    }

    return chess
      .moves({ square: from, verbose: true })
      .map((move) => move.to)
      .includes(to);
  };

  const makeMove = ({ from, to, promotion = 0 }) => {
    const moveObject = { from, to };
    if (promotion) {
      moveObject.promotion = promotion;
    }

    const move = chess.move(moveObject);

    if (move) {
      const destinationSquare = document.getElementById(to);
      const draggedPiece = document.getElementById(from).firstChild;
      const destinationPiece = document.getElementById(to).firstChild;
      destinationSquare.classList.remove("drag-over");

      switch (move.flags) {
        case STANDARD_CAPTURE:
          destinationSquare.removeChild(destinationPiece);
          destinationSquare.appendChild(draggedPiece);
          break;

        case KING_SIDE_CASTLING:
          handleCastling({
            moveColor: move.color,
          });
          break;

        case QUEEN_SIDE_CASTLING:
          handleCastling({
            moveColor: move.color,
            kingSide: false,
          });
          break;

        case NON_CAPTURE_PROMOTION:
          handlePawnPromotion({
            draggedPiece,
            color: move.color,
            promotion,
            destinationSquare,
          });
          break;

        case CAPTURE_PROMOTION:
          handlePawnPromotion({
            draggedPiece,
            color: move.color,
            promotion,
            destinationSquare,
            capture: true,
          });
          break;

        case EN_PASSANT_CAPTURE:
          const capturedSquare = document.getElementById(
            String(move.to[0] + move.from[1])
          );
          capturedSquare.removeChild(capturedSquare.firstChild);
          destinationSquare.appendChild(draggedPiece);
          break;

        default:
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
    promotedPiece.addEventListener("dragstart", dragStart);
    promotedPiece.addEventListener("dragend", dragEnd);
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
      const pieces = document.querySelectorAll(".piece");

      pieces.forEach((piece) => piece.addEventListener("dragstart", dragStart));
      pieces.forEach((piece) => piece.addEventListener("dragend", dragEnd));

      const squares = document.querySelectorAll(".square");

      squares.forEach((square) => {
        square.addEventListener("dragenter", dragEnter);
        square.addEventListener("dragover", dragOver);
        square.addEventListener("dragleave", dragLeave);
        square.addEventListener("drop", drop);
      });
    }, []);
  }

  const dragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
      e.target.classList.add("hide");
    }, 0);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  };

  const dragLeave = (e) => {
    e.target.classList.remove("drag-over");
  };

  const dragEnd = (e) => {
    const draggedPiece = document.getElementById(e.path[0].id);
    draggedPiece.classList.remove("hide");
  };

  const drop = (element) => {
    const id = element.dataTransfer.getData("text/plain");
    const draggedPiece = document.getElementById(id);
    const dropSquareId = element.target.classList.contains("piece")
      ? element.target.parentElement.id
      : element.target.id;

    const isPromotionMove = isPromotion({
      from: draggedPiece.parentElement.id,
      to: dropSquareId,
    });

    if (isPromotionMove) {
      handlePawnPromotionDialogue({
        from: draggedPiece.parentElement.id,
        to: dropSquareId,
      });
      return;
    }

    makeMove({ from: draggedPiece.parentElement.id, to: dropSquareId });
  };

  for (let i = 8; i > 0; i -= 1) {
    for (let j = 8; j > 0; j -= 1) {
      boardProperties.push({
        type: (i + j) % 2 === 0 ? SQUARE_TYPE_LIGHT : SQUARE_TYPE_DARK,
        id: `${ALPHABETS[ALPHABETS.length - j]}${i}`,
        piece: Object.keys(PIECE_DEFAULT_POSITION_LIST).includes(
          `${ALPHABETS[ALPHABETS.length - j]}${i}`
        )
          ? PIECE_DEFAULT_POSITION_LIST[
              `${ALPHABETS[ALPHABETS.length - j]}${i}`
            ]
          : false,
      });
    }
  }

  if (!isWhitePlayer) {
    boardProperties = boardProperties.reverse();
  }

  return (
    <OuterBoardContainer>
      <NotationsContainer>
        <Notations isWhitePlayer={isWhitePlayer} />
        <BoardContainer id={CHESS_BOARD_ID}>
          {boardProperties.map((value) => (
            <Square
              key={value.id}
              id={value.id}
              type={value.type}
              piece={value.piece}
            />
          ))}
          {showPawnPromotionDialogue && (
            <PawnPromotionDialogue
              playerColor={chess.turn()}
              onClick={handlePawnPromotionPieceSelection}
              onClickClose={handleCloseButtonPress}
            />
          )}
        </BoardContainer>
      </NotationsContainer>
    </OuterBoardContainer>
  );
}
