import { prisma } from "@/lib/prisma";
import ProdutosClient from "./produtos-client";
import { ExcluirProduto } from "@/components/produtos/excluir-produto";
import { EditarProduto } from "@/components/produtos/editar-produto";
import { TabelaProdutos } from "@/components/produtos/tabela-produtos";

export const dynamic = "force-dynamic";

const produtos = await prisma.produto.findMany();

console.log(
  "PRODUTOS ENCONTRADOS:",
  produtos.length
);

  const produtosFormatados = produtos.map(
  (produto) => ({
    ...produto,

    valorPadrao: Number(
      produto.valorPadrao
    ),

    filamentoGramas: Number(
      produto.filamentoGramas
    ),

    createdAt:
      produto.createdAt.toISOString(),

    updatedAt:
      produto.updatedAt.toISOString(),
  })
);

const produtosTela =
  produtosFormatados.map(
    (produto) => ({
      ...produto,

      tempo: `${Math.floor(
        produto.tempoEstimadoMinutos / 60
      )}h ${
        produto.tempoEstimadoMinutos % 60
      }min`,

      filamento: `${produto.filamentoGramas} (g)`,

      valor: `R$ ${Number(
        produto.valorPadrao
      ).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,

      editar: (
        <EditarProduto
          produto={produto}
        />
      ),

      excluir: (
        <ExcluirProduto
          id={produto.id}
        />
      ),
    })
  );

     console.log(
      "TOTAL PRODUTOS:",
      produtos.length
    );


  return (
    <div>
      <p>Total: {produtos.length}</p>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Catálogo
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            Produtos
          </h1>

          <p>Total de produtos: {produtos.length}</p>

          <p className="mt-3 text-stone-500">
            Seus modelos prontos para escolha,
            com tempo de impressão e valor de venda.
          </p>
        </div>

        <ProdutosClient />

      </div>

      <TabelaProdutos
        produtos={produtosTela}
      />

    </div>
  );
}