/*
  Warnings:

  - Added the required column `forecast` to the `ShoppingListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShoppingListItem" DROP CONSTRAINT "ShoppingListItem_priceId_fkey";

-- AlterTable
ALTER TABLE "ShoppingList" ADD COLUMN     "marketId" TEXT;

-- AlterTable
ALTER TABLE "ShoppingListItem" ADD COLUMN     "forecast" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "priceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;
