import { CardLeftLine, ProfileMdSoulmate, TextBlack } from "@/components";
import { LabelLg } from "@/components/label";
import data from "@/data.json";

export default function SoulLink() {
  const profiles = data.profiles;

  return (
    <div className="flex flex-col w-full max-w-[680px] mx-auto mt-14 px-10 pt-10 gap-20">
      <div>
        <LabelLg>나의 소울메이트</LabelLg>
        <div className="mt-8 flex gap-4">
          {profiles.map((profile) => (
            <ProfileMdSoulmate
              key={profile.id}
              image={profile.imageUrl}
              name={profile.name}
            />
          ))}
        </div>
      </div>
      <div>
        <LabelLg>매치</LabelLg>
        <CardLeftLine className="mt-8">
          <div className="flex flex-col gap-2">
            <TextBlack>TODO</TextBlack>
          </div>
        </CardLeftLine>
      </div>
      <div>
        <LabelLg>연결 대기중</LabelLg>
        <CardLeftLine className="mt-8">
          <div className="flex flex-col gap-2">
            <TextBlack>TODO</TextBlack>
          </div>
        </CardLeftLine>
      </div>
    </div>
  );
}
