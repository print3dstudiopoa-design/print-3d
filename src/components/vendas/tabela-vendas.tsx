"use client";

import { useState } from "react";
import { ExcluirVenda } from "./excluir-venda";

interface Props {
  vendas: Venda[];
}

type ItemVenda = {
  id: string;
  quantidade: number;

  produto: {
    nome: string;
  };
};

type Venda = {
  id: string;
  codigo: number;
  dataPedido: string;
  cliente: string;
  formaPagamento: string;
  valorTotal: number;

  itens: ItemVenda[];
};

export function TabelaVendas({
  vendas,
}: Props) {

  const [pesquisa, setPesquisa] =
    useState("");

  const vendasFiltradas =
    vendas.filter((venda) =>
      venda.cliente
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        )
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

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar cliente..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(
            e.target.value
          )
        }
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

      <div className="overflow-hidden rounded-3xl border bg-white">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-stone-50">

              <th className="px-5 py-4 text-left text-xs uppercase">
                Cód.
              </th>

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

            {vendasFiltradas.map(
              (venda) => (

                <tr
                  key={venda.id}
                  className="border-b"
                >

                  <td className="px-5 py-4">
                    #{String(
                      venda.codigo
                    ).padStart(
                      3,
                      "0"
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(
                      venda.dataPedido
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {venda.cliente}
                  </td>

                  <td className="px-5 py-4">

                    {venda.itens.map(
                      (item: ItemVenda) => (

                        <div
                          key={item.id}
                        >
                          {
                            item.quantidade
                          }
                          x{" "}
                          {
                            item.produto
                              .nome
                          }
                        </div>

                      )
                    )}

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium

                        ${
                          venda.formaPagamento === "PIX"
                            ? "bg-green-100 text-green-700"
                            : venda.formaPagamento ===
                              "DINHEIRO"
                            ? "bg-amber-100 text-amber-700"
                            : venda.formaPagamento ===
                              "CARTAO_DEBITO"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-indigo-100 text-indigo-700"
                        }
                      `}
                    >
                       {formatarPagamento(
                            venda.formaPagamento
                            )}
                    </span>

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

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-3">
                        
                        <ExcluirVenda
                            id={venda.id}
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