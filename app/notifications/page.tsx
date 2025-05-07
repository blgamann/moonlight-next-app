"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Profile } from "@/components/profile";
import Link from "next/link";

interface Notification {
  id: number;
  type: "mutual_interest" | "soulmate";
  createdAt: string;
  profile: {
    id: number;
    name: string;
    image: string;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "mutual_interest",
        createdAt: "2023-05-15",
        profile: {
          id: 2,
          name: "이별빛",
          image: "https://i.pravatar.cc/300?img=2"
        }
      },
      {
        id: 2,
        type: "soulmate",
        createdAt: "2023-05-10",
        profile: {
          id: 3,
          name: "박햇빛",
          image: "https://i.pravatar.cc/300?img=3"
        }
      }
    ]);
    
    setIsLoading(false);
  }, []);

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "mutual_interest":
        return `${notification.profile.name}님과 상호 관심이 형성되었습니다.`;
      case "soulmate":
        return `${notification.profile.name}님과 소울메이트가 되었습니다.`;
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-gray-500">알림을 불러오는 중...</p>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <h1 className="text-xl font-bold mb-4">알림</h1>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-3 border rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Link href={`/profile/${notification.profile.id}`}>
                <Profile
                  image={notification.profile.image}
                  name={notification.profile.name}
                  size="sm"
                  orientation="horizontal"
                  variant={notification.type === "soulmate" ? "soulmate" : "default"}
                />
              </Link>
            </div>
            <p>{getNotificationText(notification)}</p>
            <p className="text-sm text-gray-500 mt-1">{notification.createdAt}</p>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <p className="text-center text-gray-500 py-4">알림이 없습니다.</p>
        )}
      </div>
      
      <Navigation />
    </div>
  );
}
