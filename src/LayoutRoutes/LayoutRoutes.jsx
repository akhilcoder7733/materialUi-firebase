import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Pages/Home/Home";
import Footer from "../Footer/Footer";
import NotFound from "../Pages/NotFound/NotFound";
import Registration from "../UserPages/Registration/Registration";
import Login from "../UserPages/Login/Login";
import Profile from "../UserPages/Profile/Profile";
import { doc, getDoc } from "firebase/firestore";
import { useFirebase } from "../FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";

function LayoutRoutes({ darkMode, setDarkMode, setProfilePic }) {
  const { auth, firestore } = useFirebase();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };

      fetchUserData();
    }
  }, [user, firestore]);

  const handleProfilePicChange = (e) => {
    console.log(e); // Check the event object
    const file = e.target.files[0];
    setProfilePic(file);
  };

  return (
    <>
      <Router>
<Header
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  profilePictureUrl={userData?.profilePictureUrl}
/>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/materialUi-firebase" element={<Home darkMode={darkMode} />} />
          <Route path="/*" element={<NotFound darkMode={darkMode} />} />
          <Route path="/register" element={<Registration darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/profile" element={<Profile onProfilePicChange={handleProfilePicChange} darkMode={darkMode} setProfilePic={setProfilePic} />} />
        </Routes>
        <Footer darkMode={darkMode} setDarkMode={setDarkMode}/>
      </Router>
    </>
  );
}


export default LayoutRoutes;
