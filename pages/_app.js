import "bootstrap/dist/css/bootstrap.min.css";
import "src/styles/globals.css";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "src/stores/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import "react-quill/dist/quill.snow.css";
import { EmptyLayout } from "src/components/layouts";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto:ital",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1200,
      xl: 1400,
    },
  },
});

function App({ Component, pageProps }) {
  const component = "Trang chủ";
  const Layout = Component.getLayout || EmptyLayout;

  return (
    <>
      <Head>
        <title>VieShare - {component}</title>
      </Head>
      <GoogleOAuthProvider clientId="284359152447-u83rbntt90ti88oagma0el08lhd72047.apps.googleusercontent.com">
        <Provider store={store}>
          <ScopedCssBaseline>
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ScopedCssBaseline>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
