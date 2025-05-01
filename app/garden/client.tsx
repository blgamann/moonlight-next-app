"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputGarden, TextBlack, TextCyan } from "@/components";
import { BookItem } from "@/lib/book";
import { BookSearchItem } from "@/components/item";

export default function GardenClient({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery);
  const [results, setResults] = useState<BookItem[]>([]);

  const [loading, setLoading] = useState(initialQuery !== "");

  useEffect(() => {
    if (!submitted) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/garden/search?q=${encodeURIComponent(submitted)}`)
      .then((r) => r.json())
      .then((j) => setResults(j.results))
      .finally(() => setLoading(false));
  }, [submitted]);

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    setSubmitted(q);
    router.push(`/garden?q=${encodeURIComponent(q)}`);
  };

  const containerClasses = submitted
    ? "flex flex-col items-center mt-8"
    : "flex flex-col items-center flex-1 justify-center";

  return (
    <div className={`w-full max-w-[600px] ${containerClasses}`}>
      <div className="flex flex-col items-center justify-center h-52">
        {!submitted && (
          <h2 className="text-2xl font-medium text-center">
            {"읽은 책을 검색하고, "}
            <br className="md:hidden" />
            {"새로운 대화를 시작해보세요"}
          </h2>
        )}
      </div>

      <InputGarden
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={handleSearch}
        placeholder="가든 검색"
      />

      {loading ? (
        <p className="mt-16">검색 중…</p>
      ) : submitted && results.length === 0 ? (
        <p className="mt-16">검색 결과가 없습니다</p>
      ) : (
        results.length > 0 && (
          <ul className="mt-20 w-full space-y-4">
            <div className="flex items-center ml-1">
              <TextCyan className="font-medium text-xl">{submitted}</TextCyan>
              <TextBlack className="font-medium text-xl">
                에 대한 {results.length}개의 검색 결과
              </TextBlack>
            </div>
            <div className="mt-10">
              {results.map((b) => (
                <BookSearchItem key={b.isbn} book={b} garden={null} />
              ))}
            </div>
          </ul>
        )
      )}
    </div>
  );
}
