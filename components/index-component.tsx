"use client";

import data from "@/data.json";
import { Profile } from "./profile";
import { ButtonDeep } from "./button";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export function IndexTop({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 right-0 h-14 flex items-center gap-4 p-4">
      {children}
    </div>
  );
}

export function IndexBottom({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-14 flex items-center gap-4 p-4 bg-white border-t-[0.75px] border-black/15">
      {children}
    </div>
  );
}

export function IndexBottomButton({
  onBack,
  onForward,
}: {
  onBack: () => void;
  onForward: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-14 flex items-center justify-between gap-4 bg-white border-t-[0.75px] border-black/15">
      <div className="cursor-pointer p-4" onClick={onBack}>
        <IoMdArrowRoundBack size={20} color="#d9d9d9" />
      </div>
      <ButtonDeep toastMessage="관심 답변이 등록되었어요!" />
      <div className="cursor-pointer p-4" onClick={onForward}>
        <IoMdArrowRoundForward size={20} color="#d9d9d9" />
      </div>
    </div>
  );
}

export function IndexComponents() {
  const profile = data.profiles[0];

  return (
    <div className="flex flex-col items-center justify-center">
      <IndexTop>
        <Profile size="xs" image={profile.imageUrl} name={profile.name} />
      </IndexTop>
      <IndexBottomButton
        onBack={() => {
          alert("back");
        }}
        onForward={() => {
          alert("forward");
        }}
      />
    </div>
  );
}
