export function TextLogo({ children }: { children: React.ReactNode }) {
  return (
    <div className={`font-['GurmukhiMN'] text-[#39d4e7] text-xl`}>
      {children}
    </div>
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
        font-['Helvetica']
        bg-[linear-gradient(178.8deg,_#56c1ff,_#6ae8d8)]
        bg-clip-text
        text-transparent
        ${className}
      `}
    >
      {children}
    </div>
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
    <div className={`font-['Helvetica'] text-[#383838] ${className}`}>
      {children}
    </div>
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
    <div className={`font-['Helvetica'] text-[#929292] ${className}`}>
      {children}
    </div>
  );
}

export function TextComponent() {
  return (
    <div className="flex flex-col gap-4">
      <TextLogo>moonlight</TextLogo>
      <TextGradient>책을 통해, 마음이 만나는 곳</TextGradient>
      <TextBlack>문 라이트에 오신 것을 환영합니다</TextBlack>
      <TextGrey>독후감을 공유하고 나의 소울 메이트를 찾아보세요</TextGrey>
    </div>
  );
}
