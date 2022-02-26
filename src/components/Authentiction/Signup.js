import { Box, Button, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase';

const Signup = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {setAlert} = CryptoState()

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Password do not match",
        type: "error"
      });
      return
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      console.log("result", result)

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`
      })

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      })
      return
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
      <TextField 
        variant='outlined'
        label="Confirm Password"
        type="Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        fullWidth
      />
      <Button
        variant='contained'
        size="large"
        style={{background: "#EEBC1D"}}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default Signup