/*
  Warnings:

  - You are about to drop the column `price_bs` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_cop` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price_usd` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price_bs",
DROP COLUMN "price_cop",
DROP COLUMN "price_usd",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
