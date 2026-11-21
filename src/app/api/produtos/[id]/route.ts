import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  await prisma.produto.update({
    where: {
      id,
    },
    data: {
      ativo: false,
    },
  });

  return Response.json({
    success: true,
  });
}

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  const body = await request.json();

  await prisma.produto.update({
    where: {
      id,
    },

    data: {
      nome: body.nome,
      
      tempoEstimadoMinutos:
        Number(body.tempoEstimadoMinutos),

      filamentoGramas:
        Number(body.filamentoGramas),

      corPadrao: body.corPadrao,

      valorPadrao:
        Number(body.valorPadrao),

      observacao:
        body.observacao,
    },
  });

  return Response.json({
    success: true,
  });
}