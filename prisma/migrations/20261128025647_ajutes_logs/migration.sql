/*
  Warnings:

  - Made the column `data` on table `Despesa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Despesa" ALTER COLUMN "data" SET NOT NULL;
