/*
  Warnings:

  - Changed the type of `name` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `description` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- Category
UPDATE "Category" SET name = format('{"en":"%s","ar":""}',name);

ALTER TABLE "Category" ALTER COLUMN "name" TYPE JSONB USING to_jsonb(name::json);

-- AlterTable
-- Item
UPDATE "Item" SET name = format('{"en":"%s","ar":""}',name);
UPDATE "Item" SET "description" = format('{"en":"%s","ar":""}',"description");

ALTER TABLE "Item"  ALTER COLUMN name TYPE JSONB USING to_jsonb(name::json);

ALTER TABLE "Item" ALTER COLUMN "description" TYPE JSONB USING to_jsonb("description"::json);
