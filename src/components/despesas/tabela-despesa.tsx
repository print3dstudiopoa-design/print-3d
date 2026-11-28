"use client";
import { useState } from "react";
import { EditarDespesa } from "./editar-despesa";
import { ExcluirDespesa } from "./excluir-despesa";

interface DespesaTabela {
  id: string;
  codigo: number;
  descricao: string;
  valor: number;
  observacao: string | null;
  data: string;
  categoria: string;
}

interface Props {
  despesas: DespesaTabela[];
}
export function TabelaDespesas({
  despesas,
}: Props) {
  
  const [pesquisa, setPesquisa] = useState("");

  const despesasFiltradas =
    despesas.filter((despesa) =>
      despesa.descricao
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        )
    );

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar despesa..."
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

              <th className="px-5 py-4 text-left text-xs uppercase text-center">
                Data
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Descrição
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase text-center">
                Categoria
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase text-center">
                Valor
              </th>

              <th className="px-5 py-4 text-center text-xs uppercase text-center">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {despesasFiltradas.map(
              (despesa) => (
                <tr
                  key={despesa.id}
                  className="border-b"
                >
                  <td className="px-5 py-4">
                    {String(
                      despesa.codigo
                    ).padStart(3, "0")}
                  </td>

                  <td className="px-5 py-4 text-left">
                    {despesa.data
                      ? new Date(
                          despesa.data
                        ).toLocaleDateString("pt-BR")
                      : "-"}
                  </td>

                  <td className="px-5 py-4 text-left">
                    {despesa.descricao}
                  </td>

                  <td className="px-5 py-4 text-left">
                    {despesa.categoria}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {despesa.valor}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-3">
                      <EditarDespesa
                        despesa={despesa}
                      />

                      <ExcluirDespesa
                        id={despesa.id}
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