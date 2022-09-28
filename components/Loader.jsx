import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${({ theme }) => theme.colors.primary.blue};
  border-right: 2px solid ${({ theme }) => theme.colors.primary.blue};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.blue};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.green};
  background: transparent;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`;

export default function Loader({ size }) {
  return <LoaderContainer size={size} />;
}
