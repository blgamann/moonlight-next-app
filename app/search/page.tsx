"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Book } from "@/components/book";
import Link from "next/link";
import { BookItem, search } from "@/lib/book";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const books = await search(query);
      setResults(books);
    } catch (err) {
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 pb-20">
      <h1 className="text-xl font-bold mb-4">책 검색</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="책 제목, 저자 검색"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#39d4e7]"
          />
          <button 
            type="submit" 
            className="bg-[#39d4e7] text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "검색 중..." : "검색"}
          </button>
        </div>
      </form>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="space-y-4">
        {results.map((book, index) => (
          <Link key={index} href={`/garden/${book.isbn}`}>
            <div className="p-3 border rounded-lg">
              <Book
                image={book.image}
                title={book.title}
                author={book.author}
                orientation="horizontal"
              />
            </div>
          </Link>
        ))}
        
        {results.length === 0 && !isLoading && query && (
          <p className="text-center text-gray-500 py-4">검색 결과가 없습니다.</p>
        )}
      </div>
      
      <Navigation />
    </div>
  );
}
