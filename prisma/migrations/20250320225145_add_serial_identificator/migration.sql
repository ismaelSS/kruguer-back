/*
  Warnings:

  - A unique constraint covering the columns `[serial]` on the table `equipments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serial` to the `equipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "serial" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "equipments_serial_key" ON "equipments"("serial");
