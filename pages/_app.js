import 'src/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux'
import store from 'src/stores/store';
const theme = createTheme({

  typography: {
    fontFamily: 'Roboto:ital',

  }
})

function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default App;

