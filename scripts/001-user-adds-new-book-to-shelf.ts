import { PrismaClient } from "@prisma/client";
import { addBookToUserShelf } from "../services/shelfService";

const prisma = new PrismaClient();

const TARGET_BOOK_ISBN = "9791190254373";

async function prepare() {
  const searchBook = await prisma.searchBook.findUnique({
    where: { isbn: TARGET_BOOK_ISBN },
  });
  if (!searchBook) {
    throw new Error(
      `book for ISBN ${TARGET_BOOK_ISBN} not found in search_book table.`
    );
  }
  return { searchBook };
}

async function execute() {
  const { searchBook } = await prepare();
  await addBookToUserShelf(prisma, 1, TARGET_BOOK_ISBN, searchBook);
  await addBookToUserShelf(prisma, 2, TARGET_BOOK_ISBN, searchBook);
}

execute();
