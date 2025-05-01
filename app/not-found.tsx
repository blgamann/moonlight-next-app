import { TextBlack } from "@/components";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <TextBlack className="text-2xl font-medium text-center">
        not found
        {/* facebook uses strategy to redirect to random profile */}
      </TextBlack>
    </div>
  );
}
