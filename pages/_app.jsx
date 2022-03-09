import { useEffect } from "react";
import GlobalStyle from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
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

    function drop(e) {
      e.target.classList.remove("drag-over");

      // get the draggable element
      const id = e.dataTransfer.getData("text/plain");
      const draggable = document.getElementById(id);

      // add it to the drop target
      e.target.appendChild(draggable);

      // display the draggable element
      draggable.classList.remove("hide");
    }
  });

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
