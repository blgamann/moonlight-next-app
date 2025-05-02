import { CardNotification } from "@/components/card";
import { LabelLg } from "@/components/label";
import data from "@/data.json";

export default function NotificationPage() {
  const profiles = data.profiles;

  return (
    <div className="flex flex-col w-full max-w-[680px] mx-auto mt-14 pt-10">
      <div>
        <LabelLg>알림</LabelLg>
        <div className="flex flex-col gap-4 pt-6">
          <CardNotification
            type="soullink"
            profileImage={profiles[1].imageUrl}
            name={profiles[1].name}
            timestamp="4시간 전"
            isNew
          />
          <CardNotification
            type="match"
            profileImage={profiles[0].imageUrl}
            name={profiles[0].name}
            timestamp="8시간 전"
            isNew
          />
          <CardNotification
            type="letter"
            profileImage={profiles[0].imageUrl} // Replace with actual path if available
            bookTitle="책임의 생성"
            author="고쿠분 고이치로"
            timestamp="12시간 전"
          />
          <CardNotification
            type="question"
            profileImage={profiles[0].imageUrl} // Replace with actual path if available
            name="남준"
            timestamp="6월 7일 (토)"
          />
        </div>
      </div>
    </div>
  );
}
