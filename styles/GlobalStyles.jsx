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
.valid-square-to-move:before {
  content: '';
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background-color: black;
  opacity: 0.2;
}
.valid-square-to-move-capture:before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 6px rgba(0,0,0,0.2) inset;  
}
.highlight-last-move:before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: #00FFFF;
  opacity: 0.3; 
  z-index: 1;
}
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */     
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Chrome and Opera */
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
