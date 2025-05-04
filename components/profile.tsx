"use client";

import Image from "next/image";
import data from "@/data.json";
import { TextDarkGrey } from "./text";

// 크기 매핑
const SIZE_MAP = {
  xs: 20,
  sm: 35,
  md: 62,
  lg: 85,
  xl: 100,
} as const;

// 텍스트 스타일 매핑
const FONT_SIZE_MAP = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;
const FONT_WEIGHT_MAP = {
  xs: "font-normal",
  sm: "font-medium",
  md: "font-medium",
  lg: "font-semibold",
  xl: "font-bold",
} as const;
const MARGIN_VERTICAL_MAP = {
  xs: "mt-1",
  sm: "mt-1.5",
  md: "mt-2",
  lg: "mt-3",
  xl: "mt-4",
} as const;
const MARGIN_HORIZONTAL_MAP = {
  xs: "ml-1.5",
  sm: "ml-2",
  md: "ml-2.5",
  lg: "ml-3",
  xl: "ml-4",
} as const;

// Soulline/Soulmate 최대 border 굵기
const MAX_BORDER = 3.5;

type SizeKey = keyof typeof SIZE_MAP;
type Orientation = "vertical" | "horizontal";
type Variant = "default" | "soulline" | "soulmate";

interface ProfileProps {
  image: string;
  name?: string;
  size?: SizeKey;
  orientation?: Orientation;
  variant?: Variant;
  className?: string;
}

/**
 * 범용 Profile 컴포넌트
 * - size: xs, sm, md, lg, xl
 * - orientation: vertical(이름 아래), horizontal(이름 오른쪽)
 * - variant: default, soulline, soulmate
 */
export function Profile({
  image,
  name,
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
  const borderWidth = (dimension / SIZE_MAP.xl) * MAX_BORDER; // xl 기준 최대

  let avatarNode;
  if (variant === "soulline") {
    const padding = 4; // 고정 내부 여백(픽셀)
    const outerSize = dimension + padding * 2 + borderWidth * 2;
    avatarNode = (
      <div
        className="rounded-full box-border bg-white border-solid border-[#6edfee] overflow-hidden"
        style={{
          width: outerSize,
          height: outerSize,
          padding,
          borderWidth,
        }}
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
        style={{
          width: outerSize,
          height: outerSize,
          padding,
        }}
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
        className="rounded-full overflow-hidden w-auto h-auto"
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
      {name && (
        <div className={`${marginClass} w-auto`}>
          <TextDarkGrey
            className={`${FONT_SIZE_MAP[size]} ${FONT_WEIGHT_MAP[size]} ${textAlignClass}`}
          >
            {name}
          </TextDarkGrey>
        </div>
      )}
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
          <div className="grid grid-cols-2 gap-8">
            {orientations.map((orientation) => (
              <div key={orientation}>
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {orientation === "horizontal" ? "Name Right" : "Name Below"}
                </h3>
                <div className="flex items-center gap-6">
                  {sizes.map((sizeKey) => (
                    <Profile
                      key={`${variant}-${orientation}-${sizeKey}`}
                      image={profile.imageUrl}
                      name={profile.name}
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
