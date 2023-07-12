-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "outerTypeId" TEXT;

-- CreateTable
CREATE TABLE "OuterType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "OuterType_pkey" PRIMARY KEY ("id")
);
--s
-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "value_ar" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "restaurantId" TEXT NOT NULL,
    "outerTypeId" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_outerTypeId_fkey" FOREIGN KEY ("outerTypeId") REFERENCES "OuterType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OuterType" ADD CONSTRAINT "OuterType_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_outerTypeId_fkey" FOREIGN KEY ("outerTypeId") REFERENCES "OuterType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
