import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // 추가적인 props가 필요하다면 여기에 정의할 수 있습니다.
  // 예: error?: boolean;
};

export function Input({ className, ...props }: InputProps) {
  return (
    <div className="relative w-full shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)]">
      <input
        className={`
          w-full
          py-8 pr-4 pl-10
          border-gray-300
          border-[0.75px]
          focus:outline-none
          placeholder:text-[#929292]
          placeholder:font-['Helvetica']
          font-['Helvetica']
          text-[22px]
          text-[#383838]
          ${className}
        `}
        placeholder="추천인의 ID를 입력해주세요"
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
