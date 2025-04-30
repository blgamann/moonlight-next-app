import data from "@/data.json";
import {
  IndexTop,
  ProfileLg,
  ProfileSm,
  Quote,
  TextDarkGrey,
  BookSm,
  TextBlack,
  TextGrey,
  Breather,
  IndexBottomButton,
} from "@/components";

export default function DiscoverPage() {
  const profile = data.profiles[0];
  const book = data.books[0];
  const answer = data.book_answers[0];
  const question = data.book_questions[0];
  return (
    <div className="flex flex-col w-full max-w-[680px] mx-auto px-8 mb-24">
      <IndexTop>
        <ProfileSm url={profile.imageUrl} name={profile.name} />
      </IndexTop>
      <ProfileLg url={profile.imageUrl} name={profile.name} className="mt-24" />
      <div className="flex justify-center mt-5">
        <Quote>
          <TextDarkGrey>
            {
              "죽음은 신나게 놀고 있는데 엄마가 '얘야, 그만 놀고 들어와 밥 먹어라'하고 부르는 소리와 같습니다."
            }
          </TextDarkGrey>
        </Quote>
      </div>
      <div className="flex justify-center">
        <Breather className="my-18" />
      </div>
      <div className="flex">
        <BookSm title={book.title} url={book.imageUrl} />
      </div>
      <TextBlack className="text-3xl font-semibold mt-4">
        {answer.title}
      </TextBlack>
      <TextGrey className="text-xl mt-4">{question.question_text}</TextGrey>
      <TextBlack className="text-base border-t-[0.75px] border-black/15 mt-14 pt-8 whitespace-pre-line">
        {answer.answer_text}
      </TextBlack>
      <IndexBottomButton />
    </div>
  );
}
