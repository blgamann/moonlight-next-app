"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiBookLine, RiUserLine, RiSearchLine, RiNotification3Line } from "react-icons/ri";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white py-2 px-4">
      <div className="flex justify-around items-center">
        <Link 
          href="/discover" 
          className={`flex flex-col items-center ${isActive("/discover") ? "text-[#39d4e7]" : "text-gray-500"}`}
        >
          <RiBookLine size={24} />
          <span className="text-xs mt-1">발견</span>
        </Link>
        <Link 
          href="/connect" 
          className={`flex flex-col items-center ${isActive("/connect") ? "text-[#39d4e7]" : "text-gray-500"}`}
        >
          <RiUserLine size={24} />
          <span className="text-xs mt-1">연결</span>
        </Link>
        <Link 
          href="/search" 
          className={`flex flex-col items-center ${isActive("/search") ? "text-[#39d4e7]" : "text-gray-500"}`}
        >
          <RiSearchLine size={24} />
          <span className="text-xs mt-1">검색</span>
        </Link>
        <Link 
          href="/notifications" 
          className={`flex flex-col items-center ${isActive("/notifications") ? "text-[#39d4e7]" : "text-gray-500"}`}
        >
          <RiNotification3Line size={24} />
          <span className="text-xs mt-1">알림</span>
        </Link>
        <Link 
          href="/profile" 
          className={`flex flex-col items-center ${isActive("/profile") ? "text-[#39d4e7]" : "text-gray-500"}`}
        >
          <RiUserLine size={24} />
          <span className="text-xs mt-1">프로필</span>
        </Link>
      </div>
    </div>
  );
}
