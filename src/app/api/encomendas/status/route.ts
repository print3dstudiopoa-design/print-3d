import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request
) {
  const body =
    await request.json();

  await prisma.encomenda.update({
    where: {
      id: body.id,
    },

    data: {
      status: body.status,
    },
  });

  return Response.json({
    success: true,
  });
}