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

  await prisma.despesa.delete({
    where: {
      id,
    }
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

  await prisma.despesa.update({
    where: {
      id,
    },

    data: {
      descricao: body.descricao,
      observacao: body.observacao,
      categoria: body.categoria,
      valor: body.valor,
      data: new Date(`${body.data}T12:00:00`),
    },
  });

  return Response.json({
    success: true,
  });
}