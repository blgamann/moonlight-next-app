import {
  BookHeader,
  Button,
  ButtonDeep,
  Card,
  CardLeftLine,
  ItemEvent,
  ItemQuestion,
  ItemSisterGarden,
  Tabs,
  TextBlack,
  TextDarkGrey,
} from "@/components";
import data from "@/data.json";

export default async function BookPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  console.log(isbn);
  const book = data.books[0];
  const questions = data.book_questions;
  const events = data.events;

  const tabs = [
    {
      label: "질문",
      value: "question",
      content: (
        <div className="flex flex-col justify-center">
          {questions.map((question) => (
            <div
              key={question.id}
              className="py-10 border-b-[0.75px] border-gray-300 flex px-4"
            >
              <ItemQuestion
                question={question.question_text}
                answers={0}
                soullinks={0}
              />
            </div>
          ))}
          <CardLeftLine className="px-8 py-6 mt-14 mb-8">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <TextBlack className="text-sm font-medium">
                  함께 가든을 가꿔보세요
                </TextBlack>
                <TextDarkGrey className="text-sm">
                  독자로서 건우님도 질문을 제안하고, 새로운 대화를 열어갈 수
                  있습니다.
                  <br />
                  가드너에게 영감을 주는 질문을 건네고, 책을 더 깊이
                  탐색해보세요!
                </TextDarkGrey>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button>질문 제안하기</Button>
              </div>
            </div>
          </CardLeftLine>
        </div>
      ),
    },
    {
      label: "이벤트",
      value: "event",
      content: (
        <div className="flex flex-col justify-center">
          {events.map((event) => (
            <div
              key={event.id}
              className="py-10 border-b-[0.75px] border-gray-300 flex px-4"
            >
              <ItemEvent
                title={event.title}
                date={event.date}
                location={event.location}
                participants={10}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "자매 가든",
      value: "sister-garden",
      content: (
        <div className="flex flex-col justify-center">
          {questions.map((question) => (
            <div
              key={question.id}
              className="py-10 border-b-[0.75px] border-gray-300 flex px-4"
            >
              <ItemSisterGarden
                image={book.imageUrl}
                bookTitle={book.title}
                title={book.title}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-white">
      <Card className="flex flex-col mt-36 max-w-[800px] mx-auto bg-white gap-12 mb-28">
        <BookHeader
          image={book.imageUrl}
          title={book.title}
          author={book.author}
          className="mt-[-60px]"
        />
        <div className="flex justify-center mt-12 mb-6">
          <ButtonDeep />
        </div>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
}
