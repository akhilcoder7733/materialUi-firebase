import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import XIcon from "@mui/icons-material/X";

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "20vh",
  backgroundColor: "transparent",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const TextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledFacebookIcon = styled(FacebookIcon)(({ theme }) => ({
  color: "#3b5998",
  transition: "color 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    color: "#4267B2",
  },
}));

const StyledTwitterIcon = styled(TwitterIcon)(({ theme }) => ({
  color: "#1DA1F2",
  transition: "color 0.3s ease-in-out",
  cursor: "pointer",

  "&:hover": {
    color: "green",
  },
}));

const StyledXIcon = styled(XIcon)(({ theme }) => ({
  color: "#808080",
  transition: "color 0.3s ease-in-out",
  cursor: "pointer",

  "&:hover": {
    color: "#333333",
  },
}));

const StyledInstagramIcon = styled(InstagramIcon)(({ theme }) => ({
  color: "#E1306C",
  transition: "color 0.3s ease-in-out",
  cursor: "pointer",

  "&:hover": {
    color: "#8a3ab9",
  },
}));

function Footer() {
  return (
    <MainBox>
      <TextBox>
        <Typography variant="body2" color="textSecondary">
          © 2024 Your Company Name. All rights reserved.
        </Typography>
      </TextBox>
      <IconBox>
        <StyledFacebookIcon />
        <StyledTwitterIcon />
        <StyledXIcon />
        <StyledInstagramIcon />
      </IconBox>
    </MainBox>
  );
}

export default Footer;
