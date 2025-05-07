"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Profile } from "@/components/profile";
import { useParams } from "next/navigation";
import Link from "next/link";

interface AnswerDetails {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  profile: {
    id: number;
    name: string;
    image: string;
  };
  book: {
    isbn: string;
    title: string;
    author: string;
  };
  question: string;
}

export default function AnswerDetailPage() {
  const params = useParams();
  const answerId = params.id as string;
  
  const [answer, setAnswer] = useState<AnswerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasExpressedInterest, setHasExpressedInterest] = useState(false);

  useEffect(() => {
    setAnswer({
      id: parseInt(answerId),
      title: "내 인생을 바꾼 책",
      content: "이 책은 내 인생을 바꿨습니다. 저자의 관점이 매우 흥미롭고, 책의 내용이 깊이 있게 다가왔습니다. 특히 주인공의 성장 과정이 인상적이었고, 그 과정에서 느끼는 감정들이 공감되었습니다. 이 책을 통해 새로운 시각을 얻게 되었고, 삶을 바라보는 관점이 넓어졌습니다.",
      createdAt: "2023-05-15",
      profile: {
        id: 1,
        name: "김달빛",
        image: "https://i.pravatar.cc/300?img=1"
      },
      book: {
        isbn: "9788901234567",
        title: "달빛 정원",
        author: "김작가"
      },
      question: "달빛 정원에 대한 나의 느낌을 공유해주세요"
    });
    
    setIsLoading(false);
  }, [answerId]);

  const handleExpressInterest = () => {
    setHasExpressedInterest(true);
    setTimeout(() => {
      setHasExpressedInterest(false);
    }, 2000);
  };

  if (isLoading || !answer) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-gray-500">답변을 불러오는 중...</p>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="mb-6">
        <Link 
          href={`/garden/${answer.book.isbn}`}
          className="text-[#39d4e7] mb-2 block"
        >
          {answer.book.title}
        </Link>
        <h2 className="text-lg font-medium mb-2">{answer.question}</h2>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/profile/${answer.profile.id}`}>
          <Profile
            image={answer.profile.image}
            name={answer.profile.name}
            orientation="horizontal"
          />
        </Link>
        <span className="text-sm text-gray-500">{answer.createdAt}</span>
      </div>
      
      <h1 className="text-xl font-bold mb-3">{answer.title}</h1>
      
      <div className="prose mb-8">
        <p className="whitespace-pre-line">{answer.content}</p>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleExpressInterest}
          className={`border ${hasExpressedInterest ? 'bg-[#39d4e7] text-white' : 'border-[#39d4e7] text-[#39d4e7]'} px-4 py-2 rounded-full transition-colors`}
        >
          {hasExpressedInterest ? '관심 표현됨 👍' : '관심 표현하기 👍'}
        </button>
      </div>
      
      <Navigation />
    </div>
  );
}
