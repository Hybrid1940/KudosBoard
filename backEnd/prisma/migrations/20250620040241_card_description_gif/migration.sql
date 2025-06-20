/*
  Warnings:

  - Added the required column `description` to the `card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gif` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "card" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "gif" TEXT NOT NULL;
