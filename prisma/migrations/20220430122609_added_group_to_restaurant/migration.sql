/*
  Warnings:

  - You are about to drop the column `outerTypeId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_outerTypeId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "outerTypeId";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "groupName" TEXT NOT NULL DEFAULT E'';
