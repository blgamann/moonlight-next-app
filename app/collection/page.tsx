import {
  BookList,
  Card,
  ItemAnswerProfileLine,
  ItemEventLine,
  Profile,
  Tabs,
} from "@/components";

import data from "@/data.json";
export default function CollectionPage() {
  const profile = data.profiles[0];
  const answers = data.book_answers;
  const books = data.books;
  const profiles = data.profiles;
  const events = data.events;

  const tabs = [
    {
      label: "답변",
      value: "answer",
      content: (
        <div className="flex flex-col gap-6 mt-6">
          {answers.map((answer) => (
            <ItemAnswerProfileLine
              key={answer.id}
              image={profile.imageUrl}
              name={profile.name}
              title={answer.title}
              answer={answer.answer_text}
            />
          ))}
        </div>
      ),
    },
    {
      label: "가든",
      value: "garden",
      content: (
        <div className="mt-8">
          <BookList
            books={books.map((book) => ({
              image: book.imageUrl,
              title: book.title,
              author: book.author,
            }))}
          />
        </div>
      ),
    },
    {
      label: "유저",
      value: "user",
      content: (
        <div className="flex flex-wrap justify-center gap-11 mt-8">
          {profiles.map((profile) => (
            <Profile
              size="lg"
              key={profile.id}
              image={profile.imageUrl}
              name={profile.name}
            />
          ))}
        </div>
      ),
    },
    {
      label: "이벤트",
      value: "event",
      content: (
        <div className="flex flex-wrap gap-6 mt-6">
          {events.map((event) => (
            <ItemEventLine
              key={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              participants={3}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-14 max-w-[800px] mx-auto pt-14 mb-28">
      <Card className="flex flex-col items-center justify-center">
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
}
