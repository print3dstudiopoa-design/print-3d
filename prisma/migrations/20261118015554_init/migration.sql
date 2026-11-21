-- CreateTable
CREATE TABLE "public"."Produto" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tempoEstimado" INTEGER NOT NULL,
    "filamentoGramas" DECIMAL(10,2),
    "corPadrao" TEXT,
    "observacao" TEXT,
    "valorPadrao" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pessoa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "telefone" TEXT,
    "email" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "cpf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Configuracao" (
    "id" TEXT NOT NULL,
    "percentualPerda" DECIMAL(5,2) NOT NULL,
    "valorKwh" DECIMAL(10,4) NOT NULL,
    "valorFilamentoKg" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "hexadecimal" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_codigo_key" ON "public"."Produto"("codigo");
