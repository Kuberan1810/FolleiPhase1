import { Pencil } from "lucide-react";

const FloatingButton = () => {
  return (
    <button className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-[56px] h-[56px] lg:w-[56px] lg:h-[56px]  bg-[#004370] text-white rounded-2xl flex items-center justify-center  hover:bg-[#003152] transition-all transform hover:scale-105 active:scale-95 cursor-pointer z-50">
      <Pencil size={24} strokeWidth={2.5} />
    </button>
  );
};

export default FloatingButton;
