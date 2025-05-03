"use client";

import { useState, useEffect } from "react";
import { TextGrey } from "./text";

export function IndicatorProfile({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-0.5 text-xs">
      <TextGrey>{current + 1}</TextGrey>
      <TextGrey>/</TextGrey>
      <TextGrey>{total}</TextGrey>
    </div>
  );
}

export function IndicatorAnswer({
  current,
  total,
  className,
  onIndicatorClick,
}: {
  current: number;
  total: number;
  className?: string;
  onIndicatorClick?: (index: number) => void;
}) {
  const [previousCurrent, setPreviousCurrent] = useState(current);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (current > previousCurrent) {
      setDirection("right");
    } else if (current < previousCurrent) {
      setDirection("left");
    } else {
      setDirection(null);
    }
    setPreviousCurrent(current);
  }, [current, previousCurrent]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === current;
          let backgroundStyle: string;

          if (isActive) {
            if (direction === "right") {
              backgroundStyle = "linear-gradient(90deg, #56c1ff, #6ae8d8)";
            } else {
              backgroundStyle = "linear-gradient(270deg, #56c1ff, #6ae8d8)";
            }
          } else {
            backgroundStyle = "#d1d5db";
          }

          return (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ease-in-out ${
                onIndicatorClick ? "cursor-pointer" : ""
              }`}
              style={{
                width: isActive ? "34px" : "16px",
                background: backgroundStyle,
              }}
              onClick={() => onIndicatorClick?.(i)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function IndicatorComponents() {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-lg font-semibold">IndicatorProfile</h1>
        <IndicatorProfile current={1} total={10} />
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-lg font-semibold">IndicatorAnswer</h1>
        <IndicatorAnswer current={5} total={10} />
      </div>
    </div>
  );
}
