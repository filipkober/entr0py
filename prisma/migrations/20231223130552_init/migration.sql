-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entropy" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FormAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "favColor" TEXT NOT NULL,
    "favAnimal" TEXT NOT NULL,
    "favCrisis" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "whatWouldYouBe" TEXT NOT NULL,
    "deepestSecret" TEXT NOT NULL,
    CONSTRAINT "FormAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "hintsUsed" INTEGER NOT NULL,
    "timeTaken" REAL NOT NULL,
    "completed" BOOLEAN NOT NULL,
    CONSTRAINT "Level_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_entropy_key" ON "User"("entropy");

-- CreateIndex
CREATE UNIQUE INDEX "FormAnswer_userId_key" ON "FormAnswer"("userId");
