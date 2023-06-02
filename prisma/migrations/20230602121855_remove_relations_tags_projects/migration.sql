/*
  Warnings:

  - You are about to drop the column `projectId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_projectId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "projectId";
