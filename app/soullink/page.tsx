import { CardSoullink, CardSoullinkWaiting } from "@/components";
import { LabelLg } from "@/components/label";
import data from "@/data.json";
import { Profile } from "@/components/profile";

export default function SoulLink() {
  const profiles = data.profiles;

  return (
    <div className="flex flex-col w-full max-w-[680px] mx-auto mt-14 px-10 pt-10 pb-20 gap-20">
      <div>
        <LabelLg>나의 소울메이트</LabelLg>
        <div className="mt-8 flex gap-4">
          {profiles.map((profile) => (
            <Profile
              size="md"
              variant="soulmate"
              key={profile.id}
              image={profile.imageUrl}
              name={profile.name}
            />
          ))}
        </div>
      </div>
      <div>
        <LabelLg>매치</LabelLg>
        <div className="flex flex-col gap-6 pt-6">
          <CardSoullink name={profiles[0].name} image={profiles[0].imageUrl} />
          <CardSoullink name={profiles[0].name} image={profiles[0].imageUrl} />
          <CardSoullink name={profiles[0].name} image={profiles[0].imageUrl} />
        </div>
      </div>
      <div>
        <LabelLg>연결 대기중</LabelLg>
        <div className="flex flex-col gap-6 pt-6">
          <CardSoullinkWaiting
            name={profiles[0].name}
            image={profiles[0].imageUrl}
          />
          <CardSoullinkWaiting
            name={profiles[0].name}
            image={profiles[0].imageUrl}
          />
          <CardSoullinkWaiting
            name={profiles[0].name}
            image={profiles[0].imageUrl}
          />
        </div>
      </div>
    </div>
  );
}
