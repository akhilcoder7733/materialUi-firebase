// Header.js

import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MenuIcon from "@mui/icons-material/Menu";
import MiscellaneousServices from "@mui/icons-material/MiscellaneousServices";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { useFirebase } from "../FirebaseContext";
import { PulseLoader } from "react-spinners";
import LogoutIcon from '@mui/icons-material/Logout';

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "13vh",
  backgroundColor: "transparent",
  padding: theme.spacing(2),
}));

const SecondMainBox = styled(Box)(({ theme, darkMode }) => ({
  minHeight: "13vh",
  backgroundColor: darkMode ? "#797a7a" : "#cccfcd",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-around",
    gap: theme.spacing(25),
    backgroundColor: "transparent",
  },
}));

const HeaderOne = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing(2),
}));
const HeaderTwo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const NavBarButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const NavBarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const NavBarLink = styled(Typography)(({ theme }) => ({
  color: "black",
  fontSize: "18px",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "Fredoka, sans-serif",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#1c51a6",
  },
}));

const NavBarButton = styled(Button)(({ theme }) => ({
  appearance: "none",
  backgroundColor: "transparent",
  border: "0.125em solid #1A1A1A",
  borderRadius: "0.9375em",
  boxSizing: "border-box",
  color: "#3B3B3B",
  cursor: "pointer",
  display: "inline-block",
  fontFamily:
    'Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "normal",
  margin: 0,
  // minHeight: '3.75em',
  minWidth: 0,
  outline: "none",
  padding: "0.5em 1.3em",
  textAlign: "center",
  textDecoration: "none",
  transition: "all 300ms cubic-bezier(.23, 1, 0.32, 1)",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "transform",
  "&:disabled": {
    pointerEvents: "none",
  },
  "&:hover": {
    color: "#fff",
    backgroundColor: "#1A1A1A",
    boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: "none",
    transform: "translateY(0)",
  },
}));

const navBarLinks = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Posts",
    path: "/posts",
  },
  {
    display: "Contact",
    path: "/contact",
  },
  {
    display: "About",
    path: "/about",
  },
];

const navBarButtons = [
  {
    display: "Sign In",
    path: "/login",
  },
  {
    display: "Sign Up",
    path: "/register",
  },
];

const UserLinks = [
  {
    display: "Profile",
    path: "/profile",
  },
  {
    display: "Settings",
    path: "/settings",
  },
];

const CustomMenuIcon = styled(MenuIcon)(({ theme, darkMode }) => ({
  display: "none",
  cursor: "pointer",
  marginRight: theme.spacing(2),
  color: darkMode ? "#fff" : "#111",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  // "& .MuiPaper-root": {
  // backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],

  // },
}));

