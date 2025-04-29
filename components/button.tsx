import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        bg-[#38d4e7] 
        hover:bg-[#32bfd0]
        text-white 
        font-['Helvetica']
        text-[19px] 
        py-5 
        px-10 
        rounded-[14px] 
        transition-colors
        font-semibold
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
