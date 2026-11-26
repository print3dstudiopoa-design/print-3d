import { prisma } from "@/lib/prisma";
import EncomendasClient from "./encomendas-client";
import { TabelaEncomendas } from "@/components/encomendas/tabela-encomendas";
import { VisualizarEncomenda } from "@/components/encomendas/visualizar-encomenda";

export const dynamic = "force-dynamic";

export default async function EncomendasPage() {
  
  const encomendas =
  await prisma.encomenda.findMany({
    include: {
      itens: {
        include: {
          produto: true,
        },
      },
    },
    orderBy: {
      dataEntrega: "desc",
    },
  });

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

        codigo: encomenda.codigo,

        cliente:
          encomenda.nomeCliente,

        status:
          encomenda.status,

        observacao:
          encomenda.observacao,

        dataEntrega:
          encomenda.dataEntrega,

        valorTotal:
          Number(encomenda.valorTotal),

        itens:
          encomenda.itens.map(
            (item) => ({
              id: item.id,

              quantidade:
                item.quantidade,

              produto: {
                nome:
                  item.produto.nome,
              },
            })
          ),
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