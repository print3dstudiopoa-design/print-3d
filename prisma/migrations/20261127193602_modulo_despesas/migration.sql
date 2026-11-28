-- CreateEnum
CREATE TYPE "public"."categoriaDespesa" AS ENUM ('ADMINISTRATIVO', 'DECORACAO', 'FILAMENTO', 'MANTENCAO_MAQUINA', 'ITENS_TRABALHO', 'OUTROS');

-- CreateTable
CREATE TABLE "public"."Despesa" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "data" TIMESTAMP(3),
    "observacao" TEXT,
    "categoria" "public"."categoriaDespesa" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Despesa_codigo_key" ON "public"."Despesa"("codigo");
