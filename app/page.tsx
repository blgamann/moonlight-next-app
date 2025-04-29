import { TextBlack, TextGradient, TextGrey, TextLogo } from "@/components/text";
import { Input } from "@/components/input";
import Button from "@/components/button";
import { BsMoonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-[900px] mx-auto bg-white py-16">
      <div className="absolute top-4 left-6 flex items-center gap-4">
        <AiOutlineMenu color="#aeaeae" size={24} className="cursor-pointer" />
        <TextLogo>moonlight</TextLogo>
      </div>
      <div className="flex flex-col flex-grow justify-center items-center">
        <TextGradient className="text-[33px] font-medium">
          책을 통해, 마음이 만나는 곳
        </TextGradient>
        <TextBlack className="text-[33px] mt-4 font-medium">
          문 라이트에 오신 것을 환영합니다
        </TextBlack>
        <TextGrey className="text-[22px] mt-12 font-medium">
          독후감을 공유하고 나의 소울 메이트를 찾아보세요
        </TextGrey>
        <BsMoonFill color="#39d4e7" size={14} className="mt-20" />
        <TextBlack className="text-[22px] mt-16 mb-12 font-semibold">
          어떤 분이 추천해주셨나요?
        </TextBlack>
        <Input placeholder="추천인의 ID를 입력해주세요" />
        <Button className="mt-16">회원가입 시작하기</Button>
      </div>
    </div>
  );
}
