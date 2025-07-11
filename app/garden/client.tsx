"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputGarden, TextBlack, TextGradient } from "@/components";
import { BookItem } from "@/lib/book";
import { ItemBookSearch } from "@/components/item";

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
    ? "flex flex-col items-center flex-1 mt-24"
    : "flex flex-col items-center flex-1 justify-center";

  return (
    <div className={`w-full max-w-[800px] mt-14 mb-36 ${containerClasses}`}>
      {!submitted && (
        <div className="flex flex-col items-center justify-center h-48">
          <h2 className="text-2xl font-medium text-center">
            {"읽은 책을 검색하고, "}
            <br className="md:hidden" />
            {"새로운 대화를 시작해보세요"}
          </h2>
        </div>
      )}

      <InputGarden
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={handleSearch}
        placeholder="가든 검색"
      />

      {loading ? (
        <div className="flex flex-1 items-center justify-center mt-8">
          검색 중…
        </div>
      ) : submitted && results.length === 0 ? (
        <div className="flex flex-1 items-center justify-center mt-8">
          검색 결과가 없습니다
        </div>
      ) : (
        results.length > 0 && (
          <ul className="mt-20 w-full space-y-4">
            <div className="flex items-center ml-1">
              <TextGradient className="font-medium text-lg">
                {submitted}
              </TextGradient>
              <TextBlack className="font-medium text-lg">
                에 대한 {results.length}개의 검색 결과
              </TextBlack>
            </div>
            <div className="mt-10">
              {results.map((b) => (
                <div
                  key={b.isbn}
                  className="py-10 border-t-[0.75px] border-gray-300"
                >
                  <ItemBookSearch book={b} garden={null} />
                </div>
              ))}
            </div>
          </ul>
        )
      )}
    </div>
  );
}
