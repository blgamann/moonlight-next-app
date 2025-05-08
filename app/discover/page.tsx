"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Profile } from "@/components/profile";
import { Book } from "@/components/book";
import { Soulline } from "@/components/soulline";
import Link from "next/link";

interface ProfileData {
  id: number;
  name: string;
  bio: string;
  image: string;
  books: {
    id: number;
    isbn: string;
    title: string;
    author: string;
    image: string;
  }[];
  answers: {
    id: number;
    title: string;
    content: string;
    question: {
      text: string;
    };
  }[];
  soulline: {
    id: number;
    name: string;
    image: string;
  }[];
}

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dummyProfiles: ProfileData[] = [
      {
        id: 1,
        name: "김달빛",
        bio: "책을 좋아하는 달빛입니다.",
        image: "https://i.pravatar.cc/300?img=1",
        books: [
          {
            id: 1,
            isbn: "9791190254373",
            title: "책임의 생성",
            author: "김상준",
            image:
              "https://shopping-phinf.pstatic.net/main_3246667/32466671076.20230516071308.jpg",
          },
          {
            id: 2,
            isbn: "9788983712042",
            title: "스피노자의 뇌",
            author: "안토니오 다마지오",
            image:
              "https://shopping-phinf.pstatic.net/main_3245604/32456041610.20220527055541.jpg",
          },
        ],
        answers: [
          {
            id: 1,
            title: "책임에 대한 새로운 시각",
            content:
              "이 책은 책임이라는 개념에 대해 새로운 시각을 제시합니다...",
            question: { text: "책임의 생성을 읽고 느낀 점을 공유해주세요." },
          },
        ],
        soulline: [
          { id: 2, name: "이별빛", image: "https://i.pravatar.cc/300?img=2" },
          { id: 3, name: "박햇빛", image: "https://i.pravatar.cc/300?img=3" },
        ],
      },
      {
        id: 2,
        name: "이별빛",
        bio: "SF 소설을 좋아합니다.",
        image: "https://i.pravatar.cc/300?img=2",
        books: [
          {
            id: 2,
            isbn: "9788983712042",
            title: "스피노자의 뇌",
            author: "안토니오 다마지오",
            image:
              "https://shopping-phinf.pstatic.net/main_3245604/32456041610.20220527055541.jpg",
          },
          {
            id: 3,
            isbn: "9788979865868",
            title: "논어강설",
            author: "김용옥",
            image:
              "https://shopping-phinf.pstatic.net/main_3246258/32462589175.20220527055541.jpg",
          },
        ],
        answers: [
          {
            id: 2,
            title: "뇌과학의 새로운 지평",
            content: "스피노자의 뇌는 뇌과학과 철학의 만남을 보여줍니다...",
            question: { text: "스피노자의 뇌를 읽고 느낀 점을 공유해주세요." },
          },
        ],
        soulline: [
          { id: 1, name: "김달빛", image: "https://i.pravatar.cc/300?img=1" },
          { id: 4, name: "최구름", image: "https://i.pravatar.cc/300?img=4" },
        ],
      },
      {
        id: 3,
        name: "박햇빛",
        bio: "시집을 좋아합니다.",
        image: "https://i.pravatar.cc/300?img=3",
        books: [
          {
            id: 3,
            isbn: "9788979865868",
            title: "논어강설",
            author: "김용옥",
            image:
              "https://shopping-phinf.pstatic.net/main_3246258/32462589175.20220527055541.jpg",
          },
          {
            id: 4,
            isbn: "9791166893162",
            title: "다윈의 위험한 생각",
            author: "대니얼 데닛",
            image:
              "https://shopping-phinf.pstatic.net/main_3244981/32449811618.20220527055541.jpg",
          },
        ],
        answers: [
          {
            id: 3,
            title: "논어의 현대적 해석",
            content:
              "김용옥의 논어강설은 고전을 현대적으로 해석한 좋은 예입니다...",
            question: { text: "논어강설을 읽고 느낀 점을 공유해주세요." },
          },
        ],
        soulline: [
          { id: 1, name: "김달빛", image: "https://i.pravatar.cc/300?img=1" },
          { id: 5, name: "정하늘", image: "https://i.pravatar.cc/300?img=5" },
        ],
      },
    ];

    setProfiles(dummyProfiles);
    setIsLoading(false);
  }, []);

  const handleNext = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleInterest = () => {
    console.log("Interest expressed in profile:", profiles[currentIndex].id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-gray-500">프로필을 불러오는 중...</p>
        </div>
        <Navigation />
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-gray-500">표시할 프로필이 없습니다.</p>
        </div>
        <Navigation />
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="flex flex-col md:flex-row md:gap-6">
        {/* Left side: Profile info, soulline, books */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <Link href={`/profile/${currentProfile.id}`}>
            <div className="mb-4">
              <Profile
                image={currentProfile.image}
                name={currentProfile.name}
                bio={currentProfile.bio}
              />
            </div>
          </Link>

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">소울라인</h3>
            <Soulline
              profiles={currentProfile.soulline.map((p) => ({
                imageUrl: p.image,
              }))}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">함께 읽은 책</h3>
            <div className="grid grid-cols-2 gap-3">
              {currentProfile.books.map((book) => (
                <Link key={book.id} href={`/garden/${book.isbn}`}>
                  <Book
                    image={book.image}
                    title={book.title}
                    author={book.author}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Profile answers */}
        <div className="w-full md:w-1/2">
          <h3 className="text-sm font-medium mb-2">답변</h3>

          {currentProfile.answers.map((answer) => (
            <div key={answer.id} className="border rounded-lg p-3 mb-3">
              <Link href={`/answer/${answer.id}`}>
                <h4 className="font-medium mb-1">{answer.title}</h4>
                <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                  {answer.content}
                </p>
              </Link>
              <button
                onClick={handleInterest}
                className="text-xs text-[#39d4e7] border border-[#39d4e7] rounded-full px-3 py-1"
              >
                관심 👍
              </button>
            </div>
          ))}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-gray-200 rounded-full p-2 disabled:opacity-30"
            >
              이전
            </button>
            <div className="text-sm text-gray-500">
              {currentIndex + 1} / {profiles.length}
            </div>
            <button
              onClick={handleNext}
              disabled={currentIndex === profiles.length - 1}
              className="bg-[#39d4e7] text-white rounded-full p-2 disabled:opacity-30"
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* CTA at bottom */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">
          다른 분들과 연결되고 싶다면 읽은 책을 검색하고 나의 감상을 공유하세요
        </p>
        <Link
          href="/search"
          className="inline-block bg-[#39d4e7] text-white rounded-full px-4 py-2 text-sm"
        >
          책 검색하기
        </Link>
      </div>

      <Navigation />
    </div>
  );
}
