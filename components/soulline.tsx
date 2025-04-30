// components/soulline.tsx
"use client";

import React from "react";
import data from "@/data.json";
import { ProfileMdSoulline } from "./profile";

const profiles = data.profiles;

export interface SoullineProps {
  imageUrl: string;
  name: string;
  altText?: string;
}

export function Soulline({ profiles }: { profiles: SoullineProps[] }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full">
        {profiles.map((profile, idx) => (
          <React.Fragment key={profile.name}>
            <div className="relative w-18 flex-shrink-0">
              <ProfileMdSoulline url={profile.imageUrl} />
            </div>
            {idx < profiles.length - 1 && (
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

export function SoullineComponent() {
  return (
    <div className="flex flex-col items-center w-full">
      <Soulline profiles={profiles.slice(0, 2)} />
      <Soulline profiles={profiles.slice(0, 3)} />
      <Soulline profiles={profiles.slice(0, 4)} />
      <Soulline profiles={profiles.slice(0, 5)} />
    </div>
  );
}
