import "src/styles/globals.css";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store, { persistor } from "src/stores/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { EmptyLayout } from "src/components/layouts";
import { PersistGate } from "redux-persist/integration/react";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BaseOptionChartStyle } from "src/components/chart/BaseOptionChart";
import { ToastContainer } from "react-toastify";
const theme = createTheme({
  typography: {
    fontFamily: "Roboto:ital",
  },
});

function App({ Component, pageProps }) {
  const component = "Trang chủ";
  const Layout = Component.getLayout || EmptyLayout;

  return (
    <>
    <ToastContainer />
      <Head>
        <title>VieShare - {component}</title>
      </Head>
      <GoogleOAuthProvider clientId="284359152447-u83rbntt90ti88oagma0el08lhd72047.apps.googleusercontent.com">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ScopedCssBaseline>
              <ThemeProvider theme={theme}>
                <Layout>
                  <BaseOptionChartStyle/>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </ScopedCssBaseline>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
