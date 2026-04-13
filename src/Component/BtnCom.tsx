// import React from "react";

// type BtnVariant = "blue" | "gray";

// interface BtnComProps {
//   label: string;
//   onClick?: () => void;
//   icon?: React.ReactNode;       // optional – pass any icon element
//   variant?: BtnVariant;         // "blue" (default) | "gray"
//   disabled?: boolean;
//   type?: "button" | "submit" | "reset";
//   className?: string;
// }

// const BtnCom = ({
//   label,
//   onClick,
//   icon,
//   variant = "blue",
//   disabled = false,
//   type = "button",
//   className = "",
// }: BtnComProps) => {
//   const base =
//     "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer select-none";

//   const variants: Record<BtnVariant, string> = {
//     blue: "bg-[#3d6fa8] hover:bg-[#35609a] active:scale-95 text-white shadow-sm",
//     gray: "bg-[#e8e8e8] hover:bg-[#d8d8d8] active:scale-95 text-[#444] shadow-sm",
//   };

//   const disabledStyle = "opacity-50 cursor-not-allowed pointer-events-none";

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`${base} ${variants[variant]} ${disabled ? disabledStyle : ""} ${className}`}
//     >
//       {icon && <span className="flex items-center shrink-0">{icon}</span>}
//       <span>{label}</span>
//     </button>
//   );
// };

// export default BtnCom;