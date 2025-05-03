"use client";

import data from "@/data.json";
import { useState, useEffect, useRef } from "react";
import {
  ProfileXl,
  BookSm,
  TextBlack,
  TextGrey,
  CardSouline,
  CardMutualBooks,
  CardBio,
  IndicatorProfile,
  IndicatorAnswer,
  CardAnswer,
  ProfileSm,
  ButtonBack,
  ButtonForward,
} from "@/components";

export default function DiscoverPage() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [isProfileHeaderFixed, setIsProfileHeaderFixed] = useState(false);
  const profileSectionRef = useRef<HTMLDivElement>(null);

  const profile = data.profiles[currentProfileIndex];

  // Filter answers based on the current profile
  const profileAnswers = data.book_answers.filter(
    (ans) => ans.profile_id === profile.id
  );

  useEffect(() => {
    setCurrentAnswerIndex(0);
  }, [currentProfileIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsProfileHeaderFixed(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-70px 0px 0px 0px",
      }
    );

    const currentRef = profileSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const answer = profileAnswers[currentAnswerIndex];
  const question = data.book_questions.find(
    (q) => q.id === answer?.question_id
  );
  const book = data.books.find((b) => b.id === question?.book_id);

  const profiles = data.profiles;
  const books = data.books.map((book) => ({
    image: book.imageUrl,
    title: book.title,
  }));

  const onBackProfile = () => {
    setCurrentProfileIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.profiles.length) % data.profiles.length
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onForwardProfile = () => {
    setCurrentProfileIndex(
      (prevIndex) => (prevIndex + 1) % data.profiles.length
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onBackAnswer = () => {
    setCurrentAnswerIndex(
      (prevIndex) =>
        (prevIndex - 1 + profileAnswers.length) % profileAnswers.length
    );
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const onForwardAnswer = () => {
    setCurrentAnswerIndex(
      (prevIndex) => (prevIndex + 1) % profileAnswers.length
    );
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  if (!profileAnswers.length || !answer || !question || !book) {
    return (
      <div className="flex flex-col w-full max-w-[800px] mx-auto px-8 mb-12">
        {isProfileHeaderFixed && (
          <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm  border-b border-black/10">
            <div className="max-w-[800px] mx-auto px-8 py-2 flex items-center">
              <ProfileSm image={profile.imageUrl} name={profile.name} />
            </div>
          </div>
        )}

        <div ref={profileSectionRef} className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <IndicatorProfile
              current={currentProfileIndex}
              total={data.profiles.length}
            />
            <ProfileXl
              image={profile.imageUrl}
              name={profile.name}
              onBack={onBackProfile}
              onForward={onForwardProfile}
            />
          </div>
          <div className="flex justify-center w-full">
            <CardBio bio={profile.bio} className="mt-6" />
          </div>
          <div className="text-center mt-20 text-gray-500">
            이 프로필에 대한 답변이 없거나 관련 정보를 찾을 수 없습니다.
          </div>
          <div className="flex flex-col gap-14 mt-18">
            <CardSouline profiles={profiles.slice(0, 2)} />
            <CardMutualBooks books={books} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto px-8 my-14">
      {isProfileHeaderFixed && (
        <div className="fixed top-0 left-0 right-0 z-40 border-b-[0.75px] border-black/10">
          <div className="max-w-[760px] mx-auto px-8 flex items-center justify-between bg-white h-14">
            <ButtonBack onClick={onBackProfile} />
            <ProfileSm image={profile.imageUrl} name={profile.name} />
            <ButtonForward onClick={onForwardProfile} />
          </div>
        </div>
      )}

      <div ref={profileSectionRef} className="flex flex-col items-center">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <IndicatorProfile
            current={currentProfileIndex}
            total={data.profiles.length}
          />
          <ProfileXl
            image={profile.imageUrl}
            name={profile.name}
            onBack={onBackProfile}
            onForward={onForwardProfile}
          />
        </div>
        <div className="flex justify-center w-full">
          <CardBio bio={profile.bio} className="mt-6" />
        </div>
      </div>

      <IndicatorAnswer
        current={currentAnswerIndex}
        total={profileAnswers.length}
        className="mt-20 mb-8"
        onIndicatorClick={setCurrentAnswerIndex}
      />
      <CardAnswer onBack={onBackAnswer} onForward={onForwardAnswer}>
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
