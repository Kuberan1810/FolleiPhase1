import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const FlowBuilderLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden from-[#ffffff] to-[#F3F6FC]">
      <div className="h-screen shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
        <div className="shrink-0">
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto from-[#ffffff] to-[#F3F6FC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FlowBuilderLayout;
