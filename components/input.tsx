"use client";

import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

// Define InputProps
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <div className="relative w-full shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)]">
      <input
        suppressHydrationWarning={true}
        className={`
          w-full
          py-6 pr-4 pl-8
          border-gray-300
          border-[0.75px]
          focus:outline-none
          placeholder:text-[#929292]
          placeholder:font-['Helvetica']
          font-['Helvetica']
          text-base
          text-[#383838]
          ${className}
        `}
        {...props}
      />
      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-[3.5px]
          bg-[linear-gradient(178.8deg,_#56c1ff,_#6ae8d8)]
        "
      />
    </div>
  );
}

interface InputGardenProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSubmit"> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  className?: string;
}

export function InputGarden({
  value,
  onChange,
  onSubmit,
  className,
  ...props
}: InputGardenProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={`
        relative w-full
        rounded-full
        shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)]
        ${className}
      `}
    >
      <input
        suppressHydrationWarning={true}
        type="text"
        value={value}
        onChange={onChange}
        {...props}
        className={`
          w-full
          rounded-full
          border-gray-300
          border-[0.75px]
          py-4
          pl-7
          pr-16
          focus:outline-none
          placeholder:text-[#929293]
          placeholder:font-['Helvetica']
          font-['Helvetica']
          text-base
          text-[#383838]
        `}
      />

      <button
        type="submit"
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#39d4e7]">
          <HiOutlineSearch className="w-6 h-6 text-white" />
        </div>
      </button>
    </form>
  );
}

export function InputComponent() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Input placeholder="추천인의 ID를 입력해주세요 (Input)" />
      <InputGarden
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        placeholder="가든 검색 (InputGarden)"
      />
    </div>
  );
}
