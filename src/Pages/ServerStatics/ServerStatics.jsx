import React from "react";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import ServerIm from "../../assets/svgs/server.svg";
import StaticIm from "../../assets/svgs/statics.svg";

const MainBox = styled(Box)(({ theme }) => ({
  //   minHeight: "80vh",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(1),
//   backgroundColor: "red",
  [theme.breakpoints.down("sm")]: {
    minHeight: "40vh",
    // gap: theme.spacing(4),
  },
}));

const ServerBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  minWidth: "100%",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
//   backgroundColor: "yellow",
  [theme.breakpoints.down("sm")]: {
    minHeight: "40vh",
    // gap: theme.spacing(4),
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "40vh",
    // gap: theme.spacing(4),
    flexDirection: "column",
    gap: theme.spacing(0),

  },
}));

const StaticBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  minWidth: "100%",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
//   backgroundColor: "green",
  [theme.breakpoints.down("sm")]: {
    minHeight: "40vh",
    // gap: theme.spacing(4),
    flexDirection: "column-reverse",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "40vh",
    // gap: theme.spacing(4),
    flexDirection: "column-reverse",
    gap: theme.spacing(0),

  },
}));

const InnerOne = styled(Box)(({ theme }) => ({
  minHeight: "75vh",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
//   backgroundColor: "pink",
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    minHeight: "25vh",
    // gap: theme.spacing(4),
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    width:"70%"
  },
}));


const InnerTwo = styled(Box)(({ theme }) => ({
  minHeight: "35vh",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  // backgroundColor: "violet",
  width: "50%",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    minHeight: "40vh",
    // gap: theme.spacing(4),
    width: "100%",
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    width:"70%",
  },
}));

const StyledImage = styled("img")(({ theme }) => ({
    width:"600px",
  [theme.breakpoints.down("sm")]: {
    width:"300px",
  },
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
    fontFamily: "Fredoka, sans-serif",
    textAlign:"center"
  }));

function ServerStatics() {
  return (
    <MainBox>
      <ServerBox>
        <InnerOne>
          <StyledImage
          src={ServerIm}
          alt="serverimge"/>
        </InnerOne>
        <InnerTwo >
            <StyledTypo variant="h2" data-aos="fade-up" data-aos-delay="100">Server Side Options</StyledTypo>
            <StyledTypo variant="body1">
            The Auto-layout makes the items equitably share the available space. That also means you can set the width of one item and the others will automatically resize around it.
            </StyledTypo>
        </InnerTwo>
      </ServerBox>
      <StaticBox>
        <InnerTwo >
        <StyledTypo variant="h2" data-aos="fade-up" data-aos-delay="200" >Stactic Data Options</StyledTypo>
            <StyledTypo variant="body1">
            Web design involves creating the visual elements and layout of a website, while coding involves translating these designs into a functional website using programming languages like HTML, CSS, and JavaScript. Typically, dedicated web developers translate the designs to code.            </StyledTypo>

        </InnerTwo>
        <InnerOne>
          <StyledImage
          src={StaticIm}
          alt="staticimge"/>
        </InnerOne>
      </StaticBox>
    </MainBox>
  );
}

export default ServerStatics;
