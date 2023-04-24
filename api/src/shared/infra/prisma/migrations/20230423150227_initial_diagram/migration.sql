-- CreateEnum
CREATE TYPE "Nature" AS ENUM ('INFLOW', 'OUTFLOW');

-- CreateEnum
CREATE TYPE "Signal" AS ENUM ('ADDITION', 'SUBTRACTION');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isAffiliatedTo" INTEGER,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "valueInCents" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "nature" "Nature" NOT NULL,
    "signal" "Signal" NOT NULL,

    CONSTRAINT "TransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_description_key" ON "Product"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_name_key" ON "Seller"("name");

-- CreateIndex
CREATE INDEX "Transaction_sellerId_idx" ON "Transaction"("sellerId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_isAffiliatedTo_fkey" FOREIGN KEY ("isAffiliatedTo") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
