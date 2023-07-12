-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "address" JSONB NOT NULL DEFAULT '{"en": "address_en","ar":"address_ar"}',
ADD COLUMN     "addressLink" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "description" JSONB NOT NULL DEFAULT '{"en": "descriptoin_en","ar":"description_Ar"}';
