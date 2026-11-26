import { prisma } from "@/lib/prisma";
import VendasClient from "./vendas-client";
import { ExcluirVenda } from "@/components/vendas/excluir-venda";

export const dynamic = "force-dynamic";

export default async function VendasPage() {

  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  const inicioMes = new Date(anoAtual, mesAtual, 1);

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

  function formatarPagamento(
    pagamento: string
  ) {
    switch (pagamento) {
      case "PIX":
        return "PIX";

      case "DINHEIRO":
        return "Dinheiro";

      case "CARTAO_DEBITO":
        return "Cartão Débito";

      case "CARTAO_CREDITO":
        return "Cartão Crédito";

      default:
        return pagamento;
    }
  }

  const pessoas =
    await prisma.pessoa.findMany({
      orderBy: {
        nome: "asc",
      },
    });

  const quantidadePedidos = vendas.length;

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

  const totalItens =
    vendas.reduce(
      (total, venda) =>
        total +
        venda.itens.reduce(
          (soma, item) =>
            soma + item.quantidade,
          0
        ),
      0
    );

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

          pessoas={pessoas.map(
            (pessoa) => ({
              id: pessoa.id,
              nome: pessoa.nome,
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

      <div className="grid grid-cols-4 gap-3">

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
            Itens Vendidos
          </div>

          <div className="text-2xl font-bold">
            {totalItens}
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
      </div>
    </div>

    <input
        type="text"
        placeholder="Pesquisar cliente..."
        className="
          mb-5
          w-full
          max-w-md
          rounded-xl
          border
          px-4
          py-3
        "
      />




  </div>

);
    
}