"use client";

import React, { useRef, useEffect, useState } from "react";
import { TextCyan, TextDarkGrey } from "./text";
import { Soulline, SoullineProps } from "./soulline";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { BookProps, BookList } from "./book";

import data from "@/data.json";

export function CardLeftLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full relative pl-1 border-[0.75px] border-gray-300 border-l-0 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)] ${className}`}
    >
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
      className={`w-full relative pt-1 border-[0.75px] border-gray-300 border-t-0 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)] ${className}`}
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

export function CardWaiting({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
    <div className="relative w-full border-[0.75px] border-gray-300 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)]">
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
      <div className={`relative z-0 bg-white ${className}`}>{children}</div>
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

export function CardProfile({ bio }: { bio: string }) {
  return (
    <CardLeftLine className="max-w-[450px] py-6 pl-10 pr-8">
      <TextDarkGrey>{bio}</TextDarkGrey>
    </CardLeftLine>
  );
}

export function CardSouline({
  profiles,
  className,
}: {
  profiles: SoullineProps[];
  className?: string;
}) {
  return (
    <div className="w-full">
      <CardTopLine className={`px-14 pt-10 pb-10 ${className}`}>
        <div className="flex flex-col items-center gap-1.5 pb-8">
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

export function CardMutualBooks({
  books,
  className,
}: {
  books: BookProps[];
  className?: string;
}) {
  return (
    <div className="w-full">
      <CardTopLine className={`px-14 pt-10 pb-10 ${className}`}>
        <div className="flex flex-col items-center mb-12">
          <TextDarkGrey className="text-xl font-medium">
            함께 읽은 책
          </TextDarkGrey>
        </div>
        <div className="flex">
          <BookList books={books} />
        </div>
      </CardTopLine>
    </div>
  );
}

export function CardComponents() {
  const content = <TextDarkGrey>{"뿅!"}</TextDarkGrey>;

  const profiles = data.profiles.slice(0, 2);
  const books = data.books.map((book) => ({
    image: book.imageUrl,
    title: book.title,
  }));
  books.sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardLeftLine</h1>
        <CardLeftLine>{content}</CardLeftLine>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardTopLine</h1>
        <CardTopLine>{content}</CardTopLine>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardWaiting</h1>
        <CardWaiting>{"애니메이션 고정 이슈"}</CardWaiting>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardProfile</h1>
        <CardProfile
          bio={
            "CardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfile"
          }
        />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardSouline</h1>
        <CardSouline profiles={profiles} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardMutualBooks</h1>
        <CardMutualBooks books={books} />
      </div>
    </div>
  );
}
