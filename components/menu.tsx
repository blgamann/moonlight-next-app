"use client";

import { useState } from "react";

import { IoSparklesOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { GoInfinity } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMoon } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";

import data from "@/data.json";
import { ProfileSm } from "./profile";

const profile = data.profiles[0];

export const icons = [
  {
    icon: <IoSparklesOutline size={20} color="#aeaeae" />,
    onClick: () => {},
    label: "발견",
  },
  {
    icon: <IoBookOutline size={20} color="#aeaeae" />,
    onClick: () => {},
    label: "가든 검색",
  },
  {
    icon: <GoInfinity size={20} color="#aeaeae" />,
    onClick: () => {},
    label: "소울링크",
  },
  {
    icon: <IoNotificationsOutline size={20} color="#aeaeae" />,
    onClick: () => {},
    label: "알림",
  },
  {
    icon: <ProfileSm url={profile.imageUrl} />,
    onClick: () => {},
    label: "프로필",
  },
  {
    icon: <HiOutlineMoon size={20} color="#aeaeae" />,
    onClick: () => {},
    label: "나의 관심",
  },
];

export function Menu({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative flex justify-center items-center px-4 py-4 cursor-pointer hover:bg-gray-100 hover:rounded-lg flex-col"
      onClick={onClick}
    >
      {icon}
      <div className="absolute left-[calc(100%+6px)] top-1/2 -translate-y-1/2 bg-[#383838] text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {label}
      </div>
    </div>
  );
}

export function MenuExpanded({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative flex items-center px-4 py-4 cursor-pointer hover:bg-gray-100 hover:rounded-lg gap-2 w-48.5"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs text-[#929292] ml-1">{label}</span>
    </div>
  );
}

export function Menu2({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative flex justify-center items-center px-4 py-4 cursor-pointer hover:bg-gray-100 hover:rounded-lg flex-col"
      onClick={onClick}
    >
      {icon}
      <span className="text-[10px] mt-1.5 text-[#929292]">{label}</span>
    </div>
  );
}

export function MenuBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="fixed flex top-[4px] flex-col p-1 z-10">
      <div
        className="flex items-center justify-center w-10 h-10 hover:rounded-full cursor-pointer hover:bg-gray-100 ml-1 mb-10"
        onClick={onMenuClick}
      >
        <AiOutlineMenu color="#aeaeae" size={18} />
      </div>
      <div className="hidden sm:flex sm:flex-col bg-white">
        {icons.map(({ icon, label, onClick }, index) => (
          <Menu key={index} icon={icon} label={label} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}

export function MenuBar2() {
  return (
    <div className="fixed flex flex-col mt-20 p-1">
      {icons.map(({ icon, label, onClick }, index) => (
        <Menu2 key={index} icon={icon} label={label} onClick={onClick} />
      ))}
    </div>
  );
}

export function MenuBarExpanded({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="fixed flex top-[4px] flex-col p-1 z-10">
      <div
        className="flex items-center justify-center w-10 h-10 hover:rounded-full cursor-pointer hover:bg-gray-100 ml-1 mb-10"
        onClick={onMenuClick}
      >
        <AiOutlineMenu color="#aeaeae" size={18} />
      </div>
      {icons.map(({ icon, label, onClick }, index) => (
        <MenuExpanded key={index} icon={icon} label={label} onClick={onClick} />
      ))}
    </div>
  );
}

// export function MenuComponent() {
//   return (
//     <div className="flex gap-16">
//       <MenuBar2 />
//       <div className="ml-36">
//         <MenuBar />
//       </div>
//       <div className="ml-24">
//         <MenuBarExpanded />
//       </div>
//     </div>
//   );
// }

export function MenuComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Collapsed */}
      <div
        className={`
          fixed top-0 left-0 h-full z-10
          transform transition-transform duration-300
          ${isOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <MenuBar onMenuClick={toggle} />
      </div>

      {/* Expanded */}
      <div
        className={`
          fixed top-0 left-0 h-full w-50 bg-white shadow-lg z-20
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <MenuBarExpanded onMenuClick={toggle} />
      </div>
    </>
  );
}
