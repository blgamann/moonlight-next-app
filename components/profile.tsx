import data from "@/data.json";
import Image from "next/image";
import { TextBlack, TextDarkGrey } from "./text";

interface ProfileProps {
  url: string;
  name?: string;
  className?: string;
}

function ProfileImage({ size, url }: { size: number; url: string }) {
  return (
    <div
      className="rounded-full overflow-hidden bg-white"
      style={{ width: size, height: size }}
    >
      <Image
        src={url}
        alt="profile"
        width={size}
        height={size}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function ProfileSm({ url, name, className }: ProfileProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <ProfileImage size={20} url={url} />
      {name && (
        <div className="ml-1">
          <TextDarkGrey className="text-xs">{name}</TextDarkGrey>
        </div>
      )}
    </div>
  );
}

export function ProfileMd({ url, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <ProfileImage size={65} url={url} />
      {name && (
        <div className="mt-2">
          <TextBlack className="text-base font-semibold">{name}</TextBlack>
        </div>
      )}
    </div>
  );
}

export function ProfileMdSoulline({ url, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-[77px] h-[77px] flex items-center justify-center rounded-full bg-white border-[3px] border-[#6edfee]">
        <ProfileImage size={64} url={url} />
      </div>
      {name && (
        <div className="mt-2">
          <TextBlack className="text-base font-semibold">{name}</TextBlack>
        </div>
      )}
    </div>
  );
}

export function ProfileMdSoulmate({ url, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-[69px] h-[69px] p-[2.5px] rounded-full bg-gradient-to-r from-[#6ae8d8] to-[#56c1ff]">
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
          <ProfileImage size={64} url={url} />
        </div>
      </div>
      {name && (
        <div className="mt-2">
          <TextBlack className="text-base font-semibold">{name}</TextBlack>
        </div>
      )}
    </div>
  );
}

export function ProfileLg({ url, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <ProfileImage size={100} url={url} />
      {name && (
        <div className="mt-4">
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
      <ProfileMd url={profile.imageUrl} />
      <ProfileMd url={profile.imageUrl} name={profile.name} />
      <ProfileMdSoulline url={profile.imageUrl} />
      <ProfileMdSoulline url={profile.imageUrl} name={profile.name} />
      <ProfileMdSoulmate url={profile.imageUrl} />
      <ProfileMdSoulmate url={profile.imageUrl} name={profile.name} />
      <ProfileLg url={profile.imageUrl} />
      <ProfileLg url={profile.imageUrl} name={profile.name} />
    </div>
  );
}
