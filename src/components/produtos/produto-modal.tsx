"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Produto {
  id: string;
  codigo: number;
  nome: string;
  tempoEstimadoMinutos: number;
  filamentoGramas: number;
  corPadrao: string | null;
  valorPadrao: number;
  valorCusto: number;
  observacao: string | null;
}

interface ProdutoModalProps {
  open: boolean;
  onClose: () => void;

  produto?: Produto;
}

export function ProdutoModal({
  open,
  onClose,
  produto,
}: ProdutoModalProps){

    const router = useRouter();
    const [nome, setNome] = useState(produto?.nome ?? "");
    const [tempo, setTempo] = useState(produto?.tempoEstimadoMinutos?.toString() ?? "");
    const [cor, setCor] = useState(produto?.corPadrao ?? "");
    const [valor, setValor] = useState(produto?.valorPadrao?.toString() ?? "" );
    const [filamentoGramas, setFilamentoGramas] = useState(produto?.filamentoGramas?.toString() ?? "");
    const [observacao, setObservacao] = useState(produto?.observacao ?? "");
    const [salvando, setSalvando] = useState(false);
    const [valorCusto, setValorCusto] = useState(produto?.valorCusto?.toString() ?? "" );

  useEffect(() => {
    if (produto) {
      setNome(produto.nome ?? "");
      setTempo(
        produto.tempoEstimadoMinutos?.toString() ?? ""
      );
      setFilamentoGramas(
        produto.filamentoGramas?.toString() ?? ""
      );
      setCor(produto.corPadrao ?? "");
      setValor(
        produto.valorPadrao?.toString() ?? ""
      );
      setValorCusto(
        String(produto.valorCusto)
      );
      setObservacao(
        produto.observacao ?? ""
      );
    } else {
      setNome("");
      setTempo("");
      setFilamentoGramas("");
      setCor("");
      setValor("");
      setValorCusto("");
      setObservacao("");
    }
  }, [produto, open]);
  
    return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {produto
                ? "Editar Produto"
                : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Código
              </label>

              <input
                disabled
                value={
                        produto
                            ? String(produto.codigo)
                            : "Automático"
                        }
                className="w-full rounded-xl border p-3"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Nome do Objeto
            </label>

            <input
                value={nome}
                onChange={(e) =>
                    setNome(e.target.value.toUpperCase())
                }
                className="w-full rounded-xl border p-3"
                />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Tempo Estimado (min)
              </label>

              <input
                value={tempo}
                onChange={(e) =>
                    setTempo(e.target.value)
                }
                className="w-full rounded-xl border p-3"
                />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Filamento (g)
              </label>

              <input
                value={filamentoGramas}
                onChange={(e) =>
                    setFilamentoGramas(e.target.value)
                }
                className="w-full rounded-xl border p-3"
                />
            </div>
          </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Valor de Custo
            </label>

            <input
              type="number"
              step="0.01"
              value={valorCusto}
              onChange={(e) =>
                setValorCusto(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>
          <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Valor Padrão (R$)
              </label>

              <input
                value={valor}
                onChange={(e) =>
                    setValor(e.target.value)
                }
                className="w-full rounded-xl border p-3"
                />
          </div>
        </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Cor Padrão
              </label>

              <input
                value={cor}
                onChange={(e) =>
                    setCor(e.target.value.toUpperCase())
                }
                className="w-full rounded-xl border p-3"
                />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Observação
            </label>

            <textarea
                value={observacao}
                onChange={(e) =>
                    setObservacao(e.target.value)
                }
                rows={4}
                className="w-full rounded-xl border p-3"
                />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-stone-600"
            >
              Cancelar
            </button>

            <button
              onClick={salvarProduto}
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

  async function salvarProduto() {

    setSalvando(true);

    const url = produto
      ? `/api/produtos/${produto.id}`
      : "/api/produtos";

    const metodo = produto
      ? "PUT"
      : "POST";

    const response = await fetch(url, {
      method: metodo,

      headers: {
        "Content-Type":
          "application/json",
      },

    body: JSON.stringify({
      nome,

      tempoEstimadoMinutos:
        Number(tempo),

      filamentoGramas:
        Number(filamentoGramas),

      corPadrao: cor,

      valorPadrao:
        Number(valor),

      observacao,
    }),
  });

  if (response.ok) {
    setNome("");
    setTempo("");
    setFilamentoGramas("");
    setCor("");
    setValor("");
    setObservacao("");
    setSalvando(false);
    
    onClose();
    
    router.refresh();
  }
}
}