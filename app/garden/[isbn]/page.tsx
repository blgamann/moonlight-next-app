"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Book } from "@/components/book";
import { Profile } from "@/components/profile";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BookDetails {
  isbn: string;
  title: string;
  author: string;
  image: string;
  publisher: string;
}

interface Answer {
  id: number;
  title: string;
  content: string;
  profile: {
    id: number;
    name: string;
    image: string;
  };
}

export default function GardenPage() {
  const params = useParams();
  const isbn = params.isbn as string;

  const [book, setBook] = useState<BookDetails | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isInShelf, setIsInShelf] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBook({
      isbn,
      title: "달빛 정원",
      author: "김작가",
      image: "https://i.pravatar.cc/300?img=10",
      publisher: "달빛 출판",
    });

    setAnswers([
      {
        id: 1,
        title: "내 인생을 바꾼 책",
        content: "이 책은 내 인생을 바꿨습니다...",
        profile: {
          id: 1,
          name: "김달빛",
          image: "https://i.pravatar.cc/300?img=1",
        },
      },
      {
        id: 2,
        title: "흥미로운 관점",
        content: "저자의 관점이 매우 흥미롭습니다...",
        profile: {
          id: 2,
          name: "이별빛",
          image: "https://i.pravatar.cc/300?img=2",
        },
      },
    ]);

    setIsInShelf(false);

    setIsLoading(false);
  }, [isbn]);

  const addToShelf = () => {
    setIsInShelf(true);
  };

  if (isLoading || !book) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-gray-500">데이터를 불러오는 중...</p>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Book image={book.image} size="lg" />
        <div>
          <h1 className="text-xl font-bold">{book.title}</h1>
          <p className="text-gray-600">{book.author}</p>
          <p className="text-gray-500 text-sm">{book.publisher}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        {!isInShelf ? (
          <button
            onClick={addToShelf}
            className="flex-1 bg-[#39d4e7] text-white px-4 py-2 rounded-md"
          >
            서재에 추가하기
          </button>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-200 text-gray-500 px-4 py-2 rounded-md"
          >
            서재에 추가됨
          </button>
        )}

        <Link
          href={`/create-answer/${isbn}`}
          className="flex-1 border border-[#39d4e7] text-[#39d4e7] px-4 py-2 rounded-md text-center"
        >
          감상 공유하기
        </Link>
      </div>

      <h2 className="text-lg font-semibold mb-4">
        &quot;{book.title}&quot;에 대한 감상
      </h2>

      <div className="space-y-4">
        {answers.map((answer) => (
          <Link key={answer.id} href={`/answer/${answer.id}`}>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Profile
                  image={answer.profile.image}
                  name={answer.profile.name}
                  size="sm"
                  orientation="horizontal"
                />
              </div>
              <h3 className="font-medium">{answer.title}</h3>
              <p className="text-sm text-gray-700 line-clamp-2">
                {answer.content}
              </p>
            </div>
          </Link>
        ))}

        {answers.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            아직 감상이 없습니다. 첫 감상을 남겨보세요!
          </p>
        )}
      </div>

      <Navigation />
    </div>
  );
}
