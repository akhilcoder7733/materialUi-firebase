import React, { useEffect, useState } from 'react'
import LayoutRoutes from './LayoutRoutes/LayoutRoutes'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import 'aos/dist/aos.css';
import AOS from 'aos';
import ErrorBoundary from './ErrorBoundary'


AOS.init({
  duration: 800,
  once: false,
  mirror: false,
});

function useDarkModePreference() {
  return useMediaQuery('(prefers-color-scheme: dark)');
}


function App() {
  const prefersDarkMode = useDarkModePreference();
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      text: {
        primary: darkMode ? '#fff' : '#3B3B3B',
      },
      primary: {
        main: '#1976D2',
      },
      secondary: {
        main: '#DC004E',
      },
      background: {
        default: darkMode ? '#011e42' : '#a0f578',
        paper: darkMode ? '#1E1E1E' : '#bcffa3',
      },
    },
  });

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline
        style={{
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: darkMode ? '#121212' : '#ffffff',
          },
        }}>
          <ErrorBoundary>
        <LayoutRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
          </ErrorBoundary>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
