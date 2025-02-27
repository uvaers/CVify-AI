/*
  Warnings:

  - You are about to drop the column `Project` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "Project",
ADD COLUMN     "project" TEXT;
