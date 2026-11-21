import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  const body = await request.json();

  await prisma.pessoa.create({
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
