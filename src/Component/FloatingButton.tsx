import { Plus, Pencil } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FloatingButton = () => {
  const location = useLocation();
  const isOutbound = location.pathname.startsWith('/outbound');

  const targetPath = isOutbound ? "/outbound/Campaigns/create" : "/inbound/flow-builder";

  return (
    <Link to={targetPath} className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-[56px] h-[56px] lg:w-[56px] lg:h-[56px]  bg-[#004370] text-white rounded-2xl flex items-center justify-center  hover:bg-[#003152] transition-all transform hover:scale-105 active:scale-95 cursor-pointer z-50">
      {isOutbound ? (
        <Plus size={32} strokeWidth={2.5} />
      ) : (
        <Pencil size={24} strokeWidth={2.5} />
      )}
    </Link>
  );
};

export default FloatingButton;
