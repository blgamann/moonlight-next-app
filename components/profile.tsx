import data from "@/data.json";
import Image from "next/image";
import { TextBlack, TextDarkGrey } from "./text";
import { ButtonBack } from "./button";
import { ButtonForward } from "./button";

interface ProfileProps {
  image: string;
  name?: string;
  className?: string;
}

function ProfileImage({ size, image }: { size: number; image: string }) {
  return (
    <div
      className="rounded-full overflow-hidden bg-white"
      style={{ width: size, height: size }}
    >
      <Image
        src={image}
        alt="profile"
        width={size}
        height={size}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function ProfileXs({ image, name, className }: ProfileProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <ProfileImage size={20} image={image} />
      {name && (
        <div className="ml-1">
          <TextDarkGrey className="text-xs">{name}</TextDarkGrey>
        </div>
      )}
    </div>
  );
}

export function ProfileSm({ image, name, className }: ProfileProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <ProfileImage size={45} image={image} />
      {name && (
        <div className="ml-1">
          <TextDarkGrey className="text-xs">{name}</TextDarkGrey>
        </div>
      )}
    </div>
  );
}

export function ProfileMd({ image, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <ProfileImage size={62} image={image} />
      {name && (
        <div className="mt-1.5 w-[100px] text-center line-clamp-1">
          <TextDarkGrey className="text-sm font-medium">{name}</TextDarkGrey>
        </div>
      )}
    </div>
  );
}

export function ProfileMdSoulline({ image, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-[74px] h-[74px] flex items-center justify-center rounded-full bg-white border-[2.5px] border-[#6edfee]">
        <ProfileImage size={64} image={image} />
      </div>
      {name && (
        <div className="mt-1.5 w-[100px] text-center line-clamp-1">
          <TextDarkGrey className="text-base font-semibold">
            {name}
          </TextDarkGrey>
        </div>
      )}
    </div>
  );
}

export function ProfileMdSoulmate({ image, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-[69px] h-[69px] p-[2.5px] rounded-full bg-gradient-to-r from-[#6ae8d8] to-[#56c1ff]">
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
          <ProfileImage size={64} image={image} />
        </div>
      </div>
      {name && (
        <div className="mt-2 w-[100px] text-center">
          <TextDarkGrey className="text-sm font-normal line-clamp-1">
            {name}
          </TextDarkGrey>
        </div>
      )}
    </div>
  );
}

export function ProfileLg({ image, name, className }: ProfileProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <ProfileImage size={85} image={image} />
      {name && (
        <div className="mt-2 w-[100px] text-center line-clamp-1">
          <TextBlack className="text-base font-medium">{name}</TextBlack>
        </div>
      )}
    </div>
  );
}

export function ProfileXl({
  image,
  name,
  onBack,
  onForward,
  className,
}: {
  image: string;
  name?: string;
  onBack?: () => void;
  onForward?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center px-6 ${className}`}
    >
      <div
        className={`w-full flex items-center ${
          onBack || onForward ? "justify-between" : "justify-center"
        }`}
      >
        {onBack && <ButtonBack onClick={onBack} />}
        <ProfileImage size={100} image={image} />
        {onForward && <ButtonForward onClick={onForward} />}
      </div>
      {name && (
        <div className="mt-4">
          <TextBlack className="text-xl font-bold">{name}</TextBlack>
        </div>
      )}
    </div>
  );
}

export function ProfileComponents() {
  const profile = data.profiles[0];

  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>ProfileXs</h1>
        <ProfileXs image={profile.imageUrl} />
        <ProfileXs image={profile.imageUrl} name={profile.name} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>ProfileSm</h1>
        <ProfileSm image={profile.imageUrl} />
        <ProfileSm image={profile.imageUrl} name={profile.name} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>ProfileMd</h1>
        <ProfileMd image={profile.imageUrl} />
        <ProfileMd image={profile.imageUrl} name={profile.name} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>ProfileMdSoulline</h1>
        <ProfileMdSoulline image={profile.imageUrl} />
        <ProfileMdSoulline image={profile.imageUrl} name={profile.name} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>ProfileMdSoulmate</h1>
        <ProfileMdSoulmate image={profile.imageUrl} />
        <ProfileMdSoulmate image={profile.imageUrl} name={profile.name} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>ProfileXl</h1>
        <ProfileXl image={profile.imageUrl} name={profile.name} />
        <ProfileXl image={profile.imageUrl} name={profile.name} />
      </div>
    </div>
  );
}
