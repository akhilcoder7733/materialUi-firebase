// src/components/Registration.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Backdrop,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { auth, firestore, registerUser } from "../../firebase"; // Import registerUser
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { styled } from "@mui/system";
import { collection, addDoc } from 'firebase/firestore';
import { Helmet } from "react-helmet";


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
  boxShadow: "0px 0px 56px 30px rgba(69, 69, 69, 0.6)",
  borderRadius: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const LoginBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // backgroundColor:"red",
  // padding:theme.spacing(3),
  gap: theme.spacing(5),
  width: "390px",
  height: "500px",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px",
}));

const LoginFormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
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

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "0.5em 1.8em",
  border: "2px solid #17C3B2",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "transparent",
  textAlign: "center",
  textTransform: "uppercase",
  fontSize: "14px",
  transition: "0.3s",
  zIndex: 1,
  fontFamily: "inherit",
  color: "#17C3B2",

  "&:before": {
    content: '""',
    width: 0,
    height: "300%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(45deg)",
    background: "#17C3B2",
    transition: "0.5s ease",
    display: "block",
    zIndex: -1,
  },

  "&:hover": {
    color: "#111",

    "&:before": {
      width: "105%",
    },
  },
}));

const Registration = ({ darkMode }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      setOpen(true);
      const userCredential = await registerUser(auth, email, password); // Use the registerUser function
      const user = userCredential.user;
  
      // Store user data in Firestore
      await addDoc(collection(firestore, 'users'), {
        uid: user.uid,
        name: name,
        phone: phone,
        email: email,
      });
  
      console.log("Registration successful!");
  
      setRegisterSuccess(true);
      setErrorMessage("");
  
      setTimeout(() => {
        setOpen(false);
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Registration failed:", error.message);
  
      setRegisterSuccess(false);
      setErrorMessage(
        "Registration failed. Please check your Internet connection."
      );
  
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
        <title>Sign Up</title>
        <meta name="description" content="Welcome to my website" />
        {/* Add more meta tags as needed */}
      </Helmet>
      <AutoBox>
        <LoginBox>
          <Typography
            variant="h3"
            fontWeight={600}
            style={{   fontFamily: "Fredoka, sans-serif",
          }}
          >
            Register
          </Typography>

          <LoginFormBox>
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Phone"
              type="string"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
           
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
            <StyledButton variant="contained" onClick={handleRegistration}>
              Register
            </StyledButton>
            <StyledTypo variant='subtitle2' darkMode={darkMode} onClick={()=>navigate("/login")}>
Already Have an account.?<b>Log In</b>
      </StyledTypo>
          </LoginFormBox>
        </LoginBox>
       
      </AutoBox>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <PulseLoader color="#06bf37" />
      </Backdrop>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert
          severity={registerSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {registerSuccess ? "User Registered successfully!" : errorMessage}
        </Alert>
      </Snackbar>
    </MainBox>
  );
};

export default Registration;
