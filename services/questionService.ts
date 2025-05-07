import { PrismaClient, Question } from "@prisma/client";

// 시스템 질문 템플릿의 앞부분과 뒷부분
const SYSTEM_QUESTION_PREFIX = ""; // 비워두거나, "읽고" 같은 부분을 여기에 둘 수도 있습니다.
const SYSTEM_QUESTION_SUFFIX = " 읽고 느낀 점을 공유해주세요."; // 예시: "을(를) 읽고 느낀 점을 공유해주세요." 에서 을(를) 부분 제외

/**
 * 한글 문자열의 마지막 글자 받침 유무에 따라 '을' 또는 '를'을 반환합니다.
 * @param text 대상 문자열 (책 제목)
 * @returns '을' 또는 '를'
 */
function getKoreanObjectMarker(text: string): string {
  if (typeof text !== "string" || text.length === 0) return "을"; // 기본값 또는 빈 문자열 처리
  const lastChar = text.charCodeAt(text.length - 1);
  // 한글 유니코드 범위 (가-힣): 0xAC00 (44032) ~ 0xD7A3 (55203)
  if (lastChar >= 0xac00 && lastChar <= 0xd7a3) {
    // 마지막 글자가 한글인 경우
    // (char - 0xAC00) % 28 == 0 이면 받침 없음, 0이 아니면 받침 있음
    const hasLastConsonant = (lastChar - 0xac00) % 28 !== 0;
    return hasLastConsonant ? "을" : "를";
  }
  // 한글이 아닌 경우 (예: 영어 제목) 기본적으로 '을'을 사용하거나 다른 규칙을 적용할 수 있습니다.
  // 여기서는 영어 제목 뒤에는 보통 조사를 붙이지 않거나, 붙인다면 '을'을 사용하는 경우가 많으므로 '을'로 처리합니다.
  // 또는, 영어 제목 뒤에는 아예 조사를 붙이지 않도록 로직을 수정할 수도 있습니다.
  // 예: if (isKorean(lastChar)) ... else return "";
  return "을";
}

/**
 * Retrieves or creates the system default question for a given book.
 * If the system question doesn't exist for the book, it's created with the actual book title
 * and appropriate Korean object marker in `questionText`.
 * Assumes the book (identified by bookId) already exists in the 'Book' table.
 *
 * @param prisma - The PrismaClient instance.
 * @param bookId - The ID of the book (from 'Book' table).
 * @param bookTitle - The title of the book (from 'Book' table). This is now CRITICAL for questionText.
 * @returns The system default Question object.
 */
export async function findOrCreateSystemQuestionForBook(
  prisma: PrismaClient,
  bookId: number,
  bookTitle: string // 이제 bookTitle은 questionText 생성에 필수입니다.
): Promise<Question> {
  if (!bookId || !bookTitle || bookTitle.trim() === "") {
    throw new Error(
      "QuestionService: Both bookId and a non-empty bookTitle are required."
    );
  }

  // 시스템 질문은 책마다 하나만 존재해야 하므로, 먼저 찾아봅니다.
  let systemQuestion = await prisma.question.findFirst({
    where: {
      bookId: bookId,
      creatorType: "SYSTEM",
    },
  });

  if (systemQuestion) {
    // 만약 기존 시스템 질문의 questionText가 템플릿으로 저장되어 있었다면,
    // 여기서 업데이트하는 로직을 추가할 수도 있습니다. (선택 사항)
    // 예: if (systemQuestion.questionText.includes("%BOOK_TITLE%")) { ... update ... }
    return systemQuestion;
  }

  // 시스템 질문이 없으면 새로 생성합니다.
  const objectMarker = getKoreanObjectMarker(bookTitle);
  const actualQuestionText = `${SYSTEM_QUESTION_PREFIX}${bookTitle}${objectMarker}${SYSTEM_QUESTION_SUFFIX}`;
  // 예: "해리포터와 마법사의 돌을 읽고 느낀 점을 공유해주세요."
  // 예: "데미안을 읽고 느낀 점을 공유해주세요."
  // 예: "모비를 읽고 느낀 점을 공유해주세요." (모비는 받침이 없으므로 '를'이 되어야 하지만, getKoreanObjectMarker가 한글만 처리하면 '을'이 될 수 있음 - 아래 참고)

  console.log(
    `QuestionService: Generating system question text: "${actualQuestionText}"`
  );

  systemQuestion = await prisma.question.create({
    data: {
      bookId: bookId,
      questionText: actualQuestionText, // 실제 책 제목이 포함된 질문 저장
      creatorType: "SYSTEM",
      creatorId: null,
    },
  });
  console.log(
    `QuestionService: Created system question for book ID ${bookId} ("${bookTitle}").`
  );
  return systemQuestion;
}

/**
 * Creates a question by an author or publisher.
 * (This is a separate flow from system questions)
 * @param prisma
 * @param bookId
 * @param questionText
 * @param creatorType 'AUTHOR' | 'PUBLISHER'
 * @param creatorId ID of the author or publisher
 * @returns The created Question object
 */
export async function createCustomQuestion(
  prisma: PrismaClient,
  bookId: number,
  questionText: string,
  creatorType: "AUTHOR" | "PUBLISHER",
  creatorId: string // UUID of author or publisher
): Promise<Question> {
  if (!bookId || !questionText || !creatorType || !creatorId) {
    throw new Error(
      "QuestionService: Missing required fields for custom question."
    );
  }
  // Optional: Validate creatorId exists in Author/Publisher table
  // const creatorExists = creatorType === 'AUTHOR' ?
  //   await prisma.author.findUnique({ where: { id: creatorId } }) :
  //   await prisma.publisher.findUnique({ where: { id: creatorId } });
  // if (!creatorExists) {
  //   throw new Error(`QuestionService: ${creatorType} with ID ${creatorId} not found.`);
  // }

  return prisma.question.create({
    data: {
      bookId,
      questionText,
      creatorType,
      creatorId,
    },
  });
}
