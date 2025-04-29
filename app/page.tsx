import { TextBlack, TextGradient, TextGrey, TextLogo } from "@/components/text";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { BsMoonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full mx-auto bg-white">
      <div className="absolute top-4 left-5 flex items-center gap-4">
        <AiOutlineMenu color="#aeaeae" size={15} className="cursor-pointer" />
        <TextLogo className="mt-[-2px]">moonlight</TextLogo>
      </div>
      <div className="flex flex-col flex-grow justify-center items-center">
        <TextGradient className="text-2xl">
          책을 통해, 마음이 만나는 곳
        </TextGradient>
        <TextBlack className="text-2xl mt-4">
          문 라이트에 오신 것을 환영합니다
        </TextBlack>
        <TextGrey className="text-base mt-9">
          독후감을 공유하고 나의 소울 메이트를 찾아보세요
        </TextGrey>
        <BsMoonFill color="#39d4e7" size={12} className="my-16" />
        <TextBlack className="text-xl mb-9">
          어떤 분이 추천해주셨나요?
        </TextBlack>
        <div className="w-full max-w-[50%] min-w-[300px]">
          <Input placeholder="추천인의 ID를 입력해주세요" />
        </div>
        <Button className="mt-13">회원가입 시작하기</Button>
      </div>
    </div>
  );
}
