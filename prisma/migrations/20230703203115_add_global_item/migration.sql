/*
  Warnings:

  - Added the required column `globalItemId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "globalItemId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GlobalItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GlobalItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_globalItemId_fkey" FOREIGN KEY ("globalItemId") REFERENCES "GlobalItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
