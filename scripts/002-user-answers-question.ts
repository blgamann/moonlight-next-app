import { PrismaClient } from "@prisma/client";
import { createAnswer } from "../services/answerService";
import { search_books } from "../prisma/seed.json";
import { findOrCreateBook } from "../services/bookService";

const prisma = new PrismaClient();

const USER_ID = 1;

async function prepare1() {
  const profile = await prisma.profile.findUnique({ where: { id: USER_ID } });
  if (!profile) throw new Error(`Profile ${USER_ID} missing.`);

  const searchBook = await prisma.searchBook.findUnique({
    where: { isbn: search_books[0].isbn },
  });
  if (!searchBook)
    throw new Error(`SearchBook ${search_books[0].isbn} missing.`);

  return { profile, searchBook };
}

async function prepare2() {
  const book = await findOrCreateBook(prisma, search_books[1]);
  return { book };
}

async function run() {
  const { profile, searchBook } = await prepare1();
  const answer1 = await createAnswer(
    prisma,
    profile.id,
    searchBook.isbn,
    "Test Title",
    "Test answer content.",
    undefined // No specific question ID, so it's a system question
  );
  await createAnswer(
    prisma,
    profile.id,
    searchBook.isbn,
    "Test Title 2",
    "Test answer content 2.",
    answer1.questionId
  );

  const { book } = await prepare2();
  const answer2 = await createAnswer(
    prisma,
    profile.id,
    book.isbn,
    "Test Title 3",
    "Test answer content 3.",
    undefined // No specific question ID, so it's a system question
  );
  await createAnswer(
    prisma,
    profile.id,
    book.isbn,
    "Test Title 4",
    "Test answer content 4.",
    answer2.questionId
  );
}

run();
