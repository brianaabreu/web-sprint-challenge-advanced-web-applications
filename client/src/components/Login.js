import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    credentials: {
      username: '',
      password: '',
    },
    value: '',
  });

  const handleChanges = e => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };
  const login = e => {
    e.preventDefault();
    setState({
      value: '',
    });
    axiosWithAuth()
      .post('/login', state.credentials)
      .then(res => {
        if (window.localStorage) {
          window.localStorage.setItem('token', res.data.payload);
        }
        history.push('/colors');
      })
      .catch(err => {
        console.log('there was an error: ', err);
      });
  };

  return (
    <Grid container justify='center'>
      <Grid item>
        <form>
          <TextField
            variant='outlined'
            type='text'
            name='username'
            autoComplete='on'
            value={state.username}
            id='username'
            placeholder='Username'
            onChange={handleChanges}
          />
          <TextField
            variant='outlined'
            type='password'
            name='password'
            autoComplete='on'
            value={state.password}
            id='password'
            placeholder='Password'
            onChange={handleChanges}
          />
          <Button variant='outlined' onClick={login}>
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
