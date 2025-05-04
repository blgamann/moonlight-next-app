"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useIsGardenPage } from "@/hooks/useIsGardenPage";

import { IoSparklesOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { GoInfinity } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMoon } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";

import data from "@/data.json";
import { Profile } from "./profile";

const profile = data.profiles[0];

export const icons = [
  {
    icon: <IoSparklesOutline size={20} color="#aeaeae" />,
    label: "발견",
    path: "/discover",
  },
  {
    icon: <IoBookOutline size={20} color="#aeaeae" />,
    label: "가든 검색",
    path: "/garden",
  },
  {
    icon: <GoInfinity size={20} color="#aeaeae" />,
    label: "소울링크",
    path: "/soullink",
  },
  {
    icon: <IoNotificationsOutline size={20} color="#aeaeae" />,
    label: "알림",
    path: "/notification",
  },
  {
    icon: <Profile size="xs" image={profile.imageUrl} />,
    label: "프로필",
    path: "/profile",
  },
  {
    icon: <HiOutlineMoon size={20} color="#aeaeae" />,
    label: "나의 관심",
    path: "/collection",
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

export function MenuBar2() {
  const router = useRouter();
  return (
    <div className="fixed flex flex-col mt-20 p-1">
      {icons.map(({ icon, label, path }, index) => (
        <Menu2
          key={index}
          icon={icon}
          label={label}
          onClick={() => router.push(path)}
        />
      ))}
    </div>
  );
}

export function MenuBar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const isGardenPage = useIsGardenPage();

  return (
    <div className="flex pt-2 pl-1 flex-col">
      <div
        className="flex items-center justify-center w-10 h-10 hover:rounded-full cursor-pointer hover:bg-gray-100 ml-1 mb-10"
        onClick={onMenuClick}
      >
        <AiOutlineMenu color="#aeaeae" size={18} />
      </div>
      <div
        className={`hidden md:flex md:flex-col ${
          isGardenPage ? "bg-transparent" : "bg-white"
        }`}
      >
        {!isGardenPage &&
          icons.map(({ icon, label, path }, index) => (
            <Menu
              key={index}
              icon={icon}
              label={label}
              onClick={() => {
                router.push(path);
              }}
            />
          ))}
      </div>
    </div>
  );
}

export function MenuBarExpanded({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  return (
    <div className="fixed flex pt-2 pl-1 flex-col z-10 bg-white">
      <div
        className="flex items-center justify-center w-10 h-10 hover:rounded-full cursor-pointer hover:bg-gray-100 ml-1 mb-10"
        onClick={onMenuClick}
      >
        <AiOutlineMenu color="#aeaeae" size={18} />
      </div>
      {icons.map(({ icon, label, path }, index) => (
        <MenuExpanded
          key={index}
          icon={icon}
          label={label}
          onClick={() => {
            router.push(path);
            onMenuClick();
          }}
        />
      ))}
    </div>
  );
}

export function Menus() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Collapsed */}
      <div
        className={`
          fixed top-0 left-0 h-full z-20
          transform transition-transform duration-300
          ${isOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <MenuBar onMenuClick={toggle} />
      </div>

      {/* Expanded */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 left-0 h-full w-50 bg-white shadow-lg z-30
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <MenuBarExpanded onMenuClick={toggle} />
      </div>
    </>
  );
}
