import React, { useState } from 'react';
import { TextField, Button, Backdrop, Snackbar, Alert, Box, Typography, IconButton } from '@mui/material';
import { auth, loginUser } from '../../firebase';  // Import loginUser
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import {styled} from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import { Helmet } from 'react-helmet';

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // marginTop: theme.spacing(1),
  minHeight: "90vh",
  [theme.breakpoints.down("sm")]:{
    minHeight: "60vh",

  }
}));

const AutoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow:"0px 0px 56px 30px rgba(69, 69, 69, 0.6)",
  borderRadius:"10px",
  [theme.breakpoints.down("sm")]:{
    flexDirection:"column",
  }
}));

const LoginBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // backgroundColor:"red",
  // padding:theme.spacing(3),
  gap:theme.spacing(5),
  width:"390px",
  height:"500px",
  borderTopLeftRadius:"10px",
  borderBottomLeftRadius:"10px",
}));

const LoginFormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection:"column",
  gap:theme.spacing(2),
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap:theme.spacing(3),
}));

const StyledTypo = styled(Typography)(({ theme, darkMode }) => ({
  textAlign:"center",
  color:"#5e5e5e",
  fontSize:"14px",
  cursor:"pointer",
  "&:hover":{
    color: darkMode ? "#fff" : "#1649f2"
  }
}));
const StyledSub = styled(Typography)(({ theme, darkMode }) => ({
  textAlign:"center",
  color:"#5e5e5e",
  fontSize:"14px",
}));

const StyledIconButton = styled(IconButton)(({ theme, bcolor }) => ({
  border: '1px solid #5e5e5e',
  padding: '10px',
  width:"45px",
  height:"45px",
  transition:"transform 0.3s ease-out",
  '&:hover': {
    color: bcolor, // Set the color based on the bcolor prop
    transform:"scale(1.2)"
  },
}));


const StyledButton = styled(Button)(({ theme }) => ({
  padding: '0.5em 2.8em',
  border: '2px solid #17C3B2',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontSize: '14px',
  transition: '0.3s',
  zIndex: 1,
  fontFamily: 'inherit',
  color: '#17C3B2',

  '&:before': {
    content: '""',
    width: 0,
    height: '300%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    background: '#17C3B2',
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

const Login = ({darkMode}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setOpen(true);
      await loginUser(auth, email, password);
      console.log('Login successful!');
      
      setLoginSuccess(true);
      setErrorMessage(''); // Clear any previous error message

      setTimeout(() => {
        setOpen(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Login failed:', error.message);
      setLoginSuccess(false);
setErrorMessage('Login failed. Please check your email and password.');      
      
      // Set a timeout to close the error Snackbar after 3 seconds
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MainBox>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Welcome to my website" />
        {/* Add more meta tags as needed */}
      </Helmet>
     <AutoBox>
     <LoginBox>
     <Typography variant='h3' fontWeight={600} style={{  fontFamily: "Fredoka, sans-serif",
}}>Login</Typography>
     <IconBox>
      <StyledIconButton bcolor="#1b59f5">
        <FacebookIcon data-aos="flip-left" data-aos-delay="100"/>
      </StyledIconButton>
      <StyledIconButton bcolor="#bf2c73">
        <InstagramIcon data-aos="flip-left" data-aos-delay="200"/>
      </StyledIconButton>
      <StyledIconButton bcolor="#7cbf9a">
        <GoogleIcon data-aos="flip-left" data-aos-delay="300"/>
      </StyledIconButton>
    </IconBox>
    <LoginFormBox>
    <StyledSub>Or Login with</StyledSub>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton variant="contained" onClick={handleLogin}>
        Login
      </StyledButton>
      <StyledTypo variant='subtitle2' darkMode={darkMode} onClick={()=>navigate("/forgot-passsword")}>
Forgot Password?
      </StyledTypo>
    </LoginFormBox>
     </LoginBox>
    
     </AutoBox>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <PulseLoader color='#06bf37'/>
      </Backdrop>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert
          severity={loginSuccess ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {loginSuccess
            ? 'User successfully logged in!'
            : errorMessage
          }
        </Alert>
      </Snackbar>
    </MainBox>
  );
};

export default Login;


  // font-family: "Kanit", sans-serif;