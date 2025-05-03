import Image from "next/image";
import data from "@/data.json";
import { TextBlack, TextDarkGrey, TextGrey } from "./text";

export interface BookProps {
  image: string;
  title: string;
}

export function BookSm({ image, title }: BookProps) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={image}
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

export function BookMd({ image, title }: BookProps) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={image}
        alt={title}
        width={59}
        height={0}
        style={{ height: "auto" }}
        className="object-contain"
      />
    </div>
  );
}

export function BookLg({ image, title }: BookProps) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={image}
        alt={title}
        width={100}
        height={0}
        style={{ height: "auto" }}
        className="object-contain"
      />
    </div>
  );
}

export function BookXl({
  image,
  title,
  className,
}: BookProps & { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* <Image
        src={image}
        alt={title}
        width={140}
        height={0}
        style={{ height: "auto" }}
        className="object-cover"
      /> */}
      <img
        src={image}
        alt={title}
        className={`w-[140px] h-auto object-cover`}
      />
    </div>
  );
}

export function BookList({ books }: { books: BookProps[] }) {
  return (
    <div className="flex gap-8">
      {books.map((book) => (
        <BookLg key={book.title} image={book.image} title={book.title} />
      ))}
    </div>
  );
}

export function BookHeader({
  image,
  title,
  author,
  className,
}: {
  image: string;
  title: string;
  author: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <BookXl image={image} title={title} />
      <TextBlack className="text-2xl font-semibold mt-4">{title}</TextBlack>
      <TextGrey className="text-lg mt-2">{author}</TextGrey>
      <TextDarkGrey className="text-base mt-6">
        {"멤버 327명 · 질문 13개 · 답변 501개 · 소울링크 76쌍"}
      </TextDarkGrey>
    </div>
  );
}

export function BookComponents() {
  const book = data.books[0];
  const allBooks = data.books.map((b) => ({
    image: b.imageUrl,
    title: b.title,
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-24 p-10">
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>BookSm</h1>
        <BookSm image={book.imageUrl} title={book.title} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>BookMd</h1>
        <BookMd image={book.imageUrl} title={book.title} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>BookLg</h1>
        <BookLg image={book.imageUrl} title={book.title} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>BookXl</h1>
        <BookXl image={book.imageUrl} title={book.title} />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-center">BookList</h1>
        <BookList books={allBooks} />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1>BookHeader</h1>
        <BookHeader
          image={book.imageUrl}
          title={book.title}
          author={book.author}
        />
      </div>
    </div>
  );
}
