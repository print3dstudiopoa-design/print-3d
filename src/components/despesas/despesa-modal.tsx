"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Despesa {
  id: string;
  codigo: number;
  descricao: string;
  valor: number;
  data: string;
  observacao: string | null;
  categoria: string;
}

interface DespesaModalProps {
  open: boolean;
  onClose: () => void;

  despesa?: Despesa;
}

export function DespesaModal({
  open,
  onClose,
  despesa,
}: DespesaModalProps){

    const router = useRouter();
    const [descricao, setDescricao] = 
      useState(despesa?.descricao ?? "");
    const [valor, setValor] = useState(despesa?.valor?.toString() ?? "" );
    const [observacao, setObservacao] = 
      useState(despesa?.observacao ?? "");
    const [data, setData] = 
      useState(despesa?.data?.split("T")[0] ?? "");
    const [salvando, setSalvando] = useState(false);
    const [categoria, setCategoria] = 
      useState(despesa?.categoria ?? "ADMINISTRATIVO"
);

  useEffect(() => {
    if (despesa) {
      setDescricao(despesa.descricao ?? "");
      setValor(despesa.valor?.toString() ?? "");
      setObservacao(despesa.observacao ?? "");
      setData(despesa.data? despesa.data.split("T")[0]: "");
      setCategoria(despesa.categoria ?? "ADMINISTRATIVO");

    } else {
      setDescricao("");
      setValor("");
      setObservacao("");
      setData("");
      setCategoria("ADMINISTRATIVO");
    }
  }, [despesa, open]);
  
    return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="!w-[90vw] !max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="mb-2 block text-lx font-bold uppercase text-stone-500">
            {despesa
                ? "Editar Despesa"
                : "Nova Despesa"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-4">

            <div className="col-span-2">

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Código
              </label>

              <input
                disabled
                value={
                  despesa
                    ? String(despesa.codigo)
                    : "Automático"
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div className="col-span-10">

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Descrição da Despesa
              </label>

              <input
                value={descricao}
                onChange={(e) =>
                  setDescricao(
                    e.target.value.toUpperCase()
                  )
                }
                className="w-full rounded-xl border p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Valor
              </label>

              <input
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) =>
                  setValor(e.target.value)
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Data Despesa
              </label>

              <input
                type="date"
                value={data}
                onChange={(e) =>
                    setData(e.target.value)
                }
                className="w-full rounded-xl border p-3"
                />
            </div>          

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Categoria
              </label>

              <select
                    value={categoria}
                    onChange={(e) =>
                        setCategoria(
                        e.target.value
                        )
                    }
                    className="w-full rounded-xl border p-3"
                    >
                    <option value="ADMINISTRATIVO">
                        Administrativo
                    </option>

                    <option value="DECORACAO">
                        Decoração
                    </option>

                    <option value="FILAMENTO">
                        Filamento
                    </option>

                    <option value="MANUTENCAO_MAQUINA">
                        Manutenção Máquina
                    </option>

                    <option value="ITENS_TRABALHO">
                        Itens de Trabalho
                    </option>

                    <option value="OUTROS">
                        Outros
                    </option>
                </select>
            </div>
          </div>       

          <div className="gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Observação
              </label>

              <textarea
                  value={observacao}
                  onChange={(e) =>
                      setObservacao(e.target.value)
                  }
                  rows={2}
                  className="w-full rounded-xl border p-3"
                  />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-stone-600"
            >
              Cancelar
            </button>

            <button
              onClick={salvarDespesa}
              disabled={salvando}
              className="
                rounded-xl
                bg-orange-700
                px-5
                py-2
                text-white
                disabled:opacity-60
              "
            >
              {salvando
                ? "Salvando..."
                : "Salvar"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  async function salvarDespesa() {

    setSalvando(true);

    const url = despesa
      ? `/api/despesas/${despesa.id}`
      : "/api/despesas";

    const metodo = despesa
      ? "PUT"
      : "POST";

    const response = await fetch(url, {
      method: metodo,

      headers: {
        "Content-Type":
          "application/json",
      },

    body: JSON.stringify({
      descricao,
      valor: Number(valor),
      data,
      categoria, 
      observacao,
    }),
  });

  if (response.ok) {
    setDescricao("");
    setValor("");
    setObservacao("");
    setData("");
    setCategoria("ADMINISTRATIVO");
    setSalvando(false);
    
    onClose();
    
    router.refresh();
  }
}
}