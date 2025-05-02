import { TextGrey } from "./text";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <TextGrey className="w-full text-sm pb-4 border-b-[0.75px] border-gray-300">
      {children}
    </TextGrey>
  );
}

export function LabelComponents() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[900px]">
      <Label>함께 읽은 책</Label>
    </div>
  );
}
