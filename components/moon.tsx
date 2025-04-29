import React from "react";

export type MoonIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export const Moon: React.FC<MoonIconProps> = ({
  size = 24,
  color = "#39d4e7", // 색상은 원래 코드를 따름
  className = "",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none" // SVG 자체에는 fill="none"
    stroke="none" // Stroke 없음
    className={className}
    {...props}
  >
    <path
      fill={color} // Path에만 fill 적용
      fillRule="evenodd"
      clipRule="evenodd"
      // === 수정된 Path Data ===
      d="
        M12 2 
        A 10 10 0 1 1 12 21.999 
        A 10 10 0 1 1 12 2 
        Z 
        M15 4 
        A 8 8 0 1 1 15 19.999 
        A 8 8 0 1 1 15 4 
        Z
      "
      // 설명:
      // 각 원을 두 개의 큰 호(large-arc-flag=1)로 그려 완전한 원을 구성합니다.
      // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      // 1. 큰 원 (Center: 12,12, Radius: 10):
      //    M12 2                     -> 시작점 (12, 2)
      //    A 10 10 0 1 1 12 21.999   -> 반지름 10, 큰 호(1), 시계방향(1)으로 거의 반대편(12, 22 근처)까지 그리기
      //    A 10 10 0 1 1 12 2        -> 반지름 10, 큰 호(1), 시계방향(1)으로 다시 시작점(12, 2)까지 그리기
      //    Z                         -> 경로 닫기
      //    (참고: 끝점을 22 대신 21.999로 하여 시작점과 동일해지는 것을 피함 - 렌더링 안정성)
      // 2. 작은 원 (Center: 15,12, Radius: 8):
      //    M15 4                     -> 시작점 (15, 4)
      //    A 8 8 0 1 1 15 19.999     -> 반지름 8, 큰 호(1), 시계방향(1)으로 거의 반대편(15, 20 근처)까지 그리기
      //    A 8 8 0 1 1 15 4          -> 반지름 8, 큰 호(1), 시계방향(1)으로 다시 시작점(15, 4)까지 그리기
      //    Z                         -> 경로 닫기
    />
  </svg>
);
