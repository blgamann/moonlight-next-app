"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  TextBlack,
  TextCyan,
  TextDarkGrey,
  TextGradient,
  TextGrey,
} from "./text";
import { Soulline, SoullineProps } from "./soulline";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { BookProps, BookList } from "./book";

import data from "@/data.json";
import { Button, ButtonBack, ButtonCancel, ButtonDeep } from "./button";
import { ButtonForward } from "./button";
import { ProfileMd, ProfileXl } from "./profile";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-[0.75px] border-gray-300 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)] rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}

export function CardAnswer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="pt-14 px-14 pb-6">{children}</div>
      <div className="flex justify-between items-center mb-4 pt-4 px-14 border-t-[0.75px] border-gray-200">
        <ButtonBack />
        <ButtonDeep />
        <ButtonForward />
      </div>
    </Card>
  );
}

export function CardLeftLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full relative border-[0.75px] border-gray-300 border-l-0 shadow-[0px_7px_25px_0px_rgba(0,0,0,0.04)] ${className}`}
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

export function CardProfile({
  children,
  image,
  className,
}: {
  children: React.ReactNode;
  image: string;
  className?: string;
}) {
  return (
    <Card className={`${className}`}>
      <ProfileXl image={image} className="mt-[-52px]" />
      {children}
    </Card>
  );
}

export function CardBio({
  bio,
  className,
}: {
  bio: string;
  className?: string;
}) {
  return (
    <CardLeftLine className={`max-w-[450px] py-6 pl-10 pr-8 ${className}`}>
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

export function CardSoullink({ name, image }: { name: string; image: string }) {
  return (
    <CardLeftLine className="py-6 px-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-4">
          <ProfileMd image={image} />
          <div className="flex flex-col gap-1 justify-center font-medium">
            <div className="flex items-center justify-center">
              <TextGradient>{name}</TextGradient>
              <TextBlack>님과 서로의 관심이 일치했어요!</TextBlack>
            </div>
            <TextBlack>소울링크를 띄어볼까요?</TextBlack>
          </div>
        </div>
        <Button>소울링크 띄우기</Button>
      </div>
    </CardLeftLine>
  );
}

export function CardSoullinkWaiting({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <CardLeftLine className="py-6 px-8">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-4">
          <ProfileMd image={image} />
          <div className="flex flex-col gap-1 justify-center font-medium">
            <div className="flex items-center justify-center">
              <TextGradient>{name}</TextGradient>
              <TextBlack>님께 소울링크를 띄었어요</TextBlack>
            </div>
            <TextGrey className="text-sm font-normal">4일 전</TextGrey>
          </div>
        </div>
        <ButtonCancel>소울링크 내리기</ButtonCancel>
      </div>
    </CardLeftLine>
  );
}

// New CardNotification component
type NotificationType = "soullink" | "match" | "letter" | "question";

export interface CardNotificationProps {
  type: NotificationType;
  profileImage: string;
  name?: string; // Used for soullink, match, question
  bookTitle?: string; // Used for letter
  author?: string; // Used for letter
  timestamp: string;
  isNew?: boolean;
  className?: string;
}

export function CardNotification({
  type,
  profileImage,
  name,
  bookTitle,
  author,
  timestamp,
  isNew = false,
  className = "",
}: CardNotificationProps) {
  const renderContent = () => {
    switch (type) {
      case "soullink":
        return (
          <div className="flex items-center">
            <TextBlack>{name}</TextBlack>
            <TextBlack>님과의&nbsp;</TextBlack>
            <TextCyan>소울링크</TextCyan>
            <TextBlack>가 생성되었어요</TextBlack>
          </div>
        );
      case "match":
        return (
          <div className="flex items-center">
            <TextBlack>{name}</TextBlack>
            <TextBlack>님과의&nbsp;</TextBlack>
            <TextCyan>매치</TextCyan>
            <TextBlack>가 생성되었어요</TextBlack>
          </div>
        );
      case "letter":
        return (
          <div className="flex flex-col">
            <TextGrey className="text-sm font-normal mb-0.5">
              {bookTitle}
            </TextGrey>
            <div className="flex items-center">
              <TextBlack>{author} 작가님의&nbsp;</TextBlack>
              <TextCyan>편지</TextCyan>
              <TextBlack>가 도착했어요</TextBlack>
            </div>
          </div>
        );
      case "question":
        return (
          <div className="flex items-center">
            <TextBlack>{name}</TextBlack>
            <TextBlack>님과&nbsp;</TextBlack>
            <TextCyan>공통 관심 질문</TextCyan>
            <TextBlack>이 생겼어요</TextBlack>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full relative bg-white border-[0.75px] border-gray-200 shadow-[0px_4px_15px_0px_rgba(0,0,0,0.03)] rounded-2xl py-5 px-6 flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-4">
        <ProfileMd image={profileImage} />
        <div className="flex flex-col gap-1 font-medium">
          {renderContent()}
          <TextGrey className="text-xs font-normal">{timestamp}</TextGrey>
        </div>
      </div>
      {isNew && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
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
        <h1>CardAnswer</h1>
        <CardAnswer>{content}</CardAnswer>
      </div>
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
        <h1>CardBio</h1>
        <CardBio
          bio={
            "CardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfileCardProfile"
          }
        />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center w-[500px]">
        <h1>CardSouline</h1>
        <CardSouline profiles={profiles} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardMutualBooks</h1>
        <CardMutualBooks books={books} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>CardSoullink</h1>
        <CardSoullink name={profiles[0].name} image={profiles[0].imageUrl} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center w-[500px]">
        <h1>CardNotification</h1>
        <CardNotification
          type="soullink"
          profileImage={profiles[1].imageUrl}
          name={profiles[1].name}
          timestamp="4시간 전"
          isNew
        />
        <CardNotification
          type="match"
          profileImage={profiles[0].imageUrl}
          name={profiles[0].name}
          timestamp="8시간 전"
          isNew
        />
        <CardNotification
          type="letter"
          profileImage={profiles[0].imageUrl} // Replace with actual path if available
          bookTitle="책임의 생성"
          author="고쿠분 고이치로"
          timestamp="12시간 전"
        />
        <CardNotification
          type="question"
          profileImage={profiles[0].imageUrl} // Replace with actual path if available
          name="남준"
          timestamp="6월 7일 (토)"
        />
      </div>
    </div>
  );
}
