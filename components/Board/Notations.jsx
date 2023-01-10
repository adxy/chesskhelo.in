import styled from "styled-components";

const NotationsContainer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 1;
  font-size: 2.5px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  fill: ${({ theme }) => theme.colors.notationsGray};
`;

const properties = [
  { x: "1", y: "6.0625", white: 8, black: 1 },
  { x: "1", y: "18.1875", white: 7, black: 2 },
  { x: "1", y: "30.3125", white: 6, black: 3 },
  { x: "1", y: "42.4375", white: 5, black: 4 },
  { x: "1", y: "54.5625", white: 4, black: 5 },
  { x: "1", y: "66.6875", white: 3, black: 6 },
  { x: "1", y: "78.8125", white: 2, black: 7 },
  { x: "1", y: "90.9375", white: 1, black: 8 },
  { x: "9.0625", y: "99.5", white: "a", black: "h" },
  { x: "21.1875", y: "99.5", white: "b", black: "g" },
  { x: "33.3125", y: "99.5", white: "c", black: "f" },
  { x: "45.4375", y: "99.5", white: "d", black: "e" },
  { x: "57.5625", y: "99.5", white: "e", black: "d" },
  { x: "69.6875", y: "99.5", white: "f", black: "c" },
  { x: "81.8125", y: "99.5", white: "g", black: "b" },
  { x: "93.9375", y: "99.5", white: "h", black: "a" },
];

export default function Notations({ isWhitePlayer }) {
  return (
    <NotationsContainer viewBox="0 0 100 100">
      {properties.map((row) => (
        <text className={"no-select"} key={row.x + row.y} x={row.x} y={row.y}>
          {isWhitePlayer ? row.white : row.black}
        </text>
      ))}
    </NotationsContainer>
  );
}
