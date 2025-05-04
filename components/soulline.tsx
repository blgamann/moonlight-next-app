// components/soulline.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import data from "@/data.json";
import { Profile } from "./profile";
import { PopCardHiddenProfiles } from "./pop-card";

const profiles = data.profiles;

export interface SoullineProps {
  imageUrl: string;
  name: string;
  altText?: string;
}

type Item =
  | { type: "profile"; profile: SoullineProps }
  | { type: "more"; count: number; hiddenProfiles: SoullineProps[] };

export function Soulline({ profiles }: { profiles: SoullineProps[] }) {
  const MAX = 5;
  const [activePopCardIndex, setActivePopCardIndex] = useState<number | null>(
    null
  );
  const soullineRef = useRef<HTMLDivElement>(null);

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

  const handleMoreClick = (index: number) => {
    setActivePopCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClosePopCard = () => {
    setActivePopCardIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        soullineRef.current &&
        !soullineRef.current.contains(event.target as Node)
      ) {
        handleClosePopCard();
      }
    };

    if (activePopCardIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePopCardIndex]);

  return (
    <div
      className="flex flex-col items-center w-full"
      ref={soullineRef}
      onClick={() => {
        if (activePopCardIndex !== null) {
          handleClosePopCard();
        }
      }}
    >
      <div className="flex items-center w-full">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="relative w-18 flex-shrink-0">
              {item.type === "profile" ? (
                <Profile
                  image={item.profile.imageUrl}
                  size="md"
                  variant="soulmate"
                  orientation="horizontal"
                />
              ) : (
                <div
                  className="
                    w-[74px] h-[74px]
                    flex items-center justify-center
                    rounded-full bg-white
                    border-[2.5px] border-[#6edfee]
                    cursor-pointer hover:bg-gray-100
                  "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoreClick(idx);
                  }}
                >
                  <span className="text-[#6edfee] font-semibold">
                    +{item.count}
                  </span>
                </div>
              )}
              {item.type === "more" && activePopCardIndex === idx && (
                <PopCardHiddenProfiles profiles={item.hiddenProfiles} />
              )}
            </div>

            {idx < items.length - 1 && (
              <div
                className="flex-1 h-[3.5px] bg-[#6edfee]"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function SoullineComponents() {
  return (
    <div className="flex flex-col items-center w-full gap-12">
      <Soulline profiles={profiles.slice(0, 2)} />
      <Soulline profiles={profiles.slice(0, 3)} />
      <Soulline profiles={profiles.slice(0, 4)} />
      <Soulline profiles={profiles.slice(0, 5)} />
      <Soulline profiles={[...profiles, ...profiles.slice(0, 1)]} />
      <Soulline profiles={[...profiles, ...profiles.slice(0, 2)]} />
      <Soulline profiles={[...profiles, ...profiles.slice(0, 3)]} />
      <Soulline profiles={[...profiles, ...profiles.slice(0, 4)]} />
      <Soulline profiles={[...profiles, ...profiles.slice(0, 5)]} />
    </div>
  );
}
