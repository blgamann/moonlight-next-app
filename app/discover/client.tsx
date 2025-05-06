"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonBack, ButtonForward, ButtonDeep } from "@/components/button";
import { Profile } from "@/components/profile";
import { TextDarkGrey, TextGrey } from "@/components/text";
import { Tabs } from "@/components/tabs";
import { Soulline } from "@/components/soulline";
import { Breather } from "@/components/breather";

// --- 타입 정의 (서버로부터 받을 데이터 구조) ---
interface ProfileData {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
}

interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
}

interface AnswerData {
  id: string;
  question_id: string;
  title: string;
  answer_text: string;
  date: string;
  profile_id: string;
  bookData?: BookData;
  year?: string;
}

interface SoullineProfile {
  id: string;
  name: string;
  imageUrl: string;
}

interface MutualBook {
  id: string;
  title: string;
  imageUrl: string;
}

// 단일 프로필 페이지에 필요한 데이터 묶음 타입
export interface ProfilePageData {
  profile: ProfileData;
  answers: AnswerData[];
  soullineProfiles: SoullineProfile[];
  mutualBooks: MutualBook[];
}

// 컴포넌트 Props 타입 정의
interface DiscoverClientProps {
  initialProfilesData: ProfilePageData[];
}

// 함께 읽은 책 표지 표시용 간단 컴포넌트
function MutualBookDisplay({ book }: { book: MutualBook }) {
  return (
    <div className="w-1/3 px-1 flex flex-col items-center flex-shrink-0">
      <Image
        src={book.imageUrl}
        alt={book.title}
        width={40}
        height={60}
        className="object-cover rounded shadow-md aspect-[2/3]"
      />
    </div>
  );
}

export default function DiscoverClient({
  initialProfilesData,
}: DiscoverClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여줄 프로필 인덱스 상태

  // 이전 프로필로 이동 (순환)
  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? initialProfilesData.length - 1 : prevIndex - 1
    );
  };

  // 다음 프로필로 이동 (순환)
  const handleForward = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === initialProfilesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 현재 인덱스에 해당하는 프로필 데이터 가져오기
  const currentProfileData = initialProfilesData[currentIndex];
  if (!currentProfileData) {
    // 데이터 로딩 중 또는 오류 처리
    return <div>Loading profile...</div>;
  }
  const { profile, answers, soullineProfiles, mutualBooks } =
    currentProfileData;

  // 현재 프로필의 답변으로 Tabs 데이터 준비
  const tabsData = answers.map((answer, index) => ({
    label: answer.title || `답변 ${index + 1}`,
    value: answer.id,
    content: (
      <div className="py-8 relative">
        {answer.bookData && (
          <div className="flex items-start gap-4 mb-6">
            <Image
              src={answer.bookData.imageUrl}
              alt={answer.bookData.title}
              width={60}
              height={90}
              className="object-cover rounded shadow-sm flex-shrink-0"
            />
            <div className="flex flex-col">
              <TextDarkGrey className="text-base font-medium">
                {answer.bookData.title}
              </TextDarkGrey>
              <TextGrey className="text-sm mt-1">
                {answer.bookData.author} • {answer.year}
              </TextGrey>
            </div>
          </div>
        )}
        <hr className="my-6 border-gray-200" />
        <div className="pb-16">
          <TextDarkGrey className="text-lg font-semibold mb-4">
            {answer.title}
          </TextDarkGrey>
          <TextDarkGrey className="text-base leading-relaxed whitespace-pre-line">
            {answer.answer_text}
          </TextDarkGrey>
        </div>
        <div className="absolute bottom-4 right-4">
          <ButtonDeep toastMessage={`'${answer.title}' 답변에 대한 관심`} />
        </div>
      </div>
    ),
  }));

  return (
    // 반응형 패딩 적용: 기본 p-4, pt-20 / md 이상 p-8, pt-24
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4 pt-20 md:p-8 md:pt-24">
      {/* 반응형 버튼 표시: md 이상에서만 block */}
      <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-20 hidden md:block">
        <ButtonBack onClick={handleBack} />
      </div>
      <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-20 hidden md:block">
        <ButtonForward onClick={handleForward} />
      </div>

      {/* 반응형 레이아웃: 기본 flex-col / md 이상 flex-row */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* 반응형 너비: 기본 w-full / md 이상 w-1/3 */}
        <div className="w-full md:w-1/3 flex flex-col items-center bg-white p-6 md:p-8 rounded-3xl shadow-lg">
          <Profile
            image={profile.imageUrl}
            name={profile.name}
            bio={profile.bio}
            size="xl" // 모바일에서는 size='lg' 등으로 조정 가능
            orientation="vertical"
            variant="default"
            className="mb-6"
          />
          <Breather className="mt-4 mb-12 flex items-center justify-center" />

          <div className="w-full flex flex-col items-center mb-10">
            <TextDarkGrey className="text-lg font-medium mb-4">
              소울라인
            </TextDarkGrey>
            <Soulline profiles={soullineProfiles} size="sm" />
          </div>

          <div className="w-full flex flex-col items-center">
            <TextDarkGrey className="text-lg font-medium mb-4">
              함께 읽은 책
            </TextDarkGrey>
            <div className="flex justify-center gap-2 w-full">
              {mutualBooks.map((book) => (
                <MutualBookDisplay key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>

        {/* 반응형 너비: 기본 w-full / md 이상 w-2/3 */}
        <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-lg overflow-hidden">
          <Tabs tabs={tabsData} />
        </div>
      </div>
    </div>
  );
}
