import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface Profile {
  id: number;
  name: string;
  bio?: string;
  image?: string;
}

interface SearchBook {
  id: number;
  title: string;
  link: string;
  image?: string;
  author: string;
  discount?: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description?: string;
}

interface SeedData {
  profiles: Profile[];
  search_books: SearchBook[];
}

const seedFilePath = path.join(__dirname, "seed.json");
const seedDataString = fs.readFileSync(seedFilePath, "utf-8");
const seedData: SeedData = JSON.parse(seedDataString);

async function main() {
  await prisma.answer.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.shelf.deleteMany({});
  await prisma.searchBook.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.profile.deleteMany({});

  for (const profile of seedData.profiles) {
    await prisma.profile.create({
      data: profile,
    });
  }
  console.log(`Created ${seedData.profiles.length} profiles`);

  for (const book of seedData.search_books) {
    await prisma.searchBook.create({
      data: book,
    });
  }
  console.log(`Created ${seedData.search_books.length} search books`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
