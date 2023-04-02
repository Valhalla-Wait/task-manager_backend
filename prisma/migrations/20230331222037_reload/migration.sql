/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkSpace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkSpaceUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkSpace" DROP CONSTRAINT "WorkSpace_author_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkSpaceUser" DROP CONSTRAINT "WorkSpaceUser_role_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkSpaceUser" DROP CONSTRAINT "WorkSpaceUser_user_id_fkey";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "WorkSpace";

-- DropTable
DROP TABLE "WorkSpaceUser";
