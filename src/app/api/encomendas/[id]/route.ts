import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  request: Request,
  { params }: Params
) {

  const { id } = await params;

  await prisma.encomendaItem.deleteMany({
    where: {
      encomendaId: id,
    },
  });

  await prisma.encomenda.delete({
    where: {
      id,
    },
  });

  return Response.json({
    success: true,
  });

}