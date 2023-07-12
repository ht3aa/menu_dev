/*
  Warnings:

  - You are about to drop the column `color` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "color",
ADD COLUMN     "colors" TEXT[];
