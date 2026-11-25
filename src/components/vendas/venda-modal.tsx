"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;

  produtos: {
    id: string;
    nome: string;
    valor: number;
  }[];
}

export function VendaModal({
  open,
  onClose,
  produtos,
}: Props) {

  const [cliente, setCliente] =
    useState("");

  const [
    formaPagamento,
    setFormaPagamento,
  ] = useState("PIX");

  const [produtoId, setProdutoId] =
    useState("");

  const [quantidade, setQuantidade] =
    useState(1);

  const [itens, setItens] =
    useState<ItemVenda[]>([]);

  type ItemVenda = {
    produtoId: string;
    nome: string;

    quantidade: number;

    valorUnitario: number;
    valorTotal: number;
    };  

  const produtoSelecionado =
    produtos.find(
      (produto) =>
        produto.id === produtoId
    );

  const valorUnitario =
    produtoSelecionado?.valor ?? 0;

  const valorLinha =
    valorUnitario * quantidade;

  const totalPedido =
    itens.reduce(
      (total, item) =>
        total + item.valorTotal,
      0
    );

  function adicionarItem() {

    if (!produtoSelecionado)
      return;

    setItens([
      ...itens,
      {
        produtoId:
          produtoSelecionado.id,

        nome:
          produtoSelecionado.nome,

        quantidade,

        valorUnitario,

        valorTotal:
          valorLinha,
      },
    ]);

    setProdutoId("");
    setQuantidade(1);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="!max-w-[1100px] w-[95vw]">

        <DialogHeader>

          <DialogTitle>
            Nova Venda
          </DialogTitle>

        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">

            <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Data do Pedido
                </label>

                <input
                type="date"
                className="w-full rounded-xl border p-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Cliente
                </label>

                <input
                value={cliente}
                onChange={(e) =>
                    setCliente(e.target.value)
                }
                className="w-full rounded-xl border p-3"
                placeholder="Nome do cliente"
                />
            </div>

        </div>
        
        <div className="mt-6 rounded-xl border p-4">

            <h3 className="mb-4 font-semibold">
                ITENS:
            </h3>

            <div className="grid grid-cols-12 gap-3">

                <div className="col-span-5">

                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Produto
                </label>

                <select
                    value={produtoId}
                    onChange={(e) =>
                    setProdutoId(e.target.value)
                    }
                    className="w-full rounded-xl border p-2"
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

                <div className="col-span-1">

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-center text-stone-500">
                        QTD
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
                        className="w-full rounded-xl border p-2 text-center"
                    />

                </div>

                <div className="col-span-2">

                    <label className="mb-2 block text-xs font-semibold uppercase text-center tracking-wider text-stone-500">
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
                        className="w-full rounded-xl border p-2 bg-stone-50 text-center"
                    />

                </div>

                <div className="col-span-2">

                    <label className="mb-2 block text-xs text-center font-semibold uppercase tracking-wider text-stone-500">
                    Valor Total da Linha
                    </label>

                    <input
                    disabled
                    value={`R$ ${valorLinha.toLocaleString(
                        "pt-BR",
                        {
                        minimumFractionDigits: 2,
                        }
                    )}`}
                    className="rounded-xl border bg-stone-50 p-2 text-center"
                    />

                </div>
                
                <div className="col-span-2">
                    <button
                        type="button"
                        onClick={adicionarItem}
                        className="
                        rounded-xl
                        bg-orange-700
                        px-3
                        py-4
                        mt-4
                        text-white
                        "
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
       

        <div className="mt-6">

            <div className="mb-2 grid grid-cols-12 gap-2 border-b pb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">

                <div className="col-span-5">
                Produto
                </div>

                <div className="col-span-2 text-center">
                Qtd
                </div>

                <div className="col-span-2 text-center">
                Unitário
                </div>

                <div className="col-span-2 text-center">
                Total
                </div>

                <div className="col-span-1 text-center">
                Ação
                </div>

            </div>

            <div className="max-h-[220px] overflow-y-auto">

                {itens.length === 0 ? (

                    <div className="py-6 text-center text-sm text-stone-500">
                    Nenhum produto adicionado.
                    </div>

                ) : (

                    itens.map((item, index) => (

                    <div
                        key={index}
                        className="
                        grid
                        grid-cols-12
                        items-center
                        gap-2
                        border-b
                        py-2
                        "
                    >

                        <div className="col-span-5">
                        {item.nome}
                        </div>

                        <div className="col-span-2 text-center">
                        {item.quantidade}
                        </div>

                        <div className="col-span-2 text-center">

                        R$ {item.valorUnitario.toLocaleString(
                            "pt-BR",
                            {
                            minimumFractionDigits: 2,
                            }
                        )}

                        </div>

                        <div className="col-span-2 text-center">

                        R$ {item.valorTotal.toLocaleString(
                            "pt-BR",
                            {
                            minimumFractionDigits: 2,
                            }
                        )}

                        </div>

                        <div className="col-span-1 text-center">

                        <button
                            type="button"
                            onClick={() =>
                            setItens(
                                itens.filter(
                                (_, i) =>
                                    i !== index
                                )
                            )
                            }
                            className="
                            text-stone-500
                            hover:text-red-600
                            "
                        >
                            🗑
                        </button>

                        </div>

                    </div>

                    ))

                )}

            </div>

        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">

            <div>

                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Forma de Pagamento
                </label>

                <select
                    value={formaPagamento}
                    onChange={(e) =>
                        setFormaPagamento(
                        e.target.value
                        )
                    }
                    className="w-full rounded-xl border p-3"
                    >
                    <option value="PIX">
                        PIX
                    </option>

                    <option value="DINHEIRO">
                        Dinheiro
                    </option>

                    <option value="CARTAO_DEBITO">
                        Cartão Débito
                    </option>

                    <option value="CARTAO_CREDITO">
                        Cartão Crédito
                    </option>
                </select>

            </div>

            <div>

                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Data de Entrega
                </label>

                <input
                type="date"
                className="w-full rounded-xl border p-3"
                />

            </div>

        </div>

        <div className="mt-4">

            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Observação
            </label>

            <textarea
                rows={2}
                className="w-full rounded-xl border p-3"
            />

            </div>

        <div className="mt-6 flex justify-end">

            <div className="rounded-2xl bg-stone-100 px-6 py-4 text-right">

                <div className="text-xs uppercase tracking-wider text-stone-500">
                Total do Pedido
                </div>

                <div className="mt-2 text-3xl font-bold">

                R$ {totalPedido.toLocaleString(
                    "pt-BR",
                    {
                    minimumFractionDigits: 2,
                    }
                )}

                </div>

            </div>

        </div>

        <div className="mt-6 flex justify-end gap-4">

            <button
                onClick={onClose}
            >
                Cancelar
            </button>

            <button
                className="
                rounded-xl
                bg-orange-700
                px-5
                py-2
                text-white
                "
            >
                Salvar
            </button>

            </div>

      </DialogContent>

    </Dialog>
  );
}