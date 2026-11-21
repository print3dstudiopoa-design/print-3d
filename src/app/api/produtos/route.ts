import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  const body = await request.json();

  await prisma.produto.create({
    data: {
      nome: body.nome,

      tempoEstimadoMinutos:
        body.tempoEstimadoMinutos,

      filamentoGramas:
        Number(body.filamentoGramas).toFixed(2),

      corPadrao:
        body.corPadrao,

      valorPadrao:
        body.valorPadrao,

      observacao:
        body.observacao,

      categoria: "",

      ativo: true,
    },
  });

  return Response.json({
    success: true,
  });
}