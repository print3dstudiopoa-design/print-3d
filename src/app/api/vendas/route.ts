import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  const body = await request.json();

  type ItemVenda = {
    produtoId: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
  };


    await prisma.venda.create({
    data: {

        dataPedido:
            new Date(
                `${body.dataVenda}T12:00:00`
            ),

        cliente:
        body.cliente,

        formaPagamento:
        body.formaPagamento,

        observacao:
        body.observacao,

        valorTotal:
        body.valorTotal,

        itens: {

        create:
            body.itens.map(
            (item: ItemVenda) => ({

                produtoId:
                item.produtoId,

                quantidade:
                item.quantidade,

                valorUnitario:
                item.valorUnitario,

                valorTotal:
                item.valorTotal,
            })
            ),
        },
    },

    });

    return Response.json({
        success: true,
        });
}