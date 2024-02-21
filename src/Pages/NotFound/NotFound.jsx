import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { styled } from "@mui/system";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MainBox = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
}));

const Heading = styled(Typography)(({ theme }) => ({
    fontFamily: "Fredoka, sans-serif",
    fontSize: "7rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    fontFamily: "Fredoka, sans-serif",
    fontSize: "1.5rem",
    color: theme.palette.text.secondary,
}));



const StyledButton = styled(Button)(({ theme, darkMode }) => ({
    appearance: "none",
    backgroundColor: "transparent",
    border: darkMode ? "2px solid #fff" : "2px solid #3B3B3B",
    borderRadius: "15px",
    boxSizing: "border-box",
    color: darkMode ? "#fff" : "#3B3B3B",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: "Fredoka, sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "normal",
    margin: 0,
    minHeight: "40px",
    minWidth: 0,
    outline: "none",
    padding: "6px 15px",
    textAlign: "center",
    textDecoration: "none",
    transition: "all 300ms cubic-bezier(.23, 1, 0.32, 1)",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    // width: '100%',
    willChange: "transform",
    
  
    "&:disabled": {
      pointerEvents: "none",
    },
  
    "&:hover": {
      color: "#fff",
      backgroundColor: "#1A1A1A",
      boxShadow: `rgba(0, 0, 0, 0.25) 0 8px 15px`,
      transform: "translateY(-2px)",
    },
  
    "&:active": {
      boxShadow: "none",
      transform: "translateY(0)",
    },
  }));

function NotFound({darkMode}) {
    return (
        <MainBox>
          <Helmet>
        <title>Page not Found</title>
        <meta name="description" content="Welcome to my website" />
        {/* Add more meta tags as needed */}
      </Helmet>
            <Heading variant="h1" data-aos="flip-up" data-aos-delay="100">404</Heading>
            <Subtitle variant="subtitle1" data-aos="flip-up" data-aos-delay="300">Page Not Found</Subtitle>
            <Typography variant="body1" style={{  fontFamily: "Fredoka, sans-serif", textAlign:"center"
}} data-aos="flip-up" data-aos-delay="500">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</Typography>
            <StyledButton darkMode={darkMode} component={Link} to="/" variant="contained">Go Back to Home</StyledButton>
        </MainBox>
    )
}

export default NotFound;
