"use client";

import {
  Book,
  Card,
  CardBio,
  TextGrey,
  TextBlack,
  ButtonDeep,
  CardSouline,
  Profile,
} from "@/components";
import data from "@/data.json";

export default function AnswerPage() {
  const profile = data.profiles[0];
  const profiles = data.profiles.slice(1, 3);
  const book = data.books[0];
  const answer = data.book_answers[0];
  const question = data.book_questions[0];

  return (
    <div className="mt-24 max-w-[800px] mx-auto mb-28">
      <Card className="flex flex-col p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <Profile size="xl" image={profile.imageUrl} name={profile.name} />
        </div>
        <div className="flex justify-center">
          <CardBio
            bio={
              "죽음은 신나게 놀고 있는데 엄마가 '얘야, 그만 놀고 들어와 밥 먹어라'하고 부르는 소리와 같습니다."
            }
            className="mt-6"
          />
        </div>
        <div className="flex mt-20">
          <Book title={book.title} image={book.imageUrl} size="sm" />
        </div>
        <TextBlack className="text-3xl font-semibold mt-4">
          {answer.title}
        </TextBlack>
        <TextGrey className="text-xl mt-4">{question.question_text}</TextGrey>
        <TextBlack className="text-base border-t-[0.75px] border-black/15 mt-14 pt-8 whitespace-pre-line">
          {answer.answer_text}
        </TextBlack>
        <div className="flex justify-center my-18">
          <ButtonDeep toastMessage="관심 답변이 등록되었어요!" />
        </div>
        <div className="flex flex-col gap-14">
          <CardSouline profiles={profiles.slice(0, 2)} />
          {/* <CardMutualBooks books={books} /> */}
        </div>
      </Card>
    </div>
  );
}
