-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "is_offer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price_offer" DECIMAL(65,30) NOT NULL DEFAULT 0;
