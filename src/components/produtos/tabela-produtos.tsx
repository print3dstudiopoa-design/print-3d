"use client";
import { useState } from "react";
import { EditarProduto } from "./editar-produto";
import { ExcluirProduto } from "./excluir-produto";

interface ProdutoTabela {
  id: string;
  codigo: number;
  nome: string;

  tempoEstimadoMinutos: number;
  filamentoGramas: number;
  valorPadrao: number;
  valorCusto: number;

  observacao: string | null;
  corPadrao: string | null;

  tempo: string;
  filamento: string;
  valor: string;

  editar: React.ReactNode;
  excluir: React.ReactNode;
}

interface Props {
  produtos: ProdutoTabela[];
}
export function TabelaProdutos({
  produtos,
}: Props) {
  const [pesquisa, setPesquisa] =
    useState("");

  const produtosFiltrados =
    produtos.filter((produto) =>
      produto.nome
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        )
    );

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(e.target.value)
        }
        className="mb-5 w-full max-w-md rounded-xl border border-stone-300 bg-white px-4 py-3"/>

      <div className="overflow-hidden rounded-3xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-4 text-left text-xs uppercase">
                Cód.
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Objeto
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase text-center">
                Tempo
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase text-center">
                Filamento
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase text-center">
                Cor padrão
              </th>

              <th className="px-5 py-4 text-right text-xs uppercase text-center">
                Valor Custo
              </th>

              <th className="px-5 py-4 text-right text-xs uppercase text-center">
                Valor Venda
              </th>

              <th className="px-5 py-4 text-center text-xs uppercase text-center">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {produtosFiltrados.map(
              (produto) => (
                <tr
                  key={produto.id}
                  className="border-b"
                >
                  <td className="px-5 py-4">
                    {String(
                      produto.codigo
                    ).padStart(3, "0")}
                  </td>

                  <td className="px-5 py-4">
                    {produto.nome}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {produto.tempo}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {produto.filamento}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {produto.corPadrao}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {produto.valorCusto}
                  </td>
                  
                  <td className="px-5 py-4 text-center">
                    {produto.valor}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-3">
                      <EditarProduto
                        produto={produto}
                      />

                      <ExcluirProduto
                        id={produto.id}
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}