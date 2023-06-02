/*
  Warnings:

  - You are about to drop the `TasksOnTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taskId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TasksOnTags" DROP CONSTRAINT "TasksOnTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TasksOnTags" DROP CONSTRAINT "TasksOnTags_taskId_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "taskId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TasksOnTags";

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
