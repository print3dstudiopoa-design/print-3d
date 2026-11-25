-- CreateEnum
CREATE TYPE "public"."StatusEncomenda" AS ENUM ('EM_FILA', 'EM_PRODUCAO', 'FINALIZADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "public"."Encomenda" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "pessoaId" TEXT NOT NULL,
    "status" "public"."StatusEncomenda" NOT NULL DEFAULT 'EM_FILA',
    "dataEntrega" TIMESTAMP(3),
    "dataProducao" TIMESTAMP(3),
    "dataFinalizacao" TIMESTAMP(3),
    "dataEntregaReal" TIMESTAMP(3),
    "valorTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Encomenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EncomendaItem" (
    "id" TEXT NOT NULL,
    "encomendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "valorUnitario" DECIMAL(10,2) NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "cor1" TEXT,
    "cor2" TEXT,
    "cor3" TEXT,
    "observacao" TEXT,

    CONSTRAINT "EncomendaItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Encomenda_codigo_key" ON "public"."Encomenda"("codigo");

-- AddForeignKey
ALTER TABLE "public"."Encomenda" ADD CONSTRAINT "Encomenda_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EncomendaItem" ADD CONSTRAINT "EncomendaItem_encomendaId_fkey" FOREIGN KEY ("encomendaId") REFERENCES "public"."Encomenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EncomendaItem" ADD CONSTRAINT "EncomendaItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
