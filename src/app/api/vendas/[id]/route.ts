import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  await prisma.vendaItem.deleteMany({
    where: {
      vendaId: id,
    },
  });

  await prisma.venda.delete({
    where: {
      id,
    },
  });

  return Response.json({
    success: true,
  });
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const body =
    await request.json();

  await prisma.venda.update({
    where: {
      id,
    },

    data: {
      formaPagamento:
        body.formaPagamento,

      observacao:
        body.observacao,
    },
  });

  return Response.json({
    success: true,
  });
}

