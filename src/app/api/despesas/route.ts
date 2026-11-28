import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  const body = await request.json();

  await prisma.despesa.create({
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