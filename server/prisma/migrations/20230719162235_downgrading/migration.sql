/*
  Warnings:

  - You are about to drop the `customBoolField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customDateField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customIntField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customStrField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customTextField` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,description]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "customBoolField" DROP CONSTRAINT "customBoolField_itemId_fkey";

-- DropForeignKey
ALTER TABLE "customDateField" DROP CONSTRAINT "customDateField_itemId_fkey";

-- DropForeignKey
ALTER TABLE "customIntField" DROP CONSTRAINT "customIntField_itemId_fkey";

-- DropForeignKey
ALTER TABLE "customStrField" DROP CONSTRAINT "customStrField_itemId_fkey";

-- DropForeignKey
ALTER TABLE "customTextField" DROP CONSTRAINT "customTextField_itemId_fkey";

-- DropIndex
DROP INDEX "User_email_idx";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "customBoolFieldName1" TEXT,
ADD COLUMN     "customBoolFieldName2" TEXT,
ADD COLUMN     "customBoolFieldName3" TEXT,
ADD COLUMN     "customDateFieldName1" TEXT,
ADD COLUMN     "customDateFieldName2" TEXT,
ADD COLUMN     "customDateFieldName3" TEXT,
ADD COLUMN     "customIntFieldName1" TEXT,
ADD COLUMN     "customIntFieldName2" TEXT,
ADD COLUMN     "customIntFieldName3" TEXT,
ADD COLUMN     "customStrFieldName1" TEXT,
ADD COLUMN     "customStrFieldName2" TEXT,
ADD COLUMN     "customStrFieldName3" TEXT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "customBoolField1" BOOLEAN,
ADD COLUMN     "customBoolField2" BOOLEAN,
ADD COLUMN     "customBoolField3" BOOLEAN,
ADD COLUMN     "customDateField1" TIMESTAMP(3),
ADD COLUMN     "customDateField2" TIMESTAMP(3),
ADD COLUMN     "customDateField3" TIMESTAMP(3),
ADD COLUMN     "customIntField1" INTEGER,
ADD COLUMN     "customIntField2" INTEGER,
ADD COLUMN     "customIntField3" INTEGER,
ADD COLUMN     "customStrField1" TEXT,
ADD COLUMN     "customStrField2" TEXT,
ADD COLUMN     "customStrField3" TEXT;

-- DropTable
DROP TABLE "customBoolField";

-- DropTable
DROP TABLE "customDateField";

-- DropTable
DROP TABLE "customIntField";

-- DropTable
DROP TABLE "customStrField";

-- DropTable
DROP TABLE "customTextField";

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_description_key" ON "Collection"("name", "description");

-- CreateIndex
CREATE INDEX "Topic_name_idx" ON "Topic"("name");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
