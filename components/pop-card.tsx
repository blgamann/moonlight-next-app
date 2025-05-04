// components/PopCard.tsx
import React from "react";
import data from "@/data.json";
import { Profile } from "./profile";
import { SoullineProps } from "./soulline";
import { TextGrey, TextBlack, TextDarkGrey } from "./text";

import { IoBookOutline } from "react-icons/io5";
import { GoInfinity } from "react-icons/go";

interface PopCardProps {
  profiles: SoullineProps[];
}

export function PopCardHiddenProfiles({ profiles }: PopCardProps) {
  return (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10 w-max max-w-xs">
      <div
        className="bg-white p-3 rounded-lg shadow-lg border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <TextGrey className="text-sm mb-4 text-center">숨겨진 프로필</TextGrey>
        <div className="flex flex-col gap-1.5">
          {profiles.map((profile, index) => (
            <Profile
              key={index}
              size="sm"
              variant="soulline"
              orientation="horizontal"
              image={profile.imageUrl}
              name={profile.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PopCardProfile({
  image,
  name,
  bio,
  chonsu,
  mutualBooks,
}: {
  image: string;
  name: string;
  bio: string;
  chonsu: number;
  mutualBooks: string[];
}) {
  return (
    <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 w-[300px]">
      <div className="h-16 bg-[linear-gradient(178.8deg,_#6cbfff,_#7ce0d0)] rounded-t-lg" />
      <div className="absolute top-16 left-12 -translate-x-1/2 -translate-y-1/2">
        <Profile size="md" image={image} />
      </div>
      <div className="flex flex-col items-start text-left pt-8 pb-4 px-4">
        <TextBlack className="font-bold text-lg mt-2">{name}</TextBlack>
        <TextDarkGrey className="text-xs mt-1">{bio}</TextDarkGrey>
        <div className="flex flex-col gap-1 text-xs mt-4">
          <div className="flex items-center gap-1.5">
            <GoInfinity size={12} color="#aeaeae" />
            <TextGrey className="text-xs">{chonsu}촌 관계</TextGrey>
          </div>
          <div className="flex items-center gap-1.5">
            <IoBookOutline size={12} color="#aeaeae" />
            <TextGrey className="text-xs">
              함께 읽은 책 {mutualBooks.length}권
            </TextGrey>
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-1.5 mt-3">
          {mutualBooks.map((bookTitle, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[10px] font-medium"
            >
              {bookTitle}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PopCardComponents() {
  const profiles = data.profiles;
  const books = data.books;

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="relative mb-40">
        <PopCardHiddenProfiles profiles={profiles.slice(0, 2)} />
      </div>
      <PopCardProfile
        image={profiles[0].imageUrl}
        name={profiles[0].name}
        bio={profiles[0].bio}
        chonsu={3}
        mutualBooks={books.map((book) => book.title).slice(0, 3)}
      />
    </div>
  );
}
