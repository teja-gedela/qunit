// components/LoginSignupButtons.js
import React, { useState, useEffect } from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography } from '@mui/material';
import axios from 'axios';

const LoginSignupButtons = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/login', {
        email: username,
        password,
      });
      console.log(response.data); // Handle the login success here
      const user = response.data
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setLoggedInUser(user);
      setOpenLogin(false);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid username or password'); // Set the error message
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/login', {
        email,
        firstName,
        lastName,
        password,
      });
      console.log(response.data); // Handle the signup success here
      setOpenSignup(false);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setSignupError(error.response.data.error);
      } else {
        setSignupError('An error occurred during signup');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <Box ml="auto" display="flex" alignItems="center">
        <Typography variant="body2" color="textSecondary" sx={{ marginRight: 2 }}>
          Welcome {loggedInUser.email}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box ml="auto" display="flex" alignItems="center">
      <Button color="inherit" onClick={() => setOpenLogin(true)}>
        Login
      </Button>
      <Button color="inherit" onClick={() => setOpenSignup(true)}>
        Sign Up
      </Button>

      {/* Login Dialog */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {loginError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogin(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={openSignup} onClose={() => setOpenSignup(false)}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {signupError && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {signupError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSignup(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSignup}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginSignupButtons;
