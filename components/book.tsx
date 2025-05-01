import Image from "next/image";
import data from "@/data.json";
import { TextDarkGrey } from "./text";

export interface BookProps {
  url: string;
  title: string;
}

export function BookSm({ url, title }: BookProps) {
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

export function BookLg({ url, title }: BookProps) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={url}
        alt={title}
        width={100}
        height={0}
        style={{ height: "auto" }}
        className="object-contain"
      />
    </div>
  );
}

export function BookComponent() {
  const book = data.books[0];

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <BookSm url={book.imageUrl} title={book.title} />
      <BookLg url={book.imageUrl} title={book.title} />
    </div>
  );
}
