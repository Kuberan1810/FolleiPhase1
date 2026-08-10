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
      <Toaster 
        position={isMobile ? "bottom-center" : "top-right"} 
        toastOptions={{
          style: {
            fontSize: '13px',
            padding: '10px 14px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #F1F5F9'
          },
        }}
      />

      <AppRoutes />

    </BrowserRouter>
  );
}

export default App;
