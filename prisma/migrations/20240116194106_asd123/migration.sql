/*
  Warnings:

  - Made the column `returnedAt` on table `Loan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "fine" INTEGER,
ALTER COLUMN "returnedAt" SET NOT NULL;
