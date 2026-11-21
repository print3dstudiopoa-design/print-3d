import { prisma } from "@/lib/prisma";
import PessoasClient from "./pessoas-client";
import { EditarPessoa } from "@/components/pessoas/editar-pessoa";
import { ExcluirPessoa } from "@/components/pessoas/excluir-pessoa";
import { TabelaPessoas } from "@/components/pessoas/tabela-pessoas";

export const dynamic = "force-dynamic";

export default async function PessoasPage() {
  const pessoas =
    await prisma.pessoa.findMany({
      orderBy: {
        nome: "asc",
      },
    });

  const pessoasTela = pessoas.map(
  (pessoa) => ({
    ...pessoa,

    editar: (
      <EditarPessoa
        pessoa={pessoa}
      />
    ),

    excluir: (
      <ExcluirPessoa
        id={pessoa.id}
      />
    ),
  })
);

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Clientes
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            Pessoas
          </h1>

          <p className="mt-3 text-stone-500">
            Cadastro de clientes e
            contatos.
          </p>
        </div>

        <PessoasClient />
      </div>

      <TabelaPessoas
        pessoas={pessoasTela}
      />
      
    </div>
  );
}