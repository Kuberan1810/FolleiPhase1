import React from "react";

interface BtnComSecondaryProps {
    label?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
}

const BtnComSecondary: React.FC<BtnComSecondaryProps> = ({
    label = "View",
    onClick,
    icon,
    iconPosition = "left",
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-1.5 border w-fit h-fit border-[#EDF3FD] rounded-[10px] bg-white hover:bg-[#fafafa] text-[14px] font-medium text-[#0E4C77] cursor-pointer transition-colors ${className}`}
        >
            {icon && iconPosition === "left" && icon}
            {label}
            {icon && iconPosition === "right" && icon}
        </button>
    );
};

export default BtnComSecondary;