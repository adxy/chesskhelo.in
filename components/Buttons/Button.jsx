import styled from "styled-components";
import Link from "next/link";

const ButtonWrap = styled.button`
  background-color: ${({ theme, buttonType }) =>
    buttonType === "primary"
      ? theme.button.primary.colors.background
      : theme.colors.white};
  margin: 0px;
  padding: 10px;
  width: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 0px;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  border: ${({ theme, buttonType }) =>
    buttonType === "primary"
      ? ""
      : `1px solid ${theme.button.secondary.colors.background}`};

  &:hover {
    background-color: ${({ theme, buttonType }) =>
      buttonType === "primary"
        ? theme.button.primary.colors.hoverBackground
        : theme.button.secondary.colors.hoverBackground};
  }
`;

const ButtonText = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, buttonType }) =>
    buttonType === "primary"
      ? theme.button.primary.colors.font
      : theme.button.secondary.colors.font};

  &:hover {
    color: ${({ theme, buttonType }) =>
      buttonType === "primary"
        ? theme.button.primary.colors.hoverFont
        : theme.button.secondary.colors.hoverFont};
  }
`;

const Button = ({ title, onPress, href, buttonType = "primary" }) => {
  const Button = (
    <ButtonWrap onClick={onPress} buttonType={buttonType}>
      <ButtonText buttonType={buttonType}>
        <div>{title}</div>
      </ButtonText>
    </ButtonWrap>
  );
  return (
    <>
      {href && <Link href={href}>{Button}</Link>}
      {!href && Button}
    </>
  );
};

export default Button;
