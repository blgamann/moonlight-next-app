"use client";

import Image from "next/image";
import data from "@/data.json";
import { TextBlack, TextGrey } from "./text";

// 크기 매핑: cover width (px)
const SIZE_MAP = {
  sm: 40,
  md: 80,
  lg: 120,
  xl: 160,
} as const;

// 텍스트 스타일 매핑
const TITLE_SIZE_MAP = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;
const AUTHOR_SIZE_MAP = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
} as const;
const TITLE_WEIGHT_MAP = {
  sm: "font-medium",
  md: "font-semibold",
  lg: "font-semibold",
  xl: "font-bold",
} as const;
const GAP_MAP = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
} as const;

type SizeKey = keyof typeof SIZE_MAP;
type Orientation = "vertical" | "horizontal";

interface BookProps {
  image: string;
  title?: string;
  author?: string;
  size?: SizeKey;
  orientation?: Orientation;
}

/**
 * 범용 Book 컴포넌트
 * - size: sm, md, lg, xl
 * - orientation: vertical(텍스트 아래), horizontal(텍스트 오른쪽)
 * - image: 표지 URL
 * - title: optional 책 제목
 * - author: optional 저자 이름
 */
export function Book({
  image,
  title,
  author,
  size = "md",
  orientation = "vertical",
}: BookProps) {
  const width = SIZE_MAP[size];
  const gap = GAP_MAP[size];

  // 이미지 렌더링
  const cover = (
    <div
      className="overflow-hidden rounded-sm shadow-sm"
      style={{ width, height: Math.round(width * 1.5) }}
    >
      <Image
        src={image}
        alt={title || "book cover"}
        width={width}
        height={Math.round(width * 1.5)}
        className="object-cover w-full h-full"
      />
    </div>
  );

  // 텍스트 렌더링
  const text = (
    <div className="flex flex-col items-start">
      {title && (
        <TextBlack
          className={`${TITLE_SIZE_MAP[size]} ${TITLE_WEIGHT_MAP[size]} line-clamp-2`}
        >
          {title}
        </TextBlack>
      )}
      {author && (
        <TextGrey className={`${AUTHOR_SIZE_MAP[size]} mt-1 line-clamp-1`}>
          {author}
        </TextGrey>
      )}
    </div>
  );

  return (
    <div
      className={`flex items-center ${
        orientation === "vertical" ? "flex-col" : "flex-row"
      }`}
      style={{ gap }}
    >
      {cover}
      {orientation === "horizontal" ? (
        text
      ) : title || author ? (
        <div style={{ marginTop: gap }}>{text}</div>
      ) : null}
    </div>
  );
}

/**
 * 모든 사이즈와 옵션(title/author) 그리고 orientation 조합 예시 렌더링
 */
export function BookComponents() {
  const sample = data.books[0];
  const options = [
    { title: sample.title },
    { title: sample.title, author: sample.author },
  ];
  const sizes: SizeKey[] = ["sm", "md", "lg", "xl"];
  const orientations: Orientation[] = ["vertical", "horizontal"];

  return (
    <div className="space-y-12 p-8">
      {options.map((opts, idx) => (
        <section key={idx}>
          <h2 className="text-xl font-bold mb-4">
            {opts.author ? "Title + Author" : "Title Only"}
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {orientations.map((orientation) => (
              <div key={orientation}>
                <h3 className="text-lg font-semibold mb-3 capitalize">
                  {orientation === "horizontal" ? "Horizontal" : "Vertical"}
                </h3>
                <div className="flex items-start gap-6 flex-wrap">
                  {sizes.map((size) => (
                    <Book
                      key={`${idx}-${orientation}-${size}`}
                      image={sample.imageUrl}
                      title={opts.title}
                      author={opts.author}
                      size={size}
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
