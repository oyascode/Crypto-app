import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase';
import { CryptoState } from '../../CryptoContext';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    color: "#fff",
    borderRadius: 10
  },
  google: {
    display: "flex",
    flexDirection: "column",
    textAling: "center",
    padding: 24,
    paddingTop: 0,
    gap: 20,
    fontSize: 0,
  },
}));

const AuthModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res => {
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
        type: "success"
      })
      handleClose(); 
    })
    .catch(error => {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
      return
    })
  }

  return (
    <div>
      <Button
        variant='contained'
        onClick={handleOpen}
        style={{
          width: 85,
          height: 45,
          backgroundColor: "#EEBC1D"
        }}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position='static'
              style={{background: "transparent", color: "#fff"}}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{borderRadius: 10}}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose}/>}
            {value === 1 && <Signup handleClose={handleClose}/>}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{width: "100%", outline: "none"}}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthModal