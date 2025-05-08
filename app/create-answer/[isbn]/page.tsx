"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Book } from "@/components/book";
import { useParams, useRouter } from "next/navigation";

interface BookDetails {
  isbn: string;
  title: string;
  author: string;
  image: string;
}

export default function CreateAnswerPage() {
  const params = useParams();
  const router = useRouter();
  const isbn = params.isbn as string;

  const [book, setBook] = useState<BookDetails | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setBook({
      isbn,
      title: "달빛 정원",
      author: "김작가",
      image: "https://i.pravatar.cc/300?img=10",
    });

    setIsLoading(false);
  }, [isbn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push(`/garden/${isbn}`);
    } catch (error) {
      console.error("Error submitting answer:", error);
      setIsSubmitting(false);
    }
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
      <h1 className="text-xl font-bold mb-4">감상 공유하기</h1>

      <div className="flex items-center gap-3 mb-6">
        <Book image={book.image} size="md" />
        <div>
          <h2 className="font-semibold">{book.title}</h2>
          <p className="text-gray-600 text-sm">{book.author}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">
          {book.title}에 대한 나의 느낌을 공유해주세요
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#39d4e7]"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#39d4e7] min-h-[200px]"
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#39d4e7] text-white px-4 py-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "감상 공유하기"}
        </button>
      </form>

      <Navigation />
    </div>
  );
}