const Header = ({ darkMode, setDarkMode, profilePictureUrl }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [backToTopButton, setBackToTopButton] = useState(false);
  const [mobileMenu, setMobileMenu] = useState({ left: false });
  const { auth } = useFirebase();
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }
    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
    setAnchorEl(false);
  };
  const handleSettingsNavigation = () => {
    navigate("/settings");
    setAnchorEl(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(false);
  };


  const handleLogout = () => {
    // Implement Firebase sign-out logic here
    setOpen(true); // Show the backdrop with spinner
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
        setTimeout(() => {
          setOpen(false); // Hide the backdrop after 3 seconds
          navigate("/login");
        }, 3000);
        // Redirect or perform other actions after sign-out
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
        setOpen(false); // Hide the backdrop if sign-out fails
        // Handle error
      });
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            marginLeft: "20px",
            fontSize: "22px",
            textDecoration: "underline",
          }}
        >
          Links
        </Typography>
        {navBarLinks.map((item, index) => (
          <ListItem
            key={item.index}
            disablePadding
            onClick={() => navigate(item.path)}
            data-aos="flip-up"
            data-aos-delay={index * 100}
            data-aos-duration="1000"
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <MiscellaneousServices />}
                {index === 2 && <FeaturedPlayListIcon />}
                {index === 3 && <ContactsIcon />}
                {index === 4 && <InfoIcon />}
              </ListItemIcon>
              <ListItemText primary={item.display} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            marginLeft: "20px",
            fontSize: "22px",
            textDecoration: "underline",
            marginBottom:"10px",
          }}
        >
          User links
        </Typography>
        {auth.currentUser ? (
          <>
            {UserLinks.map((link, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => navigate(link.path)}
                data-aos="flip-up"
                data-aos-delay={index * 100}
                data-aos-duration="1000"
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <Avatar
                  alt="User Avatar"
                  src={profilePictureUrl}
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                />}
                    {index === 1 && <MiscellaneousServices />}
                    {index === 2 && <FeaturedPlayListIcon />}
                    {index === 3 && <ContactsIcon />}
                    {index === 4 && <InfoIcon />}
                  </ListItemIcon>
                  <ListItemText primary={link.display} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem
              onClick={handleLogout}
              disablePadding
              data-aos="flip-up"
              data-aos-delay="100"
              data-aos-duration="1000"
             
            >
              <ListItemButton>
                <ListItemIcon>
                <LogoutIcon/>
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            {navBarButtons.map((button, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => navigate(button.path)}
                data-aos="flip-up"
                data-aos-delay={index * 100}
                data-aos-duration="1000"
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <MiscellaneousServices />}
                    {index === 2 && <FeaturedPlayListIcon />}
                    {index === 3 && <ContactsIcon />}
                    {index === 4 && <InfoIcon />}
                  </ListItemIcon>
                  <ListItemText primary={button.display} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}

        <Divider />
      </List>
    </Box>
  );

  return (
    <MainBox>
      <SecondMainBox darkMode={darkMode}>
        <HeaderOne>
          <CustomMenuIcon
            onClick={toggleDrawer("left", true)}
            darkMode={darkMode}
          />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <IconBox>
            <img src={Logo} alt="logo-web" style={{ width: "50px" }} />
          </IconBox>
          <NavBarBox>
            {navBarLinks.map((link, index) => (
              <NavBarLink
                key={index}
                variant="body1"
                onClick={() => navigate(link.path)}
              >
                {link.display}
              </NavBarLink>
            ))}
          </NavBarBox>
        </HeaderOne>
        <HeaderTwo>
          <NavBarButtonBox>
            {auth.currentUser ? (
              <>
                <Avatar
                  alt="User Avatar"
                  src={profilePictureUrl}
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                />

                <StyledMenu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfileNavigation}>Profile</MenuItem>
                  <MenuItem onClick={handleSettingsNavigation}>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </StyledMenu>
              </>
            ) : (
              <>
                {navBarButtons.map((button, index) => (
                  <NavBarButton
                    key={index}
                    onClick={() => navigate(button.path)}
                  >
                    {button.display}
                  </NavBarButton>
                ))}
              </>
            )}
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <PulseLoader color="#06bf37" />
            </Backdrop>
          </NavBarButtonBox>
          <IconButton onClick={handleDarkModeToggle}>
            {darkMode ? (
              <LightModeIcon style={{ color: "#fff", fontSize: "33px" }} />
            ) : (
              <DarkModeIcon style={{ color: "#111", fontSize: "33px" }} />
            )}
          </IconButton>
        </HeaderTwo>
      </SecondMainBox>
      {backToTopButton && (
        <IconButton
          darkMode={darkMode}
          style={{
            position: "fixed",
            bottom: 50,
            right: 50,
            height: 50,
            width: 50,
            fontSize: "40px",
            backgroundColor: darkMode ? "#fff" : "#111",
            color: darkMode ? "#111" : "#fff",
            zIndex: 1,
          }}
          onClick={scrollUp}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </MainBox>
  );
};

export default Header;
