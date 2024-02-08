const theme = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#1c81ff', // blue
      dark: '#1E5DFF',
    },
    secondary: {
      main: '#717171', // greyish
      dark: '#363636', // dark grey
      light: '#8C8C8C', // light grey
    },
    success: {
      main: '#14C042', // green
    },
    border: {
      main: '#EDEDED', // light grey variant
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Montserrat !important',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};
console.log({ theme });
export default theme;
