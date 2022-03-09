import styled from "styled-components";

const SquareBox = styled.div`
  display: block;
  width: 12.5%;
  height: 12.5%;
  background-color: ${({ type }) => (type === "l" ? "#E9E5D6" : "#362706")};
`;

export default function Square({ key, id, type }) {
  return (
    <SquareBox key={key} id={id} type={type}>
      {id}
    </SquareBox>
  );
}
