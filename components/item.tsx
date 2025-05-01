import { BookItem } from "@/lib/book";
import { BookLg, TextBlack, TextDarkGrey, TextGrey } from "@/components";
import { Garden } from "@/lib/garden";
import Link from "next/link";

export function BookSearchItem({
  book,
  garden,
}: {
  book: BookItem;
  garden: Garden | null;
}) {
  const formatAuthors = (authors: string): string => {
    return authors.replaceAll("^", ", ");
  };

  // it will be true if the garden table is created
  const hasGarden = (garden: Garden): boolean => {
    if (!garden) {
      return false;
    }
    return garden.member > 0 && garden.question > 0 && garden.answer > 0;
  };

  return (
    <div className="flex py-8 border-t-[0.75px] border-gray-300">
      <Link
        href={`/garden/book/${book.isbn}`}
        key={book.isbn}
        className="block"
      >
        <div className="group cursor-pointer flex">
          <BookLg title={book.title} url={book.image} />
          <div className="flex flex-col ml-6 justify-between">
            <div className="flex flex-col gap-1 mt-1">
              <TextBlack className="text-xl font-semibold group-hover:underline">
                {book.title}
              </TextBlack>
              <TextDarkGrey className="text-base font-medium">
                {formatAuthors(book.author)}
              </TextDarkGrey>
              <TextGrey className="text-sm">{book.publisher}</TextGrey>
            </div>
            <TextDarkGrey className="text-sm mb-1">
              {/* {hasGarden(garden) ? "가든 채팅 참여하기" : "가든 채팅 시작하기"} */}
              멤버 327명 · 질문 13개 · 답변 501개 · 소울링크 76쌍
            </TextDarkGrey>
            {/* {hasGarden(garden) && (
            <TextBlack className="text-sm mb-1">
              {hasGarden(garden) ? "가든 채팅 참여하기" : "가든 채팅 시작하기"}
            </TextBlack>
          )} */}
          </div>
        </div>
      </Link>
    </div>
  );
}

// TODO: tabs -> list item components
