import { BookLg, Button, TextGrey } from "@/components";
import Image from "next/image";

export default async function GardenLandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let imageId = "";
  let imageUrl = "";
  let title = "";
  let question = "";
  if (id === "1") {
    imageId = "ecf9b330-3caa-4a74-f3ec-63de147bde00";
    imageUrl =
      "https://shopping-phinf.pstatic.net/main_3246353/32463531642.20230718122737.jpg?type=w300";
    title = "지성에서 영성으로";
    question = "나는 지혜를 사랑하는가, 육체를 사랑하는가";
  } else if (id === "2") {
    title = "채식주의자";
    question = "우리는 서로에게 닿을 수 있을까";
    imageId = "b14b8000-efc0-4ea8-5051-bd912cee4d00";
    imageUrl =
      "https://shopping-phinf.pstatic.net/main_3244103/32441031268.20230404163921.jpg?type=w300";
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={`https://imagedelivery.net/wIFm7Cf2bi2hg4QIkmnvTA/${imageId}/public`}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 640px,
                 (max-width: 1024px) 1024px,
                 1920px"
        />
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-start p-12 backdrop-blur-md bg-black/30 rounded-3xl">
        <div className="flex">
          <BookLg title={title} image={imageUrl} />
          <div className="flex flex-col justify-between ml-8 mt-2">
            <div className="flex flex-col">
              <TextGrey className="text-lg text-white/85">{title}</TextGrey>
              <TextGrey className="text-2xl mt-2 font-bold text-white/95 line-clamp-1">
                {question}
              </TextGrey>
            </div>
            <div>
              <Button className="w-[160px] mb-2">가든 입장하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
