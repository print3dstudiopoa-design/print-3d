/*
  Warnings:

  - Added the required column `nomeCliente` to the `Encomenda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Encomenda" DROP CONSTRAINT "Encomenda_pessoaId_fkey";

-- AlterTable
ALTER TABLE "public"."Encomenda" ADD COLUMN     "nomeCliente" TEXT NOT NULL,
ADD COLUMN     "telefoneCliente" TEXT,
ALTER COLUMN "pessoaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Encomenda" ADD CONSTRAINT "Encomenda_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."Pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
