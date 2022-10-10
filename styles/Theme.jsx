import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    white: "#ffffff",
    black: "#000000",
    background: "#fffafa",
    standardSquareLight: "#E9E5D6",
    standardSquareDark: "#362706",
    primary: {
      yellow: "#f0bf00",
      blue: "#343399",
      green: "#359b9b",
      pink: "#fe78ab",
    },
    notationsGray: "#808080",
  },
  fontSize: {
    extraSmall: "0.5rem",
    small: "0.7rem",
    regularSmall: "0.8rem",
    regular: "1rem",
    medium: "1.2rem",
    large: "2rem",
    extraLarge: "2.5rem",
  },
  fontWeight: {
    extraLight: "100",
    light: "200",
    normal: "400",
    semiBold: "600",
    bold: "700",
    extraBold: "800",
  },
  layout: {
    spaces: {
      extraSmall: "6px",
      small: "8px",
      medium: "12px",
      large: "16px",
      extraLarge: "32px",
    },
    standardBorderRadius: "6px",
  },
  avatar: {
    size: {
      small: "20px",
      medium: "32px",
      large: "40px",
      extraLarge: "100px",
    },
  },
  button: {
    primary: {
      colors: {
        background: "#359b9b",
        hoverBackground: "#343399",
        font: "#ffffff",
        hoverFont: "#ffffff",
      },
    },
    secondary: {
      colors: {
        background: "#359b9b",
        hoverBackground: "#343399",
        font: "#359b9b",
        hoverFont: "#ffffff",
      },
    },
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
