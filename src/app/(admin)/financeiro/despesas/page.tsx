import { prisma } from "@/lib/prisma";
import { TabelaDespesas } from "@/components/despesas/tabela-despesa";
import DespesasClient from "./despesa-client";

export const dynamic = "force-dynamic";

export default async function DespesaPage() {
  const despesas =
    await prisma.despesa.findMany({
      orderBy: {
        data: "asc",
      },
    });

  const despesasTela = despesas.map(
  (despesa) => ({
    ...despesa,

    valor: Number(despesa.valor),
    data: despesa.data.toISOString(),
  })
);

  return (
    <div className="mx-auto w-full px-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mt-2 text-5xl font-bold">
            Despesas
          </h1>

          <p className="mt-3 text-stone-500">
            Cadastre as despesas da empresa.
          </p>
        </div>

        <DespesasClient />
      </div>

      <TabelaDespesas
        despesas={despesasTela}
      />
      
    </div>
  );
}