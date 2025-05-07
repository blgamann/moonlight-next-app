/*
  Warnings:

  - You are about to alter the column `profileId` on the `Answer` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `profileId` on the `AnswerInterest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Author` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userAId` on the `MutualProfileInterest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userBId` on the `MutualProfileInterest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `sourceProfileId` on the `ProfileInterest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `targetProfileId` on the `ProfileInterest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Shelf` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `profileId` on the `Shelf` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `receiverProfileId` on the `SoulLink` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `senderProfileId` on the `SoulLink` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userAId` on the `Soulmate` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userBId` on the `Soulmate` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answer_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("answerText", "createdAt", "id", "profileId", "questionId", "title", "updatedAt") SELECT "answerText", "createdAt", "id", "profileId", "questionId", "title", "updatedAt" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE TABLE "new_AnswerInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" DATETIME,
    CONSTRAINT "AnswerInterest_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnswerInterest_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AnswerInterest" ("answerId", "canceledAt", "createdAt", "id", "profileId") SELECT "answerId", "canceledAt", "createdAt", "id", "profileId" FROM "AnswerInterest";
DROP TABLE "AnswerInterest";
ALTER TABLE "new_AnswerInterest" RENAME TO "AnswerInterest";
CREATE UNIQUE INDEX "AnswerInterest_profileId_answerId_canceledAt_key" ON "AnswerInterest"("profileId", "answerId", "canceledAt");
CREATE TABLE "new_Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Author" ("bio", "createdAt", "id", "image", "name", "updatedAt") SELECT "bio", "createdAt", "id", "image", "name", "updatedAt" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE TABLE "new_MutualProfileInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userAId" INTEGER NOT NULL,
    "userBId" INTEGER NOT NULL,
    "establishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dissolvedAt" DATETIME,
    CONSTRAINT "MutualProfileInterest_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MutualProfileInterest_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MutualProfileInterest" ("dissolvedAt", "establishedAt", "id", "userAId", "userBId") SELECT "dissolvedAt", "establishedAt", "id", "userAId", "userBId" FROM "MutualProfileInterest";
DROP TABLE "MutualProfileInterest";
ALTER TABLE "new_MutualProfileInterest" RENAME TO "MutualProfileInterest";
CREATE UNIQUE INDEX "MutualProfileInterest_userAId_userBId_dissolvedAt_key" ON "MutualProfileInterest"("userAId", "userBId", "dissolvedAt");
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" ("bio", "createdAt", "id", "image", "name", "updatedAt") SELECT "bio", "createdAt", "id", "image", "name", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE TABLE "new_ProfileInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceProfileId" INTEGER NOT NULL,
    "targetProfileId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" DATETIME,
    CONSTRAINT "ProfileInterest_sourceProfileId_fkey" FOREIGN KEY ("sourceProfileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfileInterest_targetProfileId_fkey" FOREIGN KEY ("targetProfileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProfileInterest" ("canceledAt", "createdAt", "id", "sourceProfileId", "targetProfileId") SELECT "canceledAt", "createdAt", "id", "sourceProfileId", "targetProfileId" FROM "ProfileInterest";
DROP TABLE "ProfileInterest";
ALTER TABLE "new_ProfileInterest" RENAME TO "ProfileInterest";
CREATE UNIQUE INDEX "ProfileInterest_sourceProfileId_targetProfileId_canceledAt_key" ON "ProfileInterest"("sourceProfileId", "targetProfileId", "canceledAt");
CREATE TABLE "new_Shelf" (
    "profileId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("profileId", "bookId"),
    CONSTRAINT "Shelf_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Shelf_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shelf" ("addedAt", "bookId", "profileId") SELECT "addedAt", "bookId", "profileId" FROM "Shelf";
DROP TABLE "Shelf";
ALTER TABLE "new_Shelf" RENAME TO "Shelf";
CREATE TABLE "new_SoulLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderProfileId" INTEGER NOT NULL,
    "receiverProfileId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" DATETIME,
    CONSTRAINT "SoulLink_senderProfileId_fkey" FOREIGN KEY ("senderProfileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SoulLink_receiverProfileId_fkey" FOREIGN KEY ("receiverProfileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SoulLink" ("canceledAt", "createdAt", "id", "receiverProfileId", "senderProfileId") SELECT "canceledAt", "createdAt", "id", "receiverProfileId", "senderProfileId" FROM "SoulLink";
DROP TABLE "SoulLink";
ALTER TABLE "new_SoulLink" RENAME TO "SoulLink";
CREATE UNIQUE INDEX "SoulLink_senderProfileId_receiverProfileId_canceledAt_key" ON "SoulLink"("senderProfileId", "receiverProfileId", "canceledAt");
CREATE TABLE "new_Soulmate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userAId" INTEGER NOT NULL,
    "userBId" INTEGER NOT NULL,
    "establishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastInteractionAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disbandedAt" DATETIME,
    CONSTRAINT "Soulmate_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Soulmate_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Soulmate" ("disbandedAt", "establishedAt", "id", "lastInteractionAt", "userAId", "userBId") SELECT "disbandedAt", "establishedAt", "id", "lastInteractionAt", "userAId", "userBId" FROM "Soulmate";
DROP TABLE "Soulmate";
ALTER TABLE "new_Soulmate" RENAME TO "Soulmate";
CREATE UNIQUE INDEX "Soulmate_userAId_userBId_disbandedAt_key" ON "Soulmate"("userAId", "userBId", "disbandedAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
