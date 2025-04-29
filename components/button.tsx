import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({ children, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        bg-[#38d4e7]
        hover:bg-[#32bfd0]
        text-white
        text-base
        py-4.5
        px-8
        rounded-[14px]
        transition-colors
        font-medium
        ${className}
      `}
    >
      {children}
    </button>
  );
}
