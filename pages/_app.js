import 'src/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux'
import store from 'src/stores/store';
import { GoogleOAuthProvider } from '@react-oauth/google'
import Head from 'next/head'
import 'react-quill/dist/quill.snow.css';

const theme = createTheme({

  typography: {
    fontFamily: 'Roboto:ital',

  }
})

function App({ Component, pageProps }) {
  const component = 'Trang chủ';
  return (
    <>
      <Head>
        <title>VieShare - {component}</title>
      </Head>
      <GoogleOAuthProvider
        clientId="284359152447-u83rbntt90ti88oagma0el08lhd72047.apps.googleusercontent.com"
      >
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App;

