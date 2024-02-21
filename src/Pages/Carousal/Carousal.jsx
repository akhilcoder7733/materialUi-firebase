import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SliderImage1 from '../../assets/sliderimg/image (1).jpg'
import SliderImage2 from '../../assets/sliderimg/image (2).jpg'
import SliderImage3 from '../../assets/sliderimg/image (3).jpg'
import SliderImage4 from '../../assets/sliderimg/image (4).jpg'
import SliderImage5 from '../../assets/sliderimg/image (5).jpg'
import SliderImage6 from '../../assets/sliderimg/image (6).jpg'
import Typed from 'typed.js';

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
    flexDirection:"column",
  },
}));

const CodeBox = styled(Box)(({ theme }) => ({
  minHeight: "30vh",
  width: "50%",
  display: "block",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
  // backgroundColor:"red",
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
    width: "100%",
    minHeight: "40vh",
  },
}));

const CarousalBox = styled(Box)(({ theme }) => ({
  minHeight: "70vh",
  width: "50%",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    width: "100%",
    minHeight: "40vh",
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
    minHeight: "10vh",
    width:"100px",
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(4),
      width: "120px",
    },
}));

const CustomIcon = styled(IconButton)(({ theme }) => ({
    border:"2px solid"
}));

const CustomTypo = styled(Typography)(({ theme }) => ({
  fontFamily: "Fredoka, sans-serif",
  textAlign: "center",
}));

const colors = ["#f542e6", "#4CAF50", "#FFC107", "#FF5722", "#9C27B0"]; // Add more colors if needed

const CustomSpan = styled("span")(({ theme }) => ({
  color: "yellow",
  fontWeight:600
}));

function Carousal() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const textRef = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "<span style='color:" + colors[0] + "'>React JS.</span>",
        "<span style='color:" + colors[1] + "'>Material UI.</span>",
        "<span style='color:" + colors[2] + "'>AOS.</span>",
        "<span style='color:" + colors[3] + "'>Typed.js.</span>",
        "<span style='color:" + colors[4] + "'>Swiper JS.</span>",
      ],
      typeSpeed: 50,
      backSpeed: 20,
      loop: true,
    };
    typed.current = new Typed("#typing-element", options);
    return () => {
      typed.current.destroy();
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? importedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === importedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const importedImages = [
    SliderImage1,
    SliderImage2,
    SliderImage3,
    SliderImage4,
    SliderImage5,
    SliderImage6,
  ];

  return (
    <MainBox>
      <CarousalBox>
        <img
          src={importedImages[currentImageIndex]}
          alt="slider"
          style={{ width: "100%", height: "auto", borderRadius: "20px" }}
        />
        <IconBox>
          <CustomIcon onClick={handlePrevClick}>
            <ArrowBackIcon />
          </CustomIcon>
          <CustomIcon onClick={handleNextClick}>
            <ArrowForwardIcon />
          </CustomIcon>
        </IconBox>
      </CarousalBox>

      <CodeBox>
        <CustomTypo variant="h3" fontWeight={600} data-aos="fade-up" data-aos-delay="100">Made with Typed.js</CustomTypo>
        <CustomTypo variant="h5" data-aos="fade-up" data-aos-delay="200">This Website is made up of </CustomTypo>
        <CustomTypo variant="h5" data-aos="fade-up" data-aos-delay="300"><CustomSpan id="typing-element"></CustomSpan></CustomTypo>
        
      </CodeBox>

    </MainBox>
  );
}

export default Carousal;

