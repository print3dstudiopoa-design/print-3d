"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { VisualizarEncomenda } from "./visualizar-encomenda";

interface EncomendaTabela {
  id: string;
  codigo: number;
  cliente: string;
  status: string;
  dataEntrega: Date | null;
  observacao: string | null;
  valorTotal: number;
  itens: ItemEncomenda[];
}

interface ItemEncomenda {
  id: string;
  quantidade: number;
  produto: {
    nome: string;
  };
}

interface Props {
  encomendas: EncomendaTabela[];
}

export function TabelaEncomendas({
  encomendas,
}: Props) {
  const [pesquisa, setPesquisa] =
    useState("");

  const router = useRouter();

  const encomendasFiltradas =
    encomendas.filter(
      (encomenda) =>
        encomenda.cliente
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )
    );

  function getStatusClass(
    status: string
  ) {
    switch (status) {
      case "EM_FILA":
        return "bg-blue-100 text-blue-800 border-blue-300";

      case "EM_PRODUCAO":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";

      case "FINALIZADA":
        return "bg-green-100 text-green-800 border-green-300";

      case "CANCELADA":
        return "bg-red-100 text-red-800 border-red-300";

      default:
        return "bg-gray-100 text-gray-800";
    }
  }
  
  async function alterarStatus(
    id: string,
    status: string
  ) {
    await fetch(
      "/api/encomendas/status",
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
          status,
        }),
      }
    );

    router.refresh();
  }

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar encomenda..."
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

            <tr className="border-b">

              <th className="px-5 py-4 text-left text-xs uppercase">
                Cód.
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Cliente
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Itens
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Entrega
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Situação
              </th>

              <th className="px-5 py-4 text-right text-xs uppercase">
                Valor
              </th>

              <th className="px-5 py-4 text-right text-xs uppercase">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {encomendasFiltradas.map(
              (encomenda) => (

                <tr
                  key={encomenda.id}
                  className="border-b"
                >

                  <td className="px-5 py-4">
                    {String(
                      encomenda.codigo
                    ).padStart(
                      3,
                      "0"
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {
                      encomenda.cliente
                    }
                  </td>

                  <td className="px-5 py-4">
                      {encomenda.itens.length > 0 ? (
                        <ul className="space-y-1">
                          {encomenda.itens.map((item) => (
                            <li key={item.id} className="text-sm">
                              {item.quantidade}x {item.produto.nome}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "-"
                      )}
                  </td>

                  <td className="px-5 py-4">

                    {encomenda.dataEntrega
                      ? new Date(
                          encomenda.dataEntrega
                        ).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}

                  </td>

                  <td className="px-5 py-4">

                    <select
                      value={encomenda.status}
                      onChange={(e) =>
                        alterarStatus(
                          encomenda.id,
                          e.target.value
                        )
                      }
                      className={`
                        rounded-lg
                        border
                        px-2
                        py-1
                        text-xs
                        text-center
                        font-semibold
                        ${getStatusClass(
                          encomenda.status
                        )}
                      `}
                    >
                      <option value="EM_FILA">
                        Em Fila
                      </option>

                      <option value="EM_PRODUCAO">
                        Em Produção
                      </option>

                      <option value="FINALIZADA">
                        Finalizada
                      </option>

                      <option value="CANCELADA">
                        Cancelada
                      </option>
                    </select>

                  </td>

                  <td className="px-5 py-4 text-right">

                    R${" "}
                    {Number(
                      encomenda.valorTotal
                    ).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits:
                          2,
                      }
                    )}

                  </td>

                  <td>
                    <div className="flex justify-center gap-3">

                      <VisualizarEncomenda
                        encomenda={encomenda}
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