import React, { useContext, useState } from 'react';
import { Container, Grid, Button, Typography, makeStyles, Paper, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import { SetPopupContext } from '../App';
import apiList from '../lib/apiList';
import isAuth from '../lib/isAuth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  loginBox: {
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(apiList.login, loginDetails);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('type', response.data.type);
      setLoggedin(isAuth());
      setPopup({
        open: true,
        severity: 'success',
        message: 'Logged in successfully',
      });
    } catch (err) {
      console.error('Login error:', err);
      setPopup({
        open: true,
        severity: 'error',
        message: 'Login failed. Please check your credentials.',
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={3} className={classes.loginBox}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className={classes.imageContainer}>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="Sample image" className={classes.image} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={3}>
              <Grid item className={classes.header}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <Typography variant="body1">Welcome back! Login to your account.</Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Email address"
                  variant="outlined"
                  fullWidth
                  value={loginDetails.email}
                  onChange={(e) => handleInput('email', e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={loginDetails.password}
                  onChange={(e) => handleInput('password', e.target.value)}
                />
              </Grid>
              <Grid item className={classes.buttonContainer}>
              <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
              </Grid>
              <Grid item>
                <Typography variant="body3">Don't have an account? <a href="/signup" className="link-danger">Register</a></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
