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
        text-base 
        py-4 
        px-6 
        rounded-[14px] 
        transition-colors
        font-medium
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
