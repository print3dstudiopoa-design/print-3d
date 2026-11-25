import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  const body = await request.json();

  type ItemEncomenda = {
    produtoId: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    cor1: string;
  };

  await prisma.encomenda.create({
    data: {
      nomeCliente:
        body.nomeCliente,

      telefoneCliente:
        body.telefoneCliente,

      dataEntrega:
        body.dataEntrega
          ? new Date(
               `${body.dataEntrega}T12:00:00`
            )
          : null,

      observacao:
        body.observacao,

      status: "EM_FILA",

      valorTotal:
        body.valorTotal,

      itens: {
        create: body.itens.map(
          (item: ItemEncomenda) => ({
            produtoId:
              item.produtoId,

            quantidade:
              item.quantidade,

            valorUnitario:
              item.valorUnitario,

            valorTotal:
              item.valorTotal,

            cor1:
              item.cor1,
          })
        ),
      },
    },
  });

  return Response.json({
    success: true,
  });
}