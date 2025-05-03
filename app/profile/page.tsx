"use client";

import {
  ButtonDeep,
  BookList,
  Card,
  CardProfile,
  ItemAnswerBook,
  Label,
  ProfileXl,
  Tabs,
  TextBlack,
  TextDarkGrey,
  CardSouline,
} from "@/components";
import data from "@/data.json";
export default function ProfilePage() {
  const books = data.books;
  const profile = data.profiles[0];
  const answers = data.book_answers;

  const tabs = [
    {
      label: "답변",
      value: "answer",
      content: (
        <div className="flex flex-col justify-center">
          {answers.map((answer) => (
            <div
              key={answer.id}
              className="py-10 border-b-[0.75px] border-gray-300 flex px-4"
            >
              <ItemAnswerBook
                image={books[0].imageUrl}
                bookTitle={books[0].title}
                title={answer.title}
                answer={answer.answer_text}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "읽은 책",
      value: "read",
      content: (
        <div className="flex flex-col justify-center">
          <Label className="mt-16 mb-8">함께 읽은 책</Label>
          <BookList
            books={books.map((book) => ({
              id: book.id,
              title: book.title,
              image: book.imageUrl,
              author: book.author,
            }))}
          />
          <Label className="mt-16 mb-8">진화 및 뇌 과학</Label>
          <BookList
            books={books.map((book) => ({
              id: book.id,
              title: book.title,
              image: book.imageUrl,
              author: book.author,
            }))}
          />
        </div>
      ),
    },
    {
      label: "소울라인",
      value: "soulline",
      content: (
        <div className="flex flex-col justify-center mt-12">
          <CardSouline profiles={data.profiles} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-14 max-w-[800px] mx-auto pt-14 mb-28">
      <Card className="flex flex-col items-center justify-center">
        <ProfileXl image={profile.imageUrl} className="mt-[-52px]" />
        <div className="flex flex-col items-center justify-center w-[400px] mx-auto line-clamp-1">
          <TextBlack className="text-2xl font-bold mt-4">
            {profile.name}
          </TextBlack>
          <CardProfile bio={profile.bio} className="mt-4" />
        </div>
        <TextDarkGrey className="text-sm mt-4 text-center">
          {"답변 501개 · 소울링크 76쌍"}
        </TextDarkGrey>
        <div className="flex justify-center mt-12 mb-6">
          <ButtonDeep />
        </div>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
}
