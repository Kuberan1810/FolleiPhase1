import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { Toaster } from "react-hot-toast";
import { SalesProvider } from "../Context/SalesContext";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <SalesProvider>
        <AppRoutes />
      </SalesProvider>
    </BrowserRouter>
  );
}

export default App;
