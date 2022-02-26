import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase';

const Login = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: " Please fill all the fields",
        type: "error"
      })  
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`
      })

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
  };

  return (
    <Box
      p={3}
      style={{display: "flex", flexDirection: "column", gap: "20px"}}
    >
      <TextField 
        variant='outlined'
        label="Enter Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
      />
      <TextField 
        variant='outlined'
        label="Enter Password"
        type="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        fullWidth
      />
      
      <Button
        variant='contained'
        size="large"
        style={{background: "#EEBC1D"}}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login