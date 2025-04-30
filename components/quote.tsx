import React from "react";

export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[450px] relative pl-9 pr-6 py-6.5 border-[0.75px] border-gray-300 border-l-0 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)]">
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
      {children}
    </div>
  );
}
