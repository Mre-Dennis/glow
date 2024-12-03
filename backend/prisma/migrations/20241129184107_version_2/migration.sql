/*
  Warnings:

  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `productName` on the `ProductPerformanceData` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "ProductPerformanceData" ALTER COLUMN "productName" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE INDEX "idx_productId" ON "ProductPerformanceData"("productId");
