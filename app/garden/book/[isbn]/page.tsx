import {
  BookHeader,
  ItemEvent,
  ItemQuestion,
  ItemSisterGarden,
  Tabs,
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
    <div className="w-full bg-[#f7f7f9]">
      <div className="flex flex-col pt-24 max-w-[800px] mx-auto bg-white gap-12">
        <BookHeader
          image={book.imageUrl}
          title={book.title}
          author={book.author}
          publisher={book.publisher}
        />
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
