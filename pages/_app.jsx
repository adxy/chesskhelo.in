import GlobalStyle from "../styles/GlobalStyles";
import Theme from "../styles/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <GlobalStyle />
      <Component {...pageProps} />
    </Theme>
  );
}

export default MyApp;
