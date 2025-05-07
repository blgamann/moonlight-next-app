import { PrismaClient, Answer, Book } from "@prisma/client";
import { findOrCreateSystemQuestionForBook } from "./questionService";
import { ensureBookInSystemAndGet } from "./bookService"; // Import the key book service function

/**
 * Creates an answer.
 *
 * Flow:
 * 1. Ensures the target Book exists in the `Book` table using `targetBookIsbn`
 *    (fetches from external source and creates in `Book` table if necessary).
 * 2. If `questionId` is provided:
 *    - Validates the existing question belongs to the ensured Book.
 *    - Creates an answer for that question.
 * 3. If `questionId` is NOT provided (system question):
 *    - Calls `findOrCreateSystemQuestionForBook` for the ensured Book.
 *    - Creates an answer for that system question.
 *
 * @param prisma
 * @param profileId - ID of the user answering.
 * @param targetBookIsbn - ISBN of the book the answer is for.
 * @param answerTitle - Title of the answer.
 * @param answerText - Content of the answer.
 * @param questionId - Optional. If answering a specific existing question.
 * @returns The created Answer object.
 */
export async function createAnswer(
  prisma: PrismaClient,
  profileId: number,
  targetBookIsbn: string,
  answerTitle: string,
  answerText: string,
  questionId?: number
): Promise<Answer> {
  if (!profileId || !targetBookIsbn || !answerTitle || !answerText) {
    throw new Error(
      "AnswerService: Missing required fields (profileId, targetBookIsbn, answerTitle, answerText)."
    );
  }

  // Step 1: Ensure the Book exists in our system and get its record from 'Book' table.
  // `ensureBookExistsAndGet` will handle fetching from SearchBook/API and creating in 'Book' if needed.
  const bookInDb: Book = await ensureBookInSystemAndGet(prisma, targetBookIsbn);
  // At this point, bookInDb is guaranteed to be a valid record from the 'Book' table.

  let targetQuestionId: number;

  if (questionId) {
    // Answering a specific, existing question
    const existingQuestion = await prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!existingQuestion) {
      throw new Error(
        `AnswerService: Question with ID ${questionId} not found.`
      );
    }
    if (existingQuestion.bookId !== bookInDb.id) {
      throw new Error(
        `AnswerService: Mismatch - Provided Question ID ${questionId} (for book ${existingQuestion.bookId}) does not belong to the target Book ID ${bookInDb.id} (ISBN: ${targetBookIsbn}).`
      );
    }
    targetQuestionId = questionId;
    console.log(
      `AnswerService: Answering existing question ID ${targetQuestionId} for book "${bookInDb.title}".`
    );
  } else {
    // No questionId provided, so this is an answer to the system default question.
    // We now have a guaranteed `bookInDb.id` and `bookInDb.title`.
    const systemQuestion = await findOrCreateSystemQuestionForBook(
      prisma,
      bookInDb.id, // ID from 'Book' table
      bookInDb.title // Title from 'Book' table
    );
    targetQuestionId = systemQuestion.id;
    // console.log(`AnswerService: Ensured system question (ID: ${targetQuestionId}) for book "${bookInDb.title}".`);
  }

  // Step 2: Create the answer
  const newAnswer = await prisma.answer.create({
    data: {
      questionId: targetQuestionId,
      profileId: profileId,
      title: answerTitle,
      answerText: answerText,
    },
  });

  console.log(
    `AnswerService: Created answer (ID: ${newAnswer.id}) for question ID ${targetQuestionId} (Book: "${bookInDb.title}").`
  );
  return newAnswer;
}
