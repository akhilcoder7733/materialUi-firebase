import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from "@mui/system";

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    minHeight: "20vh",
  },
}));

const HeadBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap:theme.spacing(2),
  [theme.breakpoints.down("sm")]: {},
}));

const MasonryGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {},
}));

const MasonryGridBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {

  },
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
  fontFamily: "Fredoka, sans-serif",
  textAlign: "center",
  flexWrap: "wrap"
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width:"400px",
  borderRadius:"20px",
  [theme.breakpoints.down("sm")]: {
    width:"400px",
  },
}));

const unsplashImages1 = [
  'https://source.unsplash.com/random/300x200',
  'https://source.unsplash.com/random/400x200',
  'https://source.unsplash.com/random/300x300',
];

const unsplashImages2 = [
  'https://source.unsplash.com/random/400x300',
  'https://source.unsplash.com/random/300x400',
  // 'https://source.unsplash.com/random/400x400',
];

const unsplashImages3 = [
  'https://source.unsplash.com/random/400x200',
  'https://source.unsplash.com/random/300x300',
  'https://source.unsplash.com/random/400x300',
];

function Masonry() {
  return (
    <MainBox>
      <HeadBox>
        <StyledTypo variant='h3' data-aos="flip-up" data-aos-delay="100">Let's go through the grids!</StyledTypo>
        <StyledTypo variant='body1' data-aos="flip-up" data-aos-delay="200">W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy.</StyledTypo>
      </HeadBox>

      <Grid container spacing={0}>

        <Grid item xs={12} md={4}>
          <MasonryGrid>
            {unsplashImages1.map((imageUrl, index) => (
              <MasonryGridBox key={index} data-aos="flip-up" data-aos-delay="100">
                <StyledCard>
                  <CardMedia component="img" image={imageUrl} alt={`Image ${index + 1}`} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Description for Image {index + 1}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </MasonryGridBox>
            ))}
          </MasonryGrid>
        </Grid>

        <Grid item xs={12} md={4}>
          <MasonryGrid>
            {unsplashImages2.map((imageUrl, index) => (
              <MasonryGridBox key={index} data-aos="flip-up" data-aos-delay="300">
                <StyledCard>
                  <CardMedia component="img" image={imageUrl} alt={`Image ${index + 1}`} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Description for Image {index + 1}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </MasonryGridBox>
            ))}
          </MasonryGrid>
        </Grid>

        <Grid item xs={12} md={4}>
          <MasonryGrid>
            {unsplashImages3.map((imageUrl, index) => (
              <MasonryGridBox key={index} data-aos="flip-up" data-aos-delay="200">
                <StyledCard>
                  <CardMedia component="img" image={imageUrl} alt={`Image ${index + 1}`} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Description for Image {index + 1}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </MasonryGridBox>
            ))}
          </MasonryGrid>
        </Grid>

      </Grid>
    </MainBox>
  );
}

export default Masonry;

