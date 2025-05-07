-- CreateTable
CREATE TABLE "SearchBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "link" TEXT,
    "image" TEXT,
    "author" TEXT NOT NULL,
    "discount" TEXT,
    "publisher" TEXT NOT NULL,
    "pubdate" TEXT,
    "isbn" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchBook_isbn_key" ON "SearchBook"("isbn");
