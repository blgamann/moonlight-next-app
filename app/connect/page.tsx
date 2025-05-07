"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Profile } from "@/components/profile";
import Link from "next/link";

export default function ConnectPage() {
  const [activeTab, setActiveTab] = useState<"connect" | "match" | "interest">("connect");
  
  const soulmateProfiles = [
    { 
      id: 1, 
      name: "김달빛", 
      bio: "책을 좋아하는 달빛입니다.", 
      image: "https://i.pravatar.cc/300?img=1" 
    },
    { 
      id: 2, 
      name: "이별빛", 
      bio: "SF 소설을 좋아합니다.", 
      image: "https://i.pravatar.cc/300?img=2" 
    },
  ];
  
  const matchProfiles = [
    { 
      id: 3, 
      name: "박햇빛", 
      bio: "시집을 좋아합니다.", 
      image: "https://i.pravatar.cc/300?img=3" 
    },
    { 
      id: 4, 
      name: "최구름", 
      bio: "클래식 문학을 즐겨 읽습니다.", 
      image: "https://i.pravatar.cc/300?img=4" 
    },
  ];
  
  const interestProfiles = [
    { 
      id: 5, 
      name: "정하늘", 
      bio: "영미문학을 좋아합니다.", 
      image: "https://i.pravatar.cc/300?img=5" 
    },
  ];
  
  const interestAnswers = [
    { 
      id: 1, 
      title: "이 책의 감동", 
      content: "정말 인상 깊었던 부분은...", 
      profile: { 
        id: 6, 
        name: "윤바다", 
        image: "https://i.pravatar.cc/300?img=6" 
      },
      book: { 
        title: "달빛 정원", 
        isbn: "9788901234567" 
      }
    },
  ];

  const handleSoullink = (profileId: number) => {
    console.log("소울링크 띄우기:", profileId);
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "connect" ? "border-b-2 border-[#39d4e7] text-[#39d4e7]" : ""}`}
          onClick={() => setActiveTab("connect")}
        >
          연결
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "match" ? "border-b-2 border-[#39d4e7] text-[#39d4e7]" : ""}`}
          onClick={() => setActiveTab("match")}
        >
          매치
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "interest" ? "border-b-2 border-[#39d4e7] text-[#39d4e7]" : ""}`}
          onClick={() => setActiveTab("interest")}
        >
          관심
        </button>
      </div>

      {activeTab === "connect" && (
        <div>
          <h2 className="text-lg font-semibold mb-3">소울메이트</h2>
          <div className="space-y-4">
            {soulmateProfiles.map((profile) => (
              <Link key={profile.id} href={`/profile/${profile.id}`}>
                <div className="p-3 border rounded-lg">
                  <Profile
                    image={profile.image}
                    name={profile.name}
                    bio={profile.bio}
                    variant="soulmate"
                  />
                </div>
              </Link>
            ))}
            {soulmateProfiles.length === 0 && (
              <p className="text-center text-gray-500 py-4">아직 소울메이트가 없습니다.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "match" && (
        <div>
          <h2 className="text-lg font-semibold mb-3">상호 관심</h2>
          <div className="space-y-4">
            {matchProfiles.map((profile) => (
              <div key={profile.id} className="p-3 border rounded-lg flex justify-between items-center">
                <Link href={`/profile/${profile.id}`}>
                  <Profile
                    image={profile.image}
                    name={profile.name}
                    bio={profile.bio}
                    orientation="horizontal"
                  />
                </Link>
                <button 
                  onClick={() => handleSoullink(profile.id)}
                  className="bg-[#39d4e7] text-white rounded-full px-3 py-1 text-sm"
                >
                  소울링크 띄우기
                </button>
              </div>
            ))}
            {matchProfiles.length === 0 && (
              <p className="text-center text-gray-500 py-4">아직 상호 관심이 없습니다.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "interest" && (
        <div>
          <h2 className="text-lg font-semibold mb-3">관심 프로필</h2>
          <div className="space-y-4 mb-6">
            {interestProfiles.map((profile) => (
              <Link key={profile.id} href={`/profile/${profile.id}`}>
                <div className="p-3 border rounded-lg">
                  <Profile
                    image={profile.image}
                    name={profile.name}
                    bio={profile.bio}
                    orientation="horizontal"
                  />
                </div>
              </Link>
            ))}
            {interestProfiles.length === 0 && (
              <p className="text-center text-gray-500 py-4">아직 관심 프로필이 없습니다.</p>
            )}
          </div>
          
          <h2 className="text-lg font-semibold mb-3">관심 답변</h2>
          <div className="space-y-4">
            {interestAnswers.map((answer) => (
              <Link key={answer.id} href={`/answer/${answer.id}`}>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Profile
                      image={answer.profile.image}
                      name={answer.profile.name}
                      orientation="horizontal"
                      size="sm"
                    />
                    <span className="text-sm text-gray-500">{answer.book.title}</span>
                  </div>
                  <h3 className="font-medium">{answer.title}</h3>
                  <p className="text-sm text-gray-700 line-clamp-2">{answer.content}</p>
                </div>
              </Link>
            ))}
            {interestAnswers.length === 0 && (
              <p className="text-center text-gray-500 py-4">아직 관심 답변이 없습니다.</p>
            )}
          </div>
        </div>
      )}
      
      <Navigation />
    </div>
  );
}
