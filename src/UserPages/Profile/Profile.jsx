// Profile.js

import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Avatar,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Input,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFirebase } from "../../FirebaseContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Helmet } from "react-helmet";

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    minHeight: "40vh",
    gap: theme.spacing(4),
  },
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  border: "4px solid",
}));

const StyledButton = styled(Button)(({ theme }) => ({
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

const ProBox = styled(Box)(({ theme }) => ({
  width: theme.spacing("50%"),
  minHeight: theme.spacing("60vh"),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
  backgroundColor: "transparent",
  borderRadius: "20px",
  boxShadow: " inset 0px 0px 58px 7px rgba(89,88,89,0.54)",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]:{
    width: theme.spacing("95%"),

  }
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

const Profile = ({ onProfilePicChange }) => {
  const { auth, firestore, storage } = useFirebase();
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setLoadingProfile(false);
        }
      };

      fetchUserData();
    }
  }, [user, firestore]);

  useEffect(() => {
    if (loading) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [loading]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfilePic(file);
    }
  };
  

  const handleUploadProfilePic = async () => {
    try {
      if (!profilePic) return;

      setUploading(true);
      const storageRef = ref(
        storage,
        `profile_pictures/${user.uid}/${profilePic.name}`
      );
      await uploadBytes(storageRef, profilePic);

      const downloadURL = await getDownloadURL(storageRef);
      await setDoc(
        doc(firestore, "users", user.uid),
        { profilePictureUrl: downloadURL },
        { merge: true }
      );

      console.log("Profile picture uploaded successfully");
      setUploading(false);

      // Update userData state with the new profile picture URL
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePictureUrl: downloadURL,
      }));

      // Pass the new profile picture URL back to the parent component
      onProfilePicChange(downloadURL);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploading(false);
    }
  };

  return (
    <MainBox>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Welcome to my website" />
      </Helmet>
      {error && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Error: {error.message}
          </Alert>
        </Snackbar>
      )}

      {loadingProfile ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography variant="h4">Profile</Typography>
          <ProBox>
            <LargeAvatar src={userData?.profilePictureUrl} alt="hai" />

            <>
              <Typography variant="h4">Edit Profile</Typography>
              <Input type="file" onChange={handleProfilePicChange} />
              <StyledButton onClick={handleUploadProfilePic}>
                Change Profile Picture
              </StyledButton>
              {uploading && <CircularProgress />}
            </>
          </ProBox>
        </>
      )}
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </MainBox>
  );
};

export default Profile;
