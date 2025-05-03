import { TextBlack, TextGrey } from "./text";

export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TextGrey
      className={`w-full text-sm pb-4 border-b-[0.75px] border-gray-300 ${className}`}
    >
      {children}
    </TextGrey>
  );
}

export function LabelLg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TextBlack
      className={`w-full text-xl font-semibold pb-4 border-b-[0.75px] border-gray-300 ${className}`}
    >
      {children}
    </TextBlack>
  );
}

export function LabelComponents() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[900px]">
      <Label>함께 읽은 책</Label>
      <LabelLg>소울링크</LabelLg>
    </div>
  );
}
