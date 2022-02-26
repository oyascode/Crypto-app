import { 
  AppBar, 
  Container, 
  createTheme, 
  MenuItem, 
  Select, 
  Toolbar, 
  Typography, 
  ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useNavigate} from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentiction/AuthModal';
import UserSidebar from './Authentiction/UserSidebar';


const useStyles = makeStyles(() => ({
  selectCurr: {
    width: 100,
    height: 40,
    marginRight: 15,
  },

  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fonWeight: "bold",
    cursor: "pointer",
  }
}))
const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate(); 

  const { currency, setCurrency, user} = CryptoState()
    console.log(currency);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark'
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography
            variant='h6' 
            className={classes.title}
            onClick={() => navigate('/')}
            >
              Crypto Cruncher
            </Typography>
            <Select 
            variant="outlined" 
            className={classes.selectCurr}
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"CAD"}>CAD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            { user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
};

export default Header;
