import { prisma } from "@/lib/prisma";
import EncomendasClient from "./encomendas-client";
import { TabelaEncomendas } from "@/components/encomendas/tabela-encomendas";

export const dynamic = "force-dynamic";

export default async function EncomendasPage() {
  const encomendas =
    await prisma.encomenda.findMany({
      include: {
        itens: true,
      },
    });

  const ordemStatus = {
    EM_FILA: 1,
    EM_PRODUCAO: 2,
    FINALIZADA: 3,
    CANCELADA: 4,
  };

  const produtos =
    await prisma.produto.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

  const encomendasTela =
    encomendas.map(
      (encomenda) => ({
        id: encomenda.id,

        codigo:
          encomenda.codigo,

        nomeCliente:
          encomenda.nomeCliente,

        status:
          encomenda.status,

        dataEntrega:
          encomenda.dataEntrega
            ? encomenda.dataEntrega.toISOString()
            : null,

        valorTotal: Number(
          encomenda.valorTotal
        ),

        quantidadeItens:
          encomenda.itens?.length ??
          0,
      })
    );

  const emFila =
    encomendas.filter(
      (encomenda) =>
        encomenda.status ===
        "EM_FILA"
    ).length;

  return (
    <div className="mx-auto w-full px-8">

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mt-2 text-5xl font-bold">
            Encomendas
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
               Produção: {emFila} NA FILA 
          </p>


          <p className="mt-3 text-stone-500">
            Controle de pedidos e fila de produção.
          </p>
        </div>

        <EncomendasClient
          produtos={produtos.map(
            (produto) => ({
              id: produto.id,
              nome: produto.nome,
              valor: Number(produto.valorPadrao),
              tempo:
                produto.tempoEstimadoMinutos,
              filamento: Number(
                produto.filamentoGramas
              ),
            })
          )}
        />
      </div>

      <TabelaEncomendas
        encomendas={encomendasTela}
      />
    </div>
  );
}