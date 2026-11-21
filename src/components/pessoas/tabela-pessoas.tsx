"use client";
import { useState } from "react";

interface PessoaTabela {
  id: string;
  nome: string;
  telefone: string | null;
  cidade: string | null;
  email: string | null;
  editar: React.ReactNode;
  excluir: React.ReactNode;
}

interface Props {
  pessoas: PessoaTabela[];
}

export function TabelaPessoas({
  pessoas,
}: Props) {
  const [pesquisa, setPesquisa] =
    useState("");

  const pessoasFiltradas =
    pessoas.filter(
      (pessoa) =>
        pessoa.nome
          ?.toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          ) ||
        pessoa.telefone
          ?.toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )
    );

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar pessoa..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(e.target.value)
        }
        className="
          mb-5
          w-full
          max-w-md
          rounded-xl
          border
          border-stone-300
          bg-white
          px-4
          py-3
        "
      />

      <div className="overflow-hidden rounded-3xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-4 text-left text-xs uppercase">
                Nome
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Telefone
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                Cidade
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase">
                E-mail
              </th>

              <th className="px-5 py-4 text-center text-xs uppercase">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {pessoasFiltradas.map(
              (pessoa) => (
                <tr
                  key={pessoa.id}
                  className="border-b"
                >
                  <td className="px-5 py-4">
                    {pessoa.nome}
                  </td>

                  <td className="px-5 py-4">
                    {pessoa.telefone}
                  </td>

                  <td className="px-5 py-4">
                    {pessoa.cidade}
                  </td>

                  <td className="px-5 py-4">
                    {pessoa.email}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-3">
                      {pessoa.editar}

                      {pessoa.excluir}
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