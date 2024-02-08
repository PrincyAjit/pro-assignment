import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createUseStyles } from 'react-jss';

import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

import theme from './utils/theme';
import './App.css';

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
      <ThemeProvider theme={theme}>
        <Navbar />
        <BrowserRouter basename="/pro-assignment">
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
