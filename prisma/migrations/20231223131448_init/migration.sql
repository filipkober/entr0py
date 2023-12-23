/*
  Warnings:

  - Added the required column `level_index` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "hintsUsed" INTEGER NOT NULL,
    "timeTaken" REAL NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "level_index" INTEGER NOT NULL,
    CONSTRAINT "Level_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Level" ("completed", "hintsUsed", "id", "name", "timeTaken", "userId") SELECT "completed", "hintsUsed", "id", "name", "timeTaken", "userId" FROM "Level";
DROP TABLE "Level";
ALTER TABLE "new_Level" RENAME TO "Level";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
