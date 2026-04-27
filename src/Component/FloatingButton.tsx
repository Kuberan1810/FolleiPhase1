import { Plus, Pencil, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AiBrain from "../assets//AiFloat.svg"


const FloatingButton = () => {
  const location = useLocation();
  const isOutbound = location.pathname.startsWith('/outbound');

  const targetPath = isOutbound ? "/outbound/campaigns/create" : "/inbound/flow-builder";

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 flex  items-center gap-3 z-50">

      <Link to={targetPath} className="w-[56px] h-[56px] bg-[#004370] text-white rounded-2xl flex items-center justify-center hover:bg-[#003152] transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg">
        {isOutbound ? (
          <Plus size={32} strokeWidth={2.5} />
        ) : (
          <Pencil size={24} strokeWidth={2.5} />
        )}
      </Link>

      <button
        style={{ background: 'radial-gradient(circle at center, #003659 0%, #0A4268 35%, #007ACD 74%)' }}
        className="w-[56px] h-[56px] text-white rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
      >
        {/* <Brain size={26} strokeWidth={1.8} /> */}
        <img src={AiBrain} alt="Ai brain image" />
      </button>


    </div>
  );
};

export default FloatingButton;
