/*
  Warnings:

  - You are about to drop the column `insta` on the `userprofile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userprofile" DROP COLUMN "insta",
ADD COLUMN     "instagram_token" VARCHAR(255) NOT NULL DEFAULT E'';
