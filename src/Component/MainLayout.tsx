import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] ">
      <div className="h-screen shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 bg-[#F8FAFC]/80S">
        <div className="shrink-0">
          <Header />
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;