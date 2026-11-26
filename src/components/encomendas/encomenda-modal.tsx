"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;

  produtos: {
    id: string;
    nome: string;
    valor: number;
    tempo: number;
    filamento: number;
    }[];
}

export function EncomendaModal({
  open,
  onClose,
  produtos,
}: Props) {
  
  const router = useRouter();
  const [salvando, setSalvando] = useState(false);
  const [dataEntrega, setDataEntrega] = useState("");
  const [observacao, setObservacao] = useState("");
  const [nomeCliente, setNomeCliente] =useState("");
  const [telefoneCliente,setTelefoneCliente,] = useState("");
  const dataCadastro = new Date().toLocaleDateString("pt-BR");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [cor1, setCor1] = useState("");

  type ItemEncomenda = {
    produtoId: string;
    nome: string;

    quantidade: number;

    cor1: string;

    valorUnitario: number;
    valorTotal: number;

    tempoUnitario: number;
    tempoTotal: number;

    filamentoUnitario: number;
    filamentoTotal: number;
    };

    const [itens, setItens] = useState<ItemEncomenda[]>([]);

    const produtoSelecionado =
        produtos.find(
            (produto) =>
            produto.id === produtoId
        );

    const valorUnitario =
        produtoSelecionado?.valor ?? 0;

    const valorLinha =
        valorUnitario *
        quantidade;

    const tempoLinha =
        (produtoSelecionado?.tempo ?? 0) *
        quantidade;

    const filamentoLinha =
        (produtoSelecionado?.filamento ?? 0) *
        quantidade;

    const valorTotal = 
        itens.reduce(
        (total, item) =>
            total + (item.valorTotal ?? 0),
        0
        );
    const tempoTotal =
        itens.reduce(
            (total, item) =>
            total + (item.tempoTotal ?? 0),
            0
        );

    const filamentoTotal =
        itens.reduce(
            (total, item) =>
            total + (item.filamentoTotal ?? 0),
            0
        );

    function removerItem(index: number) {
    setItens(
        itens.filter(
        (_, i) => i !== index
        )
    );
    }


  async function salvar() {
    setSalvando(true);

    if (!nomeCliente) {
        alert(
            "Informe o nome do cliente."
        );

        return;
        }

        if (itens.length === 0) {
        alert(
            "Adicione pelo menos um objeto."
        );

        return;
        }

    const response = await fetch(
      "/api/encomendas",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
            nomeCliente,
            telefoneCliente,
            dataEntrega,
            observacao,
            valorTotal,
            itens,
            }),
      }
    );

    if (response.ok) {
        setNomeCliente("");
        setTelefoneCliente("");
        setDataEntrega("");
        setObservacao("");
        setItens([]);

        onClose();

        router.refresh();
    }

    setSalvando(false);
  }

  const horas =
    Math.floor(
        tempoTotal / 60
    );

  const minutos =
    tempoTotal % 60;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="!max-w-[1000px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-2 block text-lx font-bold uppercase text-stone-500">
            Nova Encomenda
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
            <div className="grid grid-cols-5 gap-4 mt-2">
                <div className="col-span-2">
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                        Nome do Cliente
                    </label>

                    <input
                        value={nomeCliente}
                        onChange={(e) =>
                        setNomeCliente(
                            e.target.value.toUpperCase()
                        )
                        }
                        className="w-full rounded-xl border p-2"
                    />
                </div>

                <div>
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                        Telefone
                    </label>

                    <input
                        value={telefoneCliente}
                        onChange={(e) =>
                        setTelefoneCliente(
                            e.target.value
                        )
                        }
                        className="w-full rounded-xl border p-2"
                    />
                </div>

                <div>
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Situação
                    </label>

                    <input
                    disabled
                    value="EM FILA"
                    className="w-full rounded-xl border p-2 bg-stone-50"
                    />
                </div>

                <div>
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Data Entrega
                    </label>

                    <input
                    type="date"
                    value={dataEntrega}
                    onChange={(e) =>
                        setDataEntrega(e.target.value)
                    }
                    className="w-full rounded-xl border p-2"
                    />
                </div>
            </div>            

        <div className="rounded-xl border border-stone-200 p-2 mt-2">

            <div className="mb-1">
                <h3 className="font-semibold">
                    Objetos Solicitados
                </h3>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-0">

                <div className="col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Produto
                    </label>

                    <select
                        value={produtoId}
                        onChange={(e) =>
                            setProdutoId(e.target.value)
                        }
                        className="w-full rounded-xl border p-3"
                    >
                        <option value="">
                            Selecione
                        </option>

                        {produtos.map((produto) => (
                            <option
                            key={produto.id}
                            value={produto.id}
                            >
                            {produto.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1 col-span-1 block text-xs font-semibold text-center uppercase tracking-wider text-stone-500">
                    Qtd
                    </label>

                    <input
                    type="number"
                    min="1"
                    value={quantidade}
                    onChange={(e) =>
                        setQuantidade(
                        Number(e.target.value)
                        )
                    }
                    className="w-full rounded-xl border p-3 text-center"
                    />
                </div>

                <div>
                    <label className="mb-1 col-span-1 block text-xs font-semibold text-center uppercase tracking-wider text-stone-500">
                    Cor
                    </label>

                    <input
                        placeholder="Cor principal"
                        value={cor1}
                        onChange={(e) =>
                        setCor1(
                            e.target.value.toUpperCase()
                        )
                        }
                        className="rounded-xl border p-3"
                    />
                </div>
            </div>

            {produtoSelecionado && (

                <div className="mt-1 grid grid-cols-4 gap-4">

                    <div>
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                        Tempo Estimado
                    </label>

                    <input
                        disabled
                        value={`${tempoLinha} min`}
                        className="w-full rounded-xl border text-center p-2 bg-stone-50"
                    />
                    </div>

                    <div>
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                        Filamento
                    </label>

                    <input
                        disabled
                        value={`${filamentoLinha} g`}
                        className="w-full rounded-xl border text-center p-2 bg-stone-50"
                    />
                    </div>

                    <div>
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                        Valor Unitário
                    </label>

                    <input
                        disabled
                        value={`R$ ${valorUnitario.toLocaleString(
                        "pt-BR",
                        {
                            minimumFractionDigits: 2,
                        }
                        )}`}
                        className="w-full rounded-xl border text-center p-2 bg-stone-50"
                    />
                    </div>

                    <div>
                    <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                        Valor Total
                    </label>

                    <input
                        disabled
                        value={`R$ ${valorLinha.toLocaleString(
                        "pt-BR",
                        {
                            minimumFractionDigits: 2,
                        }
                        )}`}
                        className="w-full rounded-xl border text-center p-2 bg-stone-50 font-semibold"
                    />
                    </div>

                </div>

                )}

            <div className="mt-1 grid grid-cols-1 gap-3 flex justify-end w-full">

                <button
                    type="button"
                    onClick={() => {
                        if (!produtoSelecionado) {
                        return;
                        }

                        setItens([
                            ...itens,
                            {
                                produtoId:
                                produtoSelecionado.id,

                                nome:
                                produtoSelecionado.nome,

                                quantidade,

                                cor1,

                                valorUnitario:
                                produtoSelecionado.valor,

                                valorTotal:
                                valorLinha,

                                tempoUnitario:
                                produtoSelecionado.tempo,

                                tempoTotal:
                                tempoLinha,

                                filamentoUnitario:
                                produtoSelecionado.filamento,

                                filamentoTotal:
                                filamentoLinha,
                            },
                            ]);

                        setProdutoId("");
                        setQuantidade(1);

                        setCor1("");
                    }}
                    className="
                        rounded-xl
                        bg-orange-700
                        px-5
                        py-2
                        text-white
                    "
                    >
                    Adicionar
                </button>

            </div>

            <div className="mt-4 max-h-[220px] overflow-y-auto">

                <div className="mb-2 grid grid-cols-12 gap-1 border-b pb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">

                    <div className="col-span-3">
                        Produto
                    </div>

                    <div className="col-span-1 text-center">
                        Qtd
                    </div>

                    <div className="col-span-2 text-center">
                        Tempo
                    </div>

                    <div className="col-span-1 text-center">
                        Filam.
                    </div>

                    <div className="col-span-2 text-center">
                        Valor
                    </div>

                    <div className="col-span-2">
                        Cor
                    </div>

                    <div className="col-span-1 text-center">
                        Ação
                    </div>

                </div>

                {itens.map(
                    (item, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-12 items-center gap-1 border-b mt-1 py-0 p-1"
                    >

                        <div className="col-span-3">
                            {item.nome}
                        </div>

                        <div className="col-span-1 text-center">
                            {item.quantidade}
                        </div>

                        <div className="col-span-2 text-center">
                            {item.tempoTotal} min
                        </div>

                        <div className="col-span-1 text-center">
                            {item.filamentoTotal} g
                        </div>

                        <div className="col-span-2 text-center">
                            R${" "}
                                {item.valorTotal.toLocaleString("pt-BR",{minimumFractionDigits: 2,})}
                        </div>

                        <div className="col-span-2">
                            {item.cor1 || "-"}
                        </div>

                        <div className="col-span-1 text-center">

                            <button
                                type="button"
                                onClick={() =>
                                    removerItem(index)
                                }
                                className="text-stone-500 hover:text-red-600">
                                    🗑
                            </button>

                        </div>

                        </div>

                    )
                )}

            </div>
        </div>
        
        <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500 mt-3">
                Observação
            </label>

            <textarea
                rows={1}
                value={observacao}
                onChange={(e) =>
                setObservacao(
                    e.target.value
                )
                }
                className="w-full rounded-xl border p-3"
            />
        </div>

        <div>

        <div className="flex justify-center">

            <div className="grid grid-cols-3 gap-4 mt-0">

                <div className="rounded-2xl bg-stone-100 p-2 text-center">

                    <div className="text-xs uppercase tracking-wider text-stone-500">
                    Tempo Total
                    </div>

                    <div className="mt-1 text-2xl font-bold">
                    {horas}h {minutos}min
                    </div>

                </div>

                <div className="rounded-2xl bg-stone-100 p-2 text-center">

                    <div className="text-xs uppercase tracking-wider text-stone-500">
                    Filamento Total
                    </div>

                    <div className="mt-2 text-2xl font-bold">
                    {filamentoTotal} g
                    </div>

                </div>

                <div className="rounded-2xl bg-stone-100 p-2 text-center">

                    <div className="text-xs uppercase tracking-wider text-stone-500">
                    Valor Total
                    </div>

                    <div className="mt-2 text-2xl font-bold">
                    R$ {valorTotal.toLocaleString(
                        "pt-BR",
                        {
                        minimumFractionDigits: 2,
                        }
                    )}
                    </div>

                </div>

            </div>

        </div>

        <div className="flex justify-end gap-4 mt-0">

            <button
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              onClick={salvar}
              disabled={salvando}
              className="
                rounded-xl
                bg-orange-700
                px-5
                py-2
                text-white
              "
            >
              {salvando
                ? "Salvando..."
                : "Salvar"}
            </button>

          </div>

        </div>

    </div>

    </DialogContent>
    </Dialog>
    
  );
}