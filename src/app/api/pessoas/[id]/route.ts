import { prisma } from "@/lib/prisma";

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

  await prisma.pessoa.update({
    where: {
      id,
    },

    data: {
      nome: body.nome,
      telefone: body.telefone,
      email: body.email,
      cidade: body.cidade,
      bairro: body.bairro,
      cpf: body.cpf,
      observacao: body.observacao,
    },
  });

  return Response.json({
    success: true,
  });
}

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  await prisma.pessoa.delete({
    where: {
      id,
    },
  });

  return Response.json({
    success: true,
  });
}