import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#660000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#777777',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#111111',
    },
    // error: will use the default color
    // type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

console.log(theme);

export default theme;
