/*
  Warnings:

  - A unique constraint covering the columns `[tranId]` on the table `TranVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TranVerification_tranId_key" ON "TranVerification"("tranId");
