import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";

import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
