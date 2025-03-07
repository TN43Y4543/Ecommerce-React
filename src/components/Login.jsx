import React, { useState } from 'react';
import { Paper, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z][a-zA-Z0-9._]{3,15}$/, "Username must be 4-16 characters, start with a letter, and contain only letters, numbers, dots, or underscores.")
    .required("Username is required"),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleData = (data) => {
    let storedData = localStorage.getItem(data.username);
    
    if (!storedData) {
      setLoginError('User does not exist');
    } else {
      storedData = JSON.parse(storedData);
      
      if (storedData.password !== data.password) {
        setLoginError('Incorrect password');
      } else {
        setLoginError(null);
        navigate('/'); // Redirect to home page on successful login
      }
    }
  };

  const paperStyle = {
    width: 500, // Increased width
    margin: '50px auto', // More margin for better positioning
    padding: '40px', // Increased padding for more space inside
    textAlign: 'center',
    display: 'grid',
    gap: '25px', // Increased gap for better spacing
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <div style={{ margin: "100px 0", height: "450px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={20} style={paperStyle} component="form" onSubmit={handleSubmit(handleData)}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>LOGIN</Typography>
        <TextField
          label="User Name"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        
        {loginError && <Typography color="error">{loginError}</Typography>}

        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Login
        </Button>

        <Typography variant="body1">
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'blue', cursor: 'pointer', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default Login;
