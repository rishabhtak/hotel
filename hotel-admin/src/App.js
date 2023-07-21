import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './css/DateRangePicker.css';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// ----------------------------------------------------------------------

const override = {
  position: "fixed",
  zIndex: 1031,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"

}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  }

  useEffect(() => {

    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, [])

  return !isLoading ? (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  ) : (<PuffLoader cssOverride={override} />
  )
}
