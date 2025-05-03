import { BookItem } from "@/lib/book";
import {
  BookLg,
  BookMd,
  CardLeftLine,
  MetaAnswers,
  MetaSoullinks,
  ProfileMd,
  TextBlack,
  TextDarkGrey,
  TextGrey,
} from "@/components";
import { Garden } from "@/lib/garden";
import Link from "next/link";

import data from "@/data.json";

// TODO: tabs -> list item components

export function ItemBookSearch({
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
  const hasGarden = (garden: Garden | null): boolean => {
    if (!garden) {
      return false;
    }
    return garden.member > 0 && garden.question > 0 && garden.answer > 0;
  };

  return (
    <div className="flex">
      <Link
        href={`/garden/book/${book.isbn}`}
        key={book.isbn}
        className="block"
      >
        <div className="group cursor-pointer flex">
          <BookLg title={book.title} image={book.image} />
          <div className="flex flex-col ml-6 justify-between">
            <div className="flex flex-col gap-1 mt-1">
              <TextBlack className="text-lg font-semibold group-hover:underline">
                {book.title}
              </TextBlack>
              <TextDarkGrey className="text-sm font-medium">
                {formatAuthors(book.author)}
              </TextDarkGrey>
              <TextGrey className="text-xs">{book.publisher}</TextGrey>
            </div>
            <TextDarkGrey className="text-xs mb-1">
              {hasGarden(garden)
                ? "멤버 327명 · 질문 13개 · 답변 501개 · 소울링크 76쌍"
                : "멤버 327명 · 질문 13개 · 답변 501개 · 소울링크 76쌍"}
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

export function ItemQuestion({
  question,
  answers,
  soullinks,
}: {
  question: string;
  answers: number;
  soullinks: number;
}) {
  return (
    <div className="flex items-center">
      <Link href={`/question/1234`} className="block">
        <div className="group flex flex-col gap-4">
          <ItemText main={question} />
          <div className="flex">
            <div className="flex items-center gap-4">
              <MetaAnswers count={answers} />
              <MetaSoullinks count={soullinks} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function ItemText({ main, sub }: { main: string; sub?: string }) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-2.5">
      <TextBlack className="text-lg font-semibold group-hover:underline">
        {main}
      </TextBlack>
      {sub && <TextGrey className="text-sm line-clamp-2">{sub}</TextGrey>}
    </div>
  );
}

export function ItemEvent({
  title,
  date,
  location,
  participants,
}: {
  title: string;
  date: string;
  location: string;
  participants: number;
}) {
  return (
    <Link href={`/garden/book`} className="block group ">
      <ItemText
        main={title}
        sub={`${date} · ${location} · ${participants}명`}
      />
    </Link>
  );
}
export function ItemAnswerProfile({
  title,
  answer,
  name,
  image,
}: {
  title: string;
  answer: string;
  name: string;
  image: string;
}) {
  return (
    <Link href={`/answer/id`} className="block group">
      <CardLeftLine className="py-4 px-6.5 cursor-pointer group">
        <div className="flex">
          <div className="w-[68px] flex justify-center items-center mr-5.5">
            <ProfileMd image={image} name={name} />
          </div>
          <ItemText main={title} sub={answer} />
        </div>
      </CardLeftLine>
    </Link>
  );
}

export function ItemAnswerBook({
  image,
  bookTitle,
  title,
  answer,
}: {
  image: string;
  bookTitle: string;
  title: string;
  answer: string;
}) {
  return (
    <Link href={`/answer/id`} className="block group">
      <CardLeftLine className="py-5 px-6.5 cursor-pointer group">
        <div className="flex">
          <div className="w-[68px] flex justify-center items-center mr-5.5">
            <BookMd title={bookTitle} image={image} />
          </div>
          <ItemText main={title} sub={answer} />
        </div>
      </CardLeftLine>
    </Link>
  );
}

export function ItemSisterGarden({
  image,
  bookTitle,
  title,
}: {
  image: string;
  bookTitle: string;
  title: string;
}) {
  return (
    <Link href={`/garden/book`} className="group">
      <div className="flex">
        <div className="w-[68px] flex justify-center items-center mr-4">
          <BookMd title={bookTitle} image={image} />
        </div>
        <ItemText main={title} sub={bookTitle} />
      </div>
    </Link>
  );
}

export function ItemComponents() {
  const profile = data.profiles[0];
  const question = data.book_questions[0];
  const answer = data.book_answers[0];
  const book = {
    image: data.books[0].imageUrl,
    title: data.books[0].title,
    link: data.books[0].id,
    author: data.books[0].author,
    discount: "",
    publisher: data.books[0].publisher,
    pubdate: "",
    isbn: "",
    description: "",
  };

  return (
    <div className="flex flex-col justify-center gap-24 max-w-[900px]">
      <div className="flex flex-col gap-6">
        <h1 className="w-[200px]">ItemBookSearch</h1>
        <ItemBookSearch book={book} garden={null} />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="w-[200px]">ItemQuestion</h1>
        <ItemQuestion
          question={question.question_text}
          answers={10}
          soullinks={5}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="w-[200px]">ItemEvent</h1>
        <ItemEvent
          title="채식주의자 함께 읽기"
          date="1월 24일 (토) 오후 7시"
          location="서울 관악구"
          participants={50}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="w-[200px]">ItemAnswerProfile</h1>
        <ItemAnswerProfile
          title={answer.title}
          answer={answer.answer_text}
          name={profile.name}
          image={profile.imageUrl}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="w-[200px]">ItemAnswerBook</h1>
        <ItemAnswerBook
          image={book.image}
          bookTitle={book.title}
          title={answer.title}
          answer={answer.answer_text}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="w-[200px]">ItemSisterGarden</h1>
        <ItemSisterGarden
          image={book.image}
          bookTitle={book.title}
          title={answer.title}
        />
      </div>
    </div>
  );
}
