import { Paper, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2'
import { Link ,useNavigate} from 'react-router-dom';


// Validation schema using Yup
const schema = Yup.object().shape({
  username: Yup.string()
  .matches(/^[a-zA-Z][a-zA-Z0-9._]{3,15}$/, "Username must be 4-16 characters, start with a letter, and contain only letters, numbers, dots, or underscores.")
  .required("Username is required"),

  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  cPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const handleData = (data) => {
    localStorage.setItem(data.username, JSON.stringify(data));
    console.log(data)
    Swal.fire({
      title: "Sign Up Successfull",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
    reset();
  };

  const paperStyle = {
    width: 400,
    margin: '20px auto',
    padding: '20px',
    textAlign: 'center',
    display: 'grid',
    gap: '20px',
  };

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <div>
      <h1 style={{textAlign:"center"}}>SignUp</h1>
      <Paper elevation={20} style={paperStyle} component="form" onSubmit={handleSubmit(handleData)}>
        <Typography variant="h6">Create Account</Typography>
        <TextField label="User Name" {...register('username')} error={!!errors.username} helperText={errors.username?.message} />
        <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label="Age" type="number" {...register('age')} error={!!errors.age} helperText={errors.age?.message} />
        <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
        <TextField label="Confirm Password" type="password" {...register('cPassword')} error={!!errors.cPassword} helperText={errors.cPassword?.message} />
        <Button variant="contained" type="submit">Sign Up</Button>
        <Typography variant="body1">Already have an account?{' '}
           <Link to="/login" style={{ color: 'blue', cursor: 'pointer', textDecoration: 'none' }}>Login </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default SignUp;
