import styled from "styled-components";

const SquareBox = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
`;

export default function Square({ color }) {
  return <SquareBox color={color} />;
}
