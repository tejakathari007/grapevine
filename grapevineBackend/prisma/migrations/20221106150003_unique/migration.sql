/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `userprofile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "userprofile" ALTER COLUMN "phone" DROP DEFAULT,
ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "userprofile_phone_key" ON "userprofile"("phone");
