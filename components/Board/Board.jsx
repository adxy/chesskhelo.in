import styled from "styled-components";
import { useEffect } from "react";

import Square from "./Square";
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
} from "../../utils/constants";
import Chess from "../../utils/moveValidation";

const BoardContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  width: auto;
  max-width: 90vh;
  max-height: 90vh;
  aspect-ratio: 1;
  border-radius: 6px;
  resize: vertical;
`;

export default function Board({ isWhitePlayer = true, isPlayable = false }) {
  let boardProperties = [];

  if (isPlayable) {
    const chess = new Chess();
    useEffect(() => {
      // select all pieces
      const pieces = document.querySelectorAll(".piece");

      // add dragStart eventListener to all
      pieces.forEach((piece) => piece.addEventListener("dragstart", dragStart));

      function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
        setTimeout(() => {
          e.target.classList.add("hide");
        }, 0);
      }

      const squares = document.querySelectorAll(".square");

      squares.forEach((square) => {
        square.addEventListener("dragenter", dragEnter);
        square.addEventListener("dragover", dragOver);
        square.addEventListener("dragleave", dragLeave);
        square.addEventListener("drop", drop);
      });

      function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add("drag-over");
      }

      function dragOver(e) {
        e.preventDefault();
        e.target.classList.add("drag-over");
      }

      function dragLeave(e) {
        e.target.classList.remove("drag-over");
      }

      function drop(element) {
        // get the draggable element
        const id = element.dataTransfer.getData("text/plain");

        const draggedPiece = document.getElementById(id);

        const move = chess.move({
          from: draggedPiece.parentElement.id,
          to: element.target.classList.contains("piece")
            ? element.target.parentElement.id
            : element.target.id,
        });

        // if move is valid, we proceed
        if (move) {
          element.target.classList.remove("drag-over");

          console.log(move);
          switch (move.flags) {
            case STANDARD_CAPTURE:
              const parentElement = element.target.parentElement;
              parentElement.removeChild(element.target);
              parentElement.appendChild(draggedPiece);
              break;

            case KING_SIDE_CASTLING:
              handleCastling({
                element,
                draggedPiece,
                moveColor: move.color,
              });

              break;

            case QUEEN_SIDE_CASTLING:
              handleCastling({
                element,
                draggedPiece,
                moveColor: move.color,
                kingSide: false,
              });

              break;

            default:
              element.target.appendChild(draggedPiece);
          }

          // display the draggable element
          draggedPiece.classList.remove("hide");
        } else {
          // reset the dragged piece
          draggedPiece.classList.remove("hide");
        }
      }
    });

    const handleCastling = ({
      element,
      draggedPiece,
      moveColor,
      kingSide = true,
    }) => {
      let rookPositionId =
        moveColor === MOVE_COLOR_WHITE
          ? WHITE_ROOK_QUEEN_SIDE_ID
          : BLACK_ROOK_QUEEN_SIDE_ID;

      let rookDestinationId =
        moveColor === MOVE_COLOR_WHITE
          ? CASTLED_WHITE_ROOK_QUEEN_SIDE_DESTINATION_ID
          : CASTLED_BLACK_ROOK_QUEEN_SIDE_DESTINATION_ID;

      if (kingSide) {
        rookPositionId =
          moveColor === MOVE_COLOR_WHITE
            ? WHITE_ROOK_KING_SIDE_ID
            : BLACK_ROOK_KING_SIDE_ID;

        rookDestinationId =
          moveColor === MOVE_COLOR_WHITE
            ? CASTLED_WHITE_ROOK_KING_SIDE_DESTINATION_ID
            : CASTLED_BLACK_ROOK_KING_SIDE_DESTINATION_ID;
      }

      element.target.appendChild(draggedPiece);
      const rook = document.getElementById(rookPositionId);
      const rookDestination = document.getElementById(rookDestinationId);
      rook.parentElement.removeChild(rook);
      rookDestination.appendChild(rook);
    };
  }

  // Generate board properties & arrange pieces to default location
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

  // Flip board for black player
  if (!isWhitePlayer) {
    boardProperties = boardProperties.reverse();
  }

  return (
    <BoardContainer id={CHESS_BOARD_ID}>
      {boardProperties.map((value) => (
        <Square
          key={value.id}
          id={value.id}
          type={value.type}
          piece={value.piece}
        />
      ))}
    </BoardContainer>
  );
}
