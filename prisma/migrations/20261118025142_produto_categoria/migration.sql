/*
  Warnings:

  - You are about to drop the column `tempoEstimado` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `tempoEstimadoMinutos` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Made the column `filamentoGramas` on table `Produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valorPadrao` on table `Produto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Pessoa" ADD COLUMN     "observacao" TEXT;

-- AlterTable
ALTER TABLE "public"."Produto" DROP COLUMN "tempoEstimado",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "tempoEstimadoMinutos" INTEGER NOT NULL,
ALTER COLUMN "filamentoGramas" SET NOT NULL,
ALTER COLUMN "valorPadrao" SET NOT NULL;
