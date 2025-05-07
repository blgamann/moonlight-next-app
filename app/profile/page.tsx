"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Profile } from "@/components/profile";
import { Book } from "@/components/book";
import Link from "next/link";

interface ProfileData {
  id: number;
  name: string;
  bio: string;
  image: string;
  bookCount: number;
  answerCount: number;
}

interface BookData {
  isbn: string;
  title: string;
  author: string;
  image: string;
}

interface AnswerData {
  id: number;
  title: string;
  content: string;
  book: {
    isbn: string;
    title: string;
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [books, setBooks] = useState<BookData[]>([]);
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const [activeTab, setActiveTab] = useState<"answers" | "shelf">("answers");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfile({
      id: 1,
      name: "김달빛",
      bio: "책을 좋아하는 달빛입니다.",
      image: "https://i.pravatar.cc/300?img=1",
      bookCount: 12,
      answerCount: 8
    });
    
    setBooks([
      {
        isbn: "9791190254373",
        title: "책임의 생성",
        author: "김상준",
        image: "https://shopping-phinf.pstatic.net/main_3246667/32466671076.20230516071308.jpg"
      },
      {
        isbn: "9788983712042",
        title: "스피노자의 뇌",
        author: "안토니오 다마지오",
        image: "https://shopping-phinf.pstatic.net/main_3245604/32456041610.20220527055541.jpg"
      }
    ]);
    
    setAnswers([
      {
        id: 1,
        title: "책임에 대한 새로운 시각",
        content: "이 책은 책임이라는 개념에 대해 새로운 시각을 제시합니다...",
        book: {
          isbn: "9791190254373",
          title: "책임의 생성"
        }
      },
      {
        id: 2,
        title: "뇌과학의 새로운 지평",
        content: "스피노자의 뇌는 뇌과학과 철학의 만남을 보여줍니다...",
        book: {
          isbn: "9788983712042",
          title: "스피노자의 뇌"
        }
      }
    ]);
    
    setIsLoading(false);
  }, []);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-gray-500">프로필을 불러오는 중...</p>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="flex flex-col items-center mb-6">
        <Profile
          image={profile.image}
          size="xl"
        />
        <h1 className="text-xl font-bold mt-3">{profile.name}</h1>
        <p className="text-gray-600 text-center mt-1">{profile.bio}</p>
        
        <div className="flex gap-4 mt-3">
          <div className="text-center">
            <p className="font-semibold">{profile.bookCount}</p>
            <p className="text-sm text-gray-500">읽은 책</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{profile.answerCount}</p>
            <p className="text-sm text-gray-500">남긴 답변</p>
          </div>
        </div>
        
        <button className="mt-4 border border-[#39d4e7] text-[#39d4e7] px-4 py-1 rounded-full text-sm">
          프로필 편집
        </button>
      </div>
      
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 px-4 py-2 ${activeTab === "answers" ? "border-b-2 border-[#39d4e7] text-[#39d4e7]" : ""}`}
          onClick={() => setActiveTab("answers")}
        >
          답변
        </button>
        <button
          className={`flex-1 px-4 py-2 ${activeTab === "shelf" ? "border-b-2 border-[#39d4e7] text-[#39d4e7]" : ""}`}
          onClick={() => setActiveTab("shelf")}
        >
          서재
        </button>
      </div>
      
      {activeTab === "answers" && (
        <div className="space-y-4">
          {answers.map((answer) => (
            <Link key={answer.id} href={`/answer/${answer.id}`}>
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-gray-500 mb-1">{answer.book.title}</p>
                <h3 className="font-medium">{answer.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-2">{answer.content}</p>
              </div>
            </Link>
          ))}
          
          {answers.length === 0 && (
            <p className="text-center text-gray-500 py-4">아직 답변이 없습니다.</p>
          )}
        </div>
      )}
      
      {activeTab === "shelf" && (
        <div className="grid grid-cols-2 gap-4">
          {books.map((book) => (
            <Link key={book.isbn} href={`/garden/${book.isbn}`}>
              <Book
                image={book.image}
                title={book.title}
                author={book.author}
              />
            </Link>
          ))}
          
          {books.length === 0 && (
            <p className="text-center text-gray-500 py-4 col-span-2">서재에 책이 없습니다.</p>
          )}
        </div>
      )}
      
      <Navigation />
    </div>
  );
}
