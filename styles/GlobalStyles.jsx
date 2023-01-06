import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}
button {
  font-family: 'Inter', sans-serif;
}
a {
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  color: #fe78ab;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
}
a, a:focus {
  outline: none;
}
.disable-scroll{
  overflow: hidden;
  position: relative;
}
.hide{
    display: none;
}
.inner-border-highlight {
    border: solid 4px #FFFFFF;
}
.visible-mobile {
  display: none !important;
}

@media (max-width: 640px) {
  .visible-mobile {
    display: inline !important;
  }

  .hidden-mobile {
    display: none !important;
  }
}
`;

export default GlobalStyle;
