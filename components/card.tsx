"use client";

import React, { useRef, useEffect, useState } from "react";
import { TextCyan, TextDarkGrey } from "./text";
import { Soulline, SoullineProps } from "./soulline";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { BookProps, BookLg } from "./book";

import data from "@/data.json";

export function CardLeftLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full relative pl-9 pr-6 py-6.5 border-[0.75px] border-gray-300 border-l-0 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)]">
      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-[3.5px]
          bg-[linear-gradient(178.8deg,_#56c1ff,_#6ae8d8)]
        "
      />
      {children}
    </div>
  );
}

export function CardTopLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full relative px-6 border-[0.75px] border-gray-300 border-t-0 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)] ${className}`}
    >
      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3.5px]
          bg-[linear-gradient(178.8deg,_#6ae8d8,_#56c1ff)]
        "
      />
      {children}
    </div>
  );
}

export function CardSouline({ profiles }: { profiles: SoullineProps[] }) {
  return (
    <div className="w-full">
      <CardTopLine className="py-8">
        <div className="flex flex-col items-center gap-1.5 mb-10">
          <TextCyan className="text-sm font-medium">초대 기반</TextCyan>
          <div className="flex items-center gap-1">
            <TextDarkGrey className="text-xl font-medium">
              소울라인
            </TextDarkGrey>
            <HiOutlineInformationCircle size={16} color="#aeaeae" />
          </div>
        </div>
        <Soulline profiles={profiles} />
      </CardTopLine>
    </div>
  );
}

export function CardMutualBooks({ books }: { books: BookProps[] }) {
  return (
    <div className="w-full">
      <CardTopLine className="py-10">
        <div className="flex flex-col items-center gap-1.5 mb-12">
          <TextDarkGrey className="text-xl font-medium">
            함께 읽은 책
          </TextDarkGrey>
        </div>
        <div className="flex gap-10">
          {books.map((book) => (
            <BookLg key={book.url} url={book.url} title={book.title} />
          ))}
        </div>
      </CardTopLine>
    </div>
  );
}

export function CardWaiting({ children }: { children: React.ReactNode }) {
  const strokeWidth = 3.5;
  const rectRef = useRef<SVGRectElement>(null);

  const [perimeter, setPerimeter] = useState(0);
  const [segment, setSegment] = useState(0);

  useEffect(() => {
    const path = rectRef.current;
    if (!path) return;

    // function to recalc both perimeter & segment
    const updateMetrics = () => {
      const full = path.getTotalLength();
      const { height } = path.getBBox();
      setPerimeter(full);
      setSegment(height);
    };

    // run once on mount
    updateMetrics();

    // observe size changes on the <svg> (its parentElement)
    const svg = path.parentElement;
    let resizeObserver: ResizeObserver | null = null;
    if (svg && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateMetrics);
      resizeObserver.observe(svg);
    }

    // also listen to window resize as a fallback
    window.addEventListener("resize", updateMetrics);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // compute the gap
  const gap = Math.max(0, perimeter - segment);

  return (
    <div className="relative max-w-[450px] border-[0.75px] border-gray-300 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)]">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="borderGrad" gradientTransform="rotate(178.8)">
            <stop offset="0%" stopColor="#6ae8d8" />
            <stop offset="100%" stopColor="#56c1ff" />
          </linearGradient>
        </defs>
        <rect
          ref={rectRef}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width="calc(100% - 3.5px)"
          height="calc(100% - 3.5px)"
          fill="none"
          stroke="url(#borderGrad)"
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray: `${segment} ${gap}`,
            strokeDashoffset: 0,
            animation: "moveSegment 8s linear infinite",
          }}
        />
      </svg>
      <div className="relative z-0 py-6.5 px-6 bg-white">{children}</div>
      <style jsx global>{`
        @keyframes moveSegment {
          to {
            stroke-dashoffset: -${perimeter}px;
          }
        }
      `}</style>
    </div>
  );
}

export function CardComponent() {
  const content = (
    <TextDarkGrey>
      {
        "죽음은 신나게 놀고 있는데 엄마가 '얘야, 그만 놀고 들어와 밥 먹어라'하고 부르는 소리와 같습니다."
      }
    </TextDarkGrey>
  );

  const profiles = data.profiles.slice(0, 2);
  const books = data.books.map((book) => ({
    url: book.imageUrl,
    title: book.title,
  }));

  return (
    <div className="flex flex-col gap-4">
      <CardLeftLine>{content}</CardLeftLine>
      <CardTopLine className="py-8 px-4">{content}</CardTopLine>
      <CardWaiting>{content}</CardWaiting>
      <CardSouline profiles={profiles} />
      <CardMutualBooks books={books} />
    </div>
  );
}
