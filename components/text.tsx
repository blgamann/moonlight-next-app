import { gurmukhiMN } from "@/app/fonts";
import Link from "next/link";

export function TextLogo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href="/discover">
      <div
        className={`${gurmukhiMN.className} text-[#39d4e7] text-xl ${className}`}
      >
        {children}
      </div>
    </Link>
  );
}

export function TextGradient({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        bg-[linear-gradient(178.8deg,_#56c1ff,_#6ae8d8)]
        bg-clip-text
        text-transparent
        break-words
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function TextCyan({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-[#39d4e7] break-words ${className}`}>{children}</div>
  );
}

export function TextBlack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-[#383838] break-words ${className}`}>{children}</div>
  );
}

export function TextDarkGrey({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-[#5e5e5e] break-words ${className}`}>{children}</div>
  );
}

export function TextGrey({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-[#929292] break-words ${className}`}>{children}</div>
  );
}

export function TextComponents() {
  return (
    <div className="flex flex-col gap-4">
      <TextLogo>moonlight (TextLogo)</TextLogo>
      <TextCyan>초대 기반 (TextCyan)</TextCyan>
      <TextGradient>책을 통해, 마음이 만나는 곳 (TextGradient)</TextGradient>
      <TextBlack>문 라이트에 오신 것을 환영합니다 (TextBlack)</TextBlack>
      <TextDarkGrey>
        죽음은 신나게 놀고 있는데 엄마가 &apos;얘야, 그만 놀고 들어와 밥
        먹어라&apos;하고 부르는 소리와 같습니다. (TextDarkGrey)
      </TextDarkGrey>
      <TextGrey>
        독후감을 공유하고 나의 소울 메이트를 찾아보세요 (TextGrey)
      </TextGrey>
    </div>
  );
}
