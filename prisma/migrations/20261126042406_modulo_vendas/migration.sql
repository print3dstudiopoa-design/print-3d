/*
  Warnings:

  - You are about to drop the column `dataEntrega` on the `Venda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Venda" DROP COLUMN "dataEntrega",
ADD COLUMN     "pessoaId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Venda" ADD CONSTRAINT "Venda_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."Pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
