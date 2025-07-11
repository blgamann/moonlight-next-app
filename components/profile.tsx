"use client";

import Image from "next/image";
import data from "@/data.json";
import { TextDarkGrey, TextGrey } from "./text";

// 크기 매핑
export const SIZE_MAP = {
  xs: 20,
  sm: 35,
  md: 62,
  lg: 85,
  xl: 100,
} as const;

// 텍스트 스타일 매핑
export const FONT_SIZE_MAP = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;
export const FONT_WEIGHT_MAP = {
  xs: "font-normal",
  sm: "font-medium",
  md: "font-medium",
  lg: "font-semibold",
  xl: "font-bold",
} as const;
export const MARGIN_VERTICAL_MAP = {
  xs: "mt-1",
  sm: "mt-1.5",
  md: "mt-2",
  lg: "mt-3",
  xl: "mt-4",
} as const;
export const MARGIN_HORIZONTAL_MAP = {
  xs: "ml-1.5",
  sm: "ml-2",
  md: "ml-2.5",
  lg: "ml-3",
  xl: "ml-4",
} as const;

// Soulline/Soulmate 최대 border 굵기
export const MAX_BORDER = 3.5;

export type SizeKey = keyof typeof SIZE_MAP;
export type Orientation = "vertical" | "horizontal";
export type Variant = "default" | "soulline" | "soulmate";

interface ProfileProps {
  image: string;
  name?: string;
  bio?: string;
  size?: SizeKey;
  orientation?: Orientation;
  variant?: Variant;
  className?: string;
}

/**
 * 범용 Profile 컴포넌트
 * - size: xs, sm, md, lg, xl
 * - orientation: vertical(이름·bio 아래), horizontal(이름·bio 오른쪽)
 * - variant: default, soulline, soulmate
 */
export function Profile({
  image,
  name,
  bio,
  size = "md",
  orientation = "vertical",
  variant = "default",
  className,
}: ProfileProps) {
  const dimension = SIZE_MAP[size];
  const isHorizontal = orientation === "horizontal";

  // container flex 방향
  const wrapperClass = [
    "flex items-center",
    isHorizontal ? "flex-row" : "flex-col",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 텍스트 여백 및 정렬
  const marginClass = isHorizontal
    ? MARGIN_HORIZONTAL_MAP[size]
    : MARGIN_VERTICAL_MAP[size];
  const textAlignClass = isHorizontal ? "text-left" : "text-center";

  // Soulline/Soulmate border width 계산
  const borderWidth = (dimension / SIZE_MAP.xl) * MAX_BORDER;

  // Avatar 렌더링
  let avatarNode;
  if (variant === "soulline") {
    const padding = 4;
    const outerSize = dimension + padding * 2 + borderWidth * 2;
    avatarNode = (
      <div
        className="rounded-full box-border bg-white border-solid border-[#6edfee] overflow-hidden"
        style={{ width: outerSize, height: outerSize, padding, borderWidth }}
      >
        <Image
          src={image}
          alt="profile"
          width={dimension}
          height={dimension}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    );
  } else if (variant === "soulmate") {
    const padding = borderWidth;
    const outerSize = dimension + padding * 2;
    avatarNode = (
      <div
        className="rounded-full overflow-hidden bg-gradient-to-r from-[#6ae8d8] to-[#56c1ff] box-border"
        style={{ width: outerSize, height: outerSize, padding }}
      >
        <div className="rounded-full overflow-hidden bg-white w-full h-full">
          <Image
            src={image}
            alt="profile"
            width={dimension}
            height={dimension}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    );
  } else {
    avatarNode = (
      <div
        className="rounded-full overflow-hidden"
        style={{ width: dimension, height: dimension }}
      >
        <Image
          src={image}
          alt="profile"
          width={dimension}
          height={dimension}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {avatarNode}
      <div className={`${marginClass} flex flex-col ${textAlignClass}`}>
        {name && (
          <TextDarkGrey
            className={`${FONT_SIZE_MAP[size]} ${FONT_WEIGHT_MAP[size]}`}
          >
            {name}
          </TextDarkGrey>
        )}
        {bio && (
          <TextGrey className={`${FONT_SIZE_MAP[size]} mt-1`}>{bio}</TextGrey>
        )}
      </div>
    </div>
  );
}

// 가독성을 고려해 2열 그리드로 배치
export function ProfileComponents() {
  const profile = data.profiles[0];
  const sizes: SizeKey[] = ["xs", "sm", "md", "lg", "xl"];
  const variants: Variant[] = ["default", "soulline", "soulmate"];
  const orientations: Orientation[] = ["vertical", "horizontal"];

  return (
    <div className="flex flex-col space-y-12">
      {variants.map((variant) => (
        <section key={variant}>
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {variant} variant
          </h2>
          <div className="flex flex-col gap-6">
            {orientations.map((orientation) => (
              <div key={orientation}>
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {orientation === "horizontal"
                    ? "Name & Bio Right"
                    : "Name & Bio Below"}
                </h3>
                <div className="flex items-center gap-6">
                  {sizes.map((sizeKey) => (
                    <Profile
                      key={`${variant}-${orientation}-${sizeKey}`}
                      image={profile.imageUrl}
                      name={profile.name}
                      bio={profile.bio}
                      size={sizeKey}
                      variant={variant}
                      orientation={orientation}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
