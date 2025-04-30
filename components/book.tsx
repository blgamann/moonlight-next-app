import Image from "next/image";
import data from "@/data.json";
import { TextDarkGrey } from "./text";

export function BookSm({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={url}
        alt={title}
        width={20}
        height={0}
        style={{ height: "auto" }}
        className="object-contain"
      />
      <TextDarkGrey className="text-sm ml-2">{title}</TextDarkGrey>
    </div>
  );
}

export function BookComponent() {
  const book = data.books[0];

  return (
    <div className="flex flex-col items-center justify-center">
      <BookSm url={book.imageUrl} title={book.title} />
    </div>
  );
}
