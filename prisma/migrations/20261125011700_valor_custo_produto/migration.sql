/*
  Warnings:

  - You are about to drop the column `pessoaId` on the `Encomenda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Encomenda" DROP CONSTRAINT "Encomenda_pessoaId_fkey";

-- AlterTable
ALTER TABLE "public"."Encomenda" DROP COLUMN "pessoaId";

-- AlterTable
ALTER TABLE "public"."Produto" ADD COLUMN     "valorCusto" DECIMAL(10,2) NOT NULL DEFAULT 0;
