import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import LoginImg from '../../../assets/forgot_password.svg';
import { useFirebase } from '../../../FirebaseContext';
import { sendPasswordResetEmail } from 'firebase/auth';

const MainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
}));

const AutoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 0px 56px 30px rgba(69, 69, 69, 0.6)',
  borderRadius: '10px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const LoginBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.spacing(5),
  width: '390px',
  height: '500px',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  
}));

const LoginFormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const RightBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  boxShadow: 'inset 0px 0px 80px 31px rgba(0,0,0,0.3)',
  backgroundColor: '#3461f7',
  gap: theme.spacing(3),
  width: '390px',
  height: '500px',
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '0.5em .8em',
  border: '2px solid #2f95fa',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontSize: '14px',
  transition: '0.3s',
  zIndex: 1,
  fontFamily: 'inherit',
  color: '#2f95fa',

  '&:before': {
    content: '""',
    width: 0,
    height: '300%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(30deg)',
    background: '#2f95fa',
    transition: '0.5s ease',
    display: 'block',
    zIndex: -1,
  },

  '&:hover': {
    color: '#111',

    '&:before': {
      width: '105%',
    },
  },
}));

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const firebase = useFirebase();

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(firebase.auth, email);
      setSnackbarMessage('Password reset email sent!');
      console.log("sent reset link")
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.code === 'auth/user-not-found') {
        setSnackbarMessage('Email not registered. Please check your email.');
      } else {
        setSnackbarMessage('Error resetting password. Please try again later.');
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <MainBox>
      <AutoBox>
      <RightBox>
          <img src={LoginImg} alt="imt" style={{ width: '300px' }} />
          <Box>
            <Typography
              variant="subtitle1"
              style={{
                textAlign: 'center',
                color: '#dedcdc',
                fontSize: '14px',
                fontFamily: 'Kanit, sans-serif',
                padding: '25px',
              }}
            >
              Enter your Email address associated with your account and we'll send you a link to reset your password.
            </Typography>
          </Box>
        </RightBox>

        <LoginBox>
          <Typography variant="h3" fontWeight={600} textAlign="center">
            Forgot Password?
          </Typography>
          <LoginFormBox>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledButton variant="contained" onClick={handleResetPassword}>
              Reset Password
            </StyledButton>
          </LoginFormBox>
        </LoginBox>

        
      </AutoBox>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainBox>
  );
}

export default ForgotPassword;
