import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
}
button {
  font-family: 'Nunito Sans', sans-serif;
}
a {
  font-family: 'Nunito Sans', sans-serif;
  text-decoration: none;
  color: inherit;
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
.drag-over {
    border: solid 4px #FFFFFF;
}
`;

export default GlobalStyle;
