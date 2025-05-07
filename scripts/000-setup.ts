import { PrismaClient } from "@prisma/client";

import { profiles, search_books } from "../prisma/seed.json";
import { addBookToUserShelf } from "../services/shelfService";
import { createAnswer } from "../services/answerService";

const prisma = new PrismaClient();

async function execute() {
  let i = 0;
  for (const searchBook of search_books) {
    let j = 0;
    for (const profile of profiles) {
      await addBookToUserShelf(prisma, profile.id, searchBook.isbn, searchBook);
      await createAnswer(
        prisma,
        profile.id,
        searchBook.isbn,
        `test ${i}, ${j}`,
        `test ${i}, ${j}`
      );
      j++;
    }
    i++;
  }
}

execute();
