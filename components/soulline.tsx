// components/soulline.tsx
"use client";

import React, { useState, useRef } from "react";
import data from "@/data.json";
import { Profile, SizeKey, SIZE_MAP, MAX_BORDER } from "./profile";

export interface SoullineProps {
  imageUrl: string;
  altText?: string;
}

type Item =
  | { type: "profile"; profile: SoullineProps }
  | { type: "more"; count: number; hiddenProfiles: SoullineProps[] };

interface SoullinePropsList {
  profiles: SoullineProps[];
  size?: SizeKey;
}

export function Soulline({ profiles, size = "md" }: SoullinePropsList) {
  const MAX = 5;
  const [activePopCardIndex, setActivePopCardIndex] = useState<number | null>(
    null
  );
  const soullineRef = useRef<HTMLDivElement>(null);

  if (!profiles || profiles.length === 0) {
    return <div>소울라인이 형성되지 않았습니다.</div>;
  }

  // 아바타 크기 및 테두리 두께 계산
  const dimension = SIZE_MAP[size];
  const borderWidth = (dimension / SIZE_MAP.xl) * MAX_BORDER;
  const placeholderSize = dimension + borderWidth * 2;

  // 표시할 아이템 결정
  const items: Item[] =
    profiles.length <= MAX
      ? profiles.map((p) => ({ type: "profile" as const, profile: p }))
      : [
          { type: "profile", profile: profiles[0] },
          { type: "profile", profile: profiles[1] },
          {
            type: "more",
            count: profiles.length - 4,
            hiddenProfiles: profiles.slice(2, profiles.length - 2),
          },
          { type: "profile", profile: profiles[profiles.length - 2] },
          { type: "profile", profile: profiles[profiles.length - 1] },
        ];

  // 바깥 클릭으로 팝카드 닫기
  // useEffect(() => {
  //   function handleClickOutside(e: MouseEvent) {
  //     if (
  //       soullineRef.current &&
  //       !soullineRef.current.contains(e.target as Node)
  //     ) {
  //       setActivePopCardIndex(null);
  //     }
  //   }
  //   if (activePopCardIndex !== null) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [activePopCardIndex]);

  return (
    <div
      className="relative flex flex-col items-center w-full"
      ref={soullineRef}
      onClick={() => activePopCardIndex !== null && setActivePopCardIndex(null)}
    >
      {/* 프로필 사이 배경 라인: 좌우 여백만큼 제거하여 양 끝 삐져나옴 방지 */}
      <div
        className="absolute"
        style={{
          left: placeholderSize / 2,
          right: placeholderSize / 2,
          top: "50%",
          height: borderWidth,
          transform: "translateY(-50%)",
        }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[#6edfee]" />
      </div>

      {/* 아바타 및 +n 렌더링 */}
      <div className="relative flex items-center w-full justify-between z-10">
        {items.map((item, idx) => (
          <div key={idx} className="relative flex-shrink-0">
            {item.type === "profile" ? (
              <Profile
                image={item.profile.imageUrl}
                size={size}
                variant="soulmate"
                orientation="horizontal"
              />
            ) : (
              <div
                className="rounded-full bg-white border-solid border-[#6edfee] flex items-center justify-center cursor-pointer hover:bg-gray-100"
                style={{
                  width: placeholderSize,
                  height: placeholderSize,
                  borderWidth,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePopCardIndex(idx);
                }}
              >
                <span
                  className="font-semibold"
                  style={{ fontSize: dimension * 0.4, color: "#6edfee" }}
                >
                  +{item.count}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 사이즈별 렌더링 테스트
export function SoullineComponents() {
  const profiles = [...data.profiles, ...data.profiles] as SoullineProps[];
  const sizes: SizeKey[] = ["xs", "sm", "md", "lg", "xl"];

  return (
    <div className="flex flex-col items-center w-full gap-12">
      {sizes.map((s) => (
        <div key={s} className="w-full">
          <h2 className="text-xl font-semibold mb-4 capitalize">{s} size</h2>
          <Soulline profiles={profiles} size={s} />
        </div>
      ))}
    </div>
  );
}
