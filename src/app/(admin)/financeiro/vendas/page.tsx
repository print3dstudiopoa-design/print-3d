import { prisma } from "@/lib/prisma";
import VendasClient from "./vendas-client";

export const dynamic = "force-dynamic";

export default async function VendasPage() {

  const hoje = new Date();

  const mesAtual =
    hoje.getMonth();

  const anoAtual =
    hoje.getFullYear();

  const inicioMes =
    new Date(
      anoAtual,
      mesAtual,
      1
    );

  const fimMes =
    new Date(
      anoAtual,
      mesAtual + 1,
      0,
      23,
      59,
      59
    );

  const vendas =
    await prisma.venda.findMany({
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },

      where: {
        dataPedido: {
          gte: inicioMes,
          lte: fimMes,
        },
      },

      orderBy: {
        dataPedido: "desc",
      },
    });

  const totalMes =
    vendas.reduce(
      (total, venda) =>
        total +
        Number(venda.valorTotal),
      0
    );

  const quantidadePedidos =
    vendas.length;

  const ticketMedio =
    quantidadePedidos > 0
      ? totalMes /
        quantidadePedidos
      : 0;

  const produtos =
    await prisma.produto.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

  return (

  <div className="mx-auto w-full max-w-7xl">

    {/* Cabeçalho */}

    <div className="mb-8 flex items-start justify-between">

      <div>

        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
          Financeiro
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Vendas
        </h1>

        <p className="mt-3 text-stone-500">
          Cada pedido do mês, com o que foi vendido,
          por quanto e como foi pago.
        </p>

      </div>

      <VendasClient
        produtos={produtos.map(
          (produto) => ({
            id: produto.id,
            nome: produto.nome,
            valor: Number(
              produto.valorPadrao
            ),
          })
        )}
      />

    </div>

    {/* Filtros e Resumo */}

    <div className="mb-6 flex items-center justify-between">

      <div className="flex gap-3">

        <select
          className="
            rounded-xl
            border
            px-4
            py-2
          "
        >
          <option>Novembro</option>
        </select>

        <select
          className="
            rounded-xl
            border
            px-4
            py-2
          "
        >
          <option>2026</option>
        </select>

      </div>

      <div className="grid grid-cols-3 gap-3">

        <div className="rounded-2xl border p-4 text-center">

          <div className="text-xs uppercase text-stone-500">
            Total do Mês
          </div>

          <div className="text-2xl font-bold">
            R$ {totalMes.toLocaleString(
              "pt-BR",
              {
                minimumFractionDigits: 2,
              }
            )}
          </div>

        </div>

        <div className="rounded-2xl border p-4 text-center">

          <div className="text-xs uppercase text-stone-500">
            Pedidos
          </div>

          <div className="text-2xl font-bold">
            {quantidadePedidos}
          </div>

        </div>

        <div className="rounded-2xl border p-4 text-center">

          <div className="text-xs uppercase text-stone-500">
            Ticket Médio
          </div>

          <div className="text-2xl font-bold">
            R$ {ticketMedio.toLocaleString(
              "pt-BR",
              {
                minimumFractionDigits: 2,
              }
            )}
          </div>

        </div>

      </div>

    </div>

    <div className="overflow-hidden rounded-3xl border bg-white">

      <table className="w-full">

        <thead>

          <tr className="border-b bg-stone-50">

            <th className="px-5 py-4 text-left text-xs uppercase">
              Data
            </th>

            <th className="px-5 py-4 text-left text-xs uppercase">
              Cliente
            </th>

            <th className="px-5 py-4 text-left text-xs uppercase">
              Produtos
            </th>

            <th className="px-5 py-4 text-left text-xs uppercase">
              Pagamento
            </th>

            <th className="px-5 py-4 text-right text-xs uppercase">
              Total
            </th>

            <th className="px-5 py-4 text-center text-xs uppercase">
              Ações
            </th>

          </tr>

        </thead>

        <tbody>

          {vendas.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="px-5 py-10 text-center text-stone-500"
              >
                Nenhuma venda encontrada.
              </td>

            </tr>

          ) : (

            vendas.map((venda) => (

              <tr
                key={venda.id}
                className="border-b"
              >

                <td className="px-5 py-4">

                  {venda.dataPedido.toLocaleDateString(
                    "pt-BR"
                  )}

                </td>

                <td className="px-5 py-4">

                  {venda.cliente}

                </td>

                <td className="px-5 py-4">

                  {venda.itens.map(
                    (item) => (

                      <div key={item.id}>
                        {item.quantidade}x{" "}
                        {item.produto.nome}
                      </div>

                    )
                  )}

                </td>

                <td className="px-5 py-4">

                  {venda.formaPagamento}

                </td>

                <td className="px-5 py-4 text-right">

                  R${" "}

                  {Number(
                    venda.valorTotal
                  ).toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits:
                        2,
                    }
                  )}

                </td>

                <td className="px-5 py-4 text-center">

                  ✏️ 🗑

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>


  </div>

);
    
}