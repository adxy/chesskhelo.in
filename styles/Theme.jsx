import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    white: "#ffffff",
    black: "#000000",
    primary: {
      yellow: "#f0bf00",
      blue: "#343399",
      green: "#359b9b",
      pink: "#fe78ab",
    },
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
  },
  avatar: {
    size: {
      small: "20px",
      medium: "32px",
      large: "40px",
      extraLarge: "100px",
    },
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
