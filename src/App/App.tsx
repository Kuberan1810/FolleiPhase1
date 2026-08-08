import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Toaster position={isMobile ? "bottom-center" : "top-right"} />

      <AppRoutes />

    </BrowserRouter>
  );
}

export default App;
