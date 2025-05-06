import data from "@/data.json";
import DiscoverClient, { ProfilePageData } from "./client"; // ProfilePageData 타입만 임포트

// 타입 정의 (ProfileData, BookData, AnswerData, QuestionData 등은 내부적으로 사용되거나
// ProfilePageData 타입에 포함되므로 여기서 별도 정의 불필요)
interface ProfileData {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
}

interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  publisher?: string;
  tags?: string[];
}

interface AnswerData {
  id: string;
  question_id: string;
  title: string;
  answer_text: string;
  date: string;
  profile_id: string;
  bookData?: BookData; // BookData 타입을 사용하므로 정의 필요
  year?: string;
}

interface QuestionData {
  id: string;
  book_id: string;
  question_text: string;
  question_context: string;
}

// SoullineProfile, MutualBook 정의 제거

// 헬퍼 함수 (기존과 동일)
function findBookById(bookId: string): BookData | undefined {
  return data.books.find((book) => book.id === bookId);
}

function findQuestionById(questionId: string): QuestionData | undefined {
  return data.book_questions.find((q) => q.id === questionId);
}

export default function DiscoverPage() {
  const allProfiles = data.profiles as ProfileData[];
  const allProfilePageData: ProfilePageData[] = [];

  for (const profile of allProfiles) {
    const profileAnswers = data.book_answers
      .filter((a) => a.profile_id === profile.id)
      .slice(0, 3) as AnswerData[];

    const answersWithBookData = profileAnswers.map((answer) => {
      const question = findQuestionById(answer.question_id);
      const book = question ? findBookById(question.book_id) : undefined;
      const year = answer.date.split(".")[0];
      return {
        ...answer,
        bookData: book,
        year: year,
      };
    });

    // SoullineProfile 타입 대신 직접 객체 생성
    const soullineProfilesData = allProfiles
      .filter((p) => p.id !== profile.id)
      .map(({ id, name, imageUrl }) => ({ id, name, imageUrl }));

    // MutualBook 타입 대신 직접 객체 생성
    const mutualBooksData = data.books
      .slice(0, 3)
      .map(({ id, title, imageUrl }) => ({ id, title, imageUrl }));

    allProfilePageData.push({
      profile: profile,
      answers: answersWithBookData,
      soullineProfiles: soullineProfilesData,
      mutualBooks: mutualBooksData,
    });
  }

  if (!allProfilePageData.length) {
    return <div>프로필 데이터를 찾을 수 없습니다.</div>;
  }

  return <DiscoverClient initialProfilesData={allProfilePageData} />;
}
