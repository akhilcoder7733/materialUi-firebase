import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    minHeight:"40vh",
    gap: theme.spacing(4),
  },
}));
const HeadBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {},
}));
const ButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection:"column",
    gap: theme.spacing(2),
  },
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
  fontFamily: "Fredoka, sans-serif",
  textAlign:"center"
}));

const StyledButton = styled(Button)(({ theme, darkMode }) => ({
  appearance: "none",
  backgroundColor: "transparent",
  border: darkMode ? "2px solid #fff" : "2px solid #3B3B3B",
  borderRadius: "15px",
  boxSizing: "border-box",
  color: darkMode ? "#fff" : "#3B3B3B",
  cursor: "pointer",
  display: "flex",
  fontFamily:
    'Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: "16px",
  fontWeight: 600,
  // lineHeight: "normal",
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
  ".arrow":{
    transition:"transform 0.3s ease-in-out"
  }
  ,
  "&:hover .arrow": {
    transform: "translateX(4px)",
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
function Welcome({ darkMode }) {
  return (
    <MainBox>
      <HeadBox>
        <StyledTypo variant="h3" data-aos="flip-up" data-aos-delay="100">
          Welcome to Hello World!
        </StyledTypo>
        <StyledTypo variant="body1" data-aos="flip-up" data-aos-delay="300">
          Enjoy this huge, 100% free and open source collection of HTML and CSS
          text effect code
        </StyledTypo>
        <StyledTypo variant="body1" data-aos="flip-up" data-aos-delay="500">
          The font-style property is mostly used to specify italic text.{" "}
        </StyledTypo>
      </HeadBox>
      <ButtonsBox>
        <StyledButton darkMode={darkMode}>Get Started!<ArrowForwardIcon className="arrow"/></StyledButton>
        <StyledButton darkMode={darkMode}>Join Us!</StyledButton>
      </ButtonsBox>
    </MainBox>
  );
}

export default Welcome;
