/*
  Warnings:

  - You are about to drop the `boards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "boards";

-- CreateTable
CREATE TABLE "board" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "Author" TEXT NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);
