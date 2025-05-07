import { PrismaClient, Book } from "@prisma/client";

// 외부 소스(SearchBook 테이블 또는 실제 API)에서 가져온 책 데이터의 기본 구조
// Book 테이블 생성에 필요한 최소한의 정보를 포함해야 합니다.
// 이 타입은 findOrCreateBook 및 새로운 getBookInfo에서도 활용됩니다.
export type BookDetailsSource = {
  isbn: string;
  title: string;
  author: string;
  image?: string | null;
  publisher?: string | null;
  // Naver API에서 제공하는 추가 정보 (필요에 따라 Book 모델에 추가 가능)
  link?: string | null;
  discount?: string | null;
  pubdate?: string | null;
  description?: string | null;
};

/**
 * Finds a book in the main Book table by ISBN, or creates it if it doesn't exist,
 * using pre-provided details.
 * This function is used when you already have the book's details and want to ensure
 * it's in the 'Book' table, typically for actions like adding to a shelf.
 * (이전 코드에서 `findOrCreateBook`으로 제공된 함수, 이름을 명확히 하기 위해 `findOrCreateBookWithDetails`로 변경 가능)
 *
 * @param prisma - The PrismaClient instance.
 * @param bookDetails - Details of the book to find or create.
 * @returns The found or created Book record from the 'Book' table.
 * @throws Error if essential book details (isbn, title, author) are missing.
 */
export async function findOrCreateBook( // 이름 변경 제안 (기존 findOrCreateBook)
  prisma: PrismaClient,
  bookDetails: Pick<
    BookDetailsSource,
    "isbn" | "title" | "author" | "image" | "publisher"
  >
): Promise<Book> {
  const { isbn, title, author, image, publisher } = bookDetails;

  if (!isbn || !title || !author) {
    throw new Error(
      "BookService: ISBN, title, and author are required for findOrCreateBookWithDetails."
    );
  }

  const existingBook = await prisma.book.findUnique({
    where: { isbn },
  });

  if (existingBook) {
    return existingBook;
  }

  console.log(
    `BookService: Book with ISBN ${isbn} not found in 'Book' table. Creating with provided details...`
  );
  return prisma.book.create({
    data: {
      isbn,
      title,
      author,
      image: image || null,
      publisher: publisher || null,
    },
  });
}

/**
 * Retrieves book information by ISBN, prioritizing the `Book` table,
 * then falling back to the `SearchBook` table.
 * This function DOES NOT create a record in the `Book` table if found only in `SearchBook`.
 * It's for display or informational purposes when you don't necessarily need to persist it yet.
 * The returned structure is unified to `BookDetailsSource` for consistency.
 *
 * @param prisma - The PrismaClient instance.
 * @param isbn - The ISBN of the book to retrieve.
 * @returns BookDetailsSource if found in either table, otherwise null.
 */
export async function getBookInfoByIsbn(
  prisma: PrismaClient,
  isbn: string
): Promise<BookDetailsSource | null> {
  if (!isbn) {
    console.warn("BookService: getBookInfoByIsbn called with no ISBN.");
    return null;
  }

  // 1. Try to find in the main 'Book' table first
  const bookFromPrimaryTable = await prisma.book.findUnique({
    where: { isbn },
  });

  if (bookFromPrimaryTable) {
    console.log(
      `BookService: Found book "${bookFromPrimaryTable.title}" in 'Book' table.`
    );
    // Map Book fields to BookDetailsSource (they are very similar here)
    return {
      isbn: bookFromPrimaryTable.isbn,
      title: bookFromPrimaryTable.title,
      author: bookFromPrimaryTable.author,
      image: bookFromPrimaryTable.image,
      publisher: bookFromPrimaryTable.publisher,
      // If Book model had link, description etc., map them here
    };
  }

  // 2. If not in 'Book' table, try 'SearchBook' table
  console.log(
    `BookService: Book with ISBN ${isbn} not in 'Book' table. Checking 'SearchBook' table...`
  );
  const bookFromSearchTable = await prisma.searchBook.findUnique({
    where: { isbn },
  });

  if (bookFromSearchTable) {
    console.log(
      `BookService: Found book "${bookFromSearchTable.title}" in 'SearchBook' table.`
    );
    // Map SearchBook fields to BookDetailsSource
    return {
      isbn: bookFromSearchTable.isbn,
      title: bookFromSearchTable.title,
      author: bookFromSearchTable.author,
      image: bookFromSearchTable.image,
      publisher: bookFromSearchTable.publisher,
      link: bookFromSearchTable.link,
      discount: bookFromSearchTable.discount,
      pubdate: bookFromSearchTable.pubdate,
      description: bookFromSearchTable.description,
    };
  }

  console.log(
    `BookService: Book with ISBN ${isbn} not found in 'Book' or 'SearchBook' tables.`
  );
  return null; // Not found in either table
}

/**
 * Ensures a book exists in the `Book` table and returns it.
 * If not in `Book` table, it fetches details from `SearchBook` (or an external API in a fuller version)
 * and creates the book in the `Book` table.
 * This is the function to use when an action requires the book to be in the main `Book` table.
 *
 * @param prisma The PrismaClient instance.
 * @param isbn The ISBN of the book.
 * @returns The Book record from the `Book` table.
 * @throws Error if the book cannot be found in `SearchBook` (or external source) after not being in `Book`.
 */
export async function ensureBookInSystemAndGet(
  prisma: PrismaClient,
  isbn: string
): Promise<Book> {
  if (!isbn)
    throw new Error("BookService: ISBN is required to ensure book in system.");

  const book = await prisma.book.findUnique({ where: { isbn } });
  if (book) {
    return book;
  }

  // Not in Book table, try to get details from SearchBook (or external API in a more complex system)
  const searchBookDetails = await prisma.searchBook.findUnique({
    where: { isbn },
  });

  if (!searchBookDetails) {
    throw new Error(
      `BookService: Book with ISBN ${isbn} not found in 'Book' table and also not found in 'SearchBook' table. Cannot proceed.`
    );
  }

  console.log(
    `BookService: Book "${searchBookDetails.title}" (ISBN: ${isbn}) found in SearchBook. Creating in 'Book' table...`
  );
  return prisma.book.create({
    data: {
      isbn: searchBookDetails.isbn,
      title: searchBookDetails.title,
      author: searchBookDetails.author,
      image: searchBookDetails.image || null,
      publisher: searchBookDetails.publisher || null,
    },
  });
}
