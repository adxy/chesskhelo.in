import styled from "styled-components";
import Link from "next/link";

const getBackgroundColor = ({ buttonType, disabled, theme }) => {
  if (buttonType === "primary") {
    return disabled
      ? theme.button.primary.colors.backgroundDisabled
      : theme.button.primary.colors.background;
  }
  return theme.colors.white;
};

const getBorder = ({ buttonType, disabled, theme }) => {
  if (buttonType !== "primary") {
    return disabled
      ? `1px solid ${theme.button.secondary.colors.backgroundDisabled}`
      : `1px solid ${theme.button.secondary.colors.background}`;
  }
  return "";
};

const getBorderHover = ({ buttonType, disabled, theme }) => {
  if (buttonType !== "primary") {
    return disabled
      ? `1px solid ${theme.button.secondary.colors.backgroundDisabled}`
      : `1px solid ${theme.button.secondary.colors.backgroundHover}`;
  }
  return "";
};

const getHoverBackgroundColor = ({ buttonType, disabled, theme }) => {
  if (disabled) {
    return "";
  }

  return buttonType === "primary"
    ? theme.button.primary.colors.hoverBackground
    : theme.button.secondary.colors.hoverBackground;
};

const getFontColor = ({ buttonType, disabled, theme }) => {
  if (disabled) {
    return buttonType === "primary"
      ? theme.button.primary.colors.fontDisabled
      : theme.button.secondary.colors.fontDisabled;
  }
  return buttonType === "primary"
    ? theme.button.primary.colors.font
    : theme.button.secondary.colors.font;
};

const getFontColorHover = ({ buttonType, disabled, theme }) => {
  if (disabled) {
    return buttonType === "primary"
      ? theme.button.primary.colors.font
      : theme.button.secondary.colors.hoverFontDisabled;
  }
  return buttonType === "primary"
    ? theme.button.primary.colors.font
    : theme.button.secondary.colors.hoverFont;
};

const ButtonWrap = styled.button`
  background-color: ${({ buttonType, disabled, theme }) =>
    getBackgroundColor({
      buttonType,
      disabled,
      theme,
    })};
  margin: 0px;
  padding: 10px;
  width: max-content;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 0px;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  border: ${({ buttonType, disabled, theme }) =>
    getBorder({ buttonType, disabled, theme })};
  color: ${({ buttonType, disabled, theme }) =>
    getFontColor({ buttonType, disabled, theme })};

  &:hover {
    background-color: ${({ theme, buttonType, disabled }) =>
      getHoverBackgroundColor({ buttonType, disabled, theme })};
    color: ${({ buttonType, disabled, theme }) =>
      getFontColorHover({ buttonType, disabled, theme })};

    border: ${({ buttonType, disabled, theme }) =>
      getBorderHover({ buttonType, disabled, theme })};
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
`;

const Button = ({ title, onPress, href, buttonType = "primary", disabled }) => {
  const Button = disabled ? (
    <ButtonWrap buttonType={buttonType} disabled={disabled}>
      <ButtonText buttonType={buttonType} disabled={disabled}>
        <div>{title}</div>
      </ButtonText>
    </ButtonWrap>
  ) : (
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
