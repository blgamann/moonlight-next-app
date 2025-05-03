"use client";

import data from "@/data.json";
import {
  ProfileXl,
  BookSm,
  TextBlack,
  TextGrey,
  CardSouline,
  CardMutualBooks,
  CardProfile,
  IndicatorProfile,
  IndicatorAnswer,
  CardAnswer,
} from "@/components";

export default function DiscoverPage() {
  const profile = data.profiles[0];
  const book = data.books[0];
  const answer = data.book_answers[0];
  const question = data.book_questions[0];

  const profiles = data.profiles;
  const books = data.books.map((book) => ({
    image: book.imageUrl,
    title: book.title,
  }));

  const onBack = () => {
    console.log("onBack");
  };

  const onForward = () => {
    console.log("onForward");
  };

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto px-8 mb-12 mt-26">
      <div className="flex flex-col items-center justify-center gap-4">
        <IndicatorProfile current={1} total={10} />
        <ProfileXl
          image={profile.imageUrl}
          name={profile.name}
          onBack={onBack}
          onForward={onForward}
        />
      </div>
      <div className="flex justify-center">
        <CardProfile
          bio={
            "죽음은 신나게 놀고 있는데 엄마가 '얘야, 그만 놀고 들어와 밥 먹어라'하고 부르는 소리와 같습니다."
          }
          className="mt-6"
        />
      </div>
      <IndicatorAnswer current={0} total={3} className="mt-20 mb-8" />
      <CardAnswer>
        <div className="flex">
          <BookSm title={book.title} image={book.imageUrl} />
        </div>
        <TextBlack className="text-3xl font-semibold mt-4">
          {answer.title}
        </TextBlack>
        <TextGrey className="text-xl mt-4">{question.question_text}</TextGrey>
        <TextBlack className="text-base border-t-[0.75px] border-black/15 mt-14 pt-8 whitespace-pre-line">
          {answer.answer_text}
        </TextBlack>
      </CardAnswer>
      <div className="flex flex-col gap-14 mt-18">
        <CardSouline profiles={profiles.slice(0, 2)} />
        <CardMutualBooks books={books} />
      </div>
    </div>
  );
}
