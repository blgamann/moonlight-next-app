import { BookLg, Button, TextGrey } from "@/components";
import Image from "next/image";

import data from "@/data.json";

export default async function GardenLandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let imageId = "";
  if (id === "1") {
    imageId = "ecf9b330-3caa-4a74-f3ec-63de147bde00";
  } else if (id === "2") {
    imageId = "b14b8000-efc0-4ea8-5051-bd912cee4d00";
  }

  // dummy data
  const book = data.books[0];

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

      {/* 여기부터가 실제 콘텐츠 */}
      <div className="flex items-center justify-center h-full">
        <BookLg title={book.title} image={book.imageUrl} />
        <div className="flex flex-col">
          <TextGrey className="text-2xl">{book.title}</TextGrey>
          <TextGrey className="text-4xl mt-6 mb-12 font-bold">
            {"우리는 서로에게 닿을 수 있을까"}
          </TextGrey>
          <Button className="w-[160px]">가든 입장하기</Button>
        </div>
      </div>
    </div>
  );
}
