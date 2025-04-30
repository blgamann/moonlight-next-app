import Image from "next/image";

import data from "@/data.json";
import { TextBlack, TextDarkGrey } from "./text";

export function ProfileSm({
  url,
  name,
  className,
}: {
  url: string;
  name?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={url}
        alt="profile"
        width={20}
        height={20}
        className="rounded-full"
      />
      {name && (
        <div className="flex flex-col ml-1">
          <TextDarkGrey className="text-xs">{name}</TextDarkGrey>
        </div>
      )}
    </div>
  );
}

export function ProfileLg({
  url,
  name,
  className,
}: {
  url: string;
  name?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src={url}
        alt="profile"
        width={100}
        height={100}
        className="rounded-full"
      />
      {name && (
        <div className="flex flex-col mt-4">
          <TextBlack className="text-xl font-bold">{name}</TextBlack>
        </div>
      )}
    </div>
  );
}

export function ProfileComponent() {
  const profile = data.profiles[0];

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <ProfileSm url={profile.imageUrl} />
      <ProfileSm url={profile.imageUrl} name={profile.name} />
      <ProfileLg url={profile.imageUrl} />
      <ProfileLg url={profile.imageUrl} name={profile.name} />
    </div>
  );
}
