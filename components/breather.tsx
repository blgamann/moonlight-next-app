import { RiMoonFill } from "react-icons/ri";

export function Breather({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <RiMoonFill color="#39d4e7" size={12} />
    </div>
  );
}
