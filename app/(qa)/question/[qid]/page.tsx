"use client";

import { useState } from "react";
import {
  Breather,
  Button,
  ButtonCancel,
  ItemAnswerProfileLine,
  MetaAnswers,
  MetaSoullinks,
  ProfileMd,
  ProfileSm,
  ProfileXs,
  TextBlack,
  TextCyan,
  TextDarkGrey,
} from "@/components";
import { Card, CardTopLine } from "@/components/card";
import data from "@/data.json";

export default function QuestionPage() {
  const book = data.books[0];
  const question = data.book_questions[0];
  const answers = data.book_answers;
  const profiles = data.profiles;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", { title, text: content });
    setIsWriting(false);
    setTitle("");
    setContent("");
  };

  const handleTextareaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleWriteClick = () => {
    setIsWriting(true);
  };

  const handleCancelClick = () => {
    setIsWriting(false);
    setTitle("");
    setContent("");
  };

  return (
    <div className="mt-24 max-w-[800px] mx-auto mb-28">
      <Card className="flex flex-col p-12">
        <TextCyan className="text-sm mb-2">{book.title}</TextCyan>
        <TextBlack className="text-lg font-semibold">
          {question.question_text}
        </TextBlack>
        <div className="flex gap-4 mt-8">
          <MetaAnswers count={10} />
          <MetaSoullinks count={10} />
        </div>
        {!isWriting && (
          <>
            <Card className="mt-12 py-4 rounded-xl">
              <div className="flex items-center px-4 justify-between">
                <div className="flex items-center gap-2.5">
                  <ProfileSm image={profiles[0].imageUrl} />
                  <TextDarkGrey className="text-base">
                    건우님의 생각을 공유해주세요.
                  </TextDarkGrey>
                </div>
                <Button onClick={handleWriteClick}>답변하기</Button>
              </div>
            </Card>
            <div className="mt-12 flex flex-col gap-6">
              {answers.map((answer) => (
                <ItemAnswerProfileLine
                  key={answer.id}
                  title={answer.title}
                  answer={answer.answer_text}
                  name={profiles[0].name}
                  image={profiles[0].imageUrl}
                />
              ))}
            </div>
          </>
        )}
        {isWriting && (
          <CardTopLine className="mt-18 flex flex-col items-center px-8 pb-8">
            <ProfileSm
              image={profiles[0].imageUrl}
              className="mt-[-26px] z-10"
            />
            <Breather className="my-8" />
            <form onSubmit={handleSubmit} className="w-full space-y-1">
              <div>
                <input
                  type="text"
                  id="answerTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목"
                  required
                  className="w-full py-3 rounded-md border border-transparent bg-transparent text-lg font-semibold text-gray-700 transition-all duration-300 ease-in-out focus:outline-none placeholder:text-lg placeholder:font-semibold placeholder:text-gray-400 focus:placeholder:text-gray-500"
                />
              </div>
              <div className="w-full border-t border-gray-200 my-2"></div>
              <div>
                <textarea
                  id="answerText"
                  value={content}
                  onChange={handleTextareaInput}
                  onInput={handleTextareaInput}
                  placeholder="본문"
                  required
                  rows={1}
                  className="pb-56 w-full py-3 rounded-md border border-transparent bg-transparent text-base text-gray-600 transition-all duration-300 ease-in-out focus:outline-none placeholder:text-base placeholder:text-gray-400 focus:placeholder:text-gray-500 resize-none overflow-hidden"
                />
              </div>
              <div className="flex justify-end gap-2">
                <ButtonCancel onClick={handleCancelClick}>취소</ButtonCancel>
                <Button>등록하기</Button>
              </div>
            </form>
          </CardTopLine>
        )}
      </Card>
    </div>
  );
}
