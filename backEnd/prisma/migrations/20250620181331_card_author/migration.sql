/*
  Warnings:

  - Added the required column `author` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "card" ADD COLUMN     "author" TEXT NOT NULL;
