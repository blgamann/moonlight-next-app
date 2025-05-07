import { PrismaClient, Shelf, Book } from "@prisma/client";
import { findOrCreateBook } from "./bookService"; // Assumes bookService.ts is in the same directory

// Define a type for the expected structure of book details from a source
type BookDetailsSource = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  image?: string | null;
  publisher?: string | null;
};

/**
 * Adds a book to a user's shelf.
 * If the book isn't in the main `Book` table, it's created using `bookDetailsFromSource`.
 * This function is designed for business logic reusability.
 * @param prisma - The PrismaClient instance.
 * @param profileId - The ID of the user.
 * @param bookIsbn - The ISBN of the book to add.
 * @param bookDetailsFromSource - Full details of the book from an external source.
 * @returns The Shelf entry (new or existing).
 */
export async function addBookToUserShelf(
  prisma: PrismaClient,
  profileId: number,
  bookIsbn: string,
  bookDetailsFromSource: BookDetailsSource
): Promise<Shelf> {
  if (!profileId) {
    throw new Error("ShelfService: Profile ID is required.");
  }
  if (bookIsbn !== bookDetailsFromSource.isbn) {
    // This check is important for data integrity
    throw new Error(
      "ShelfService: Mismatch between bookIsbn parameter and bookDetailsFromSource.isbn."
    );
  }

  // findOrCreateBook will get or create the book in the main 'Book' table
  const book: Book = await findOrCreateBook(prisma, bookDetailsFromSource);

  const existingShelfEntry = await prisma.shelf.findUnique({
    where: {
      profileId_bookId: { profileId, bookId: book.id }, // Compound ID for Shelf
    },
  });

  if (existingShelfEntry) {
    // Book is already on the shelf, return the existing entry
    return existingShelfEntry;
  }

  // Book is not on the shelf, create a new entry
  return prisma.shelf.create({
    data: { profileId, bookId: book.id },
  });
}
