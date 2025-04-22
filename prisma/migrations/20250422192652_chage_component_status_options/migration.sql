/*
  Warnings:

  - You are about to drop the column `isActive` on the `equipments` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ON', 'OFF', 'FAIL');

-- AlterTable
ALTER TABLE "equipments" DROP COLUMN "isActive",
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'OFF';
