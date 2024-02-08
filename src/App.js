import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createUseStyles } from 'react-jss';
import { SnackbarProvider } from 'notistack';

import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

import theme from './utils/theme';

const useStyles = createUseStyles((theme) => ({
  root: {
    maxWidth: '1440px',
    height: '100vh',
    margin: 'auto',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <Navbar />
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
