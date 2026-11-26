"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";


interface Props {
  open: boolean;
  onClose: () => void;

  produtos: {
    id: string;
    nome: string;
    valor: number;
  }[];

  pessoas: {
    id: string;
    nome: string;
  }[];

  venda?: {
    id: string;
    cliente: string;
    formaPagamento: string;
    observacao: string | null;
  };
}

export function VendaModal({
  open,
  onClose,
  produtos,
  pessoas,
  venda,
}: Props) {

    const [pessoaId, setPessoaId] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [formaPagamento, setFormaPagamento,] = useState("PIX");
    const [produtoId, setProdutoId] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [itens, setItens] = useState<ItemVenda[]>([]);
    const [dataVenda, setDataVenda] = useState(new Date().toISOString().split("T")[0]);
    const [observacao, setObservacao] = useState("");
    const router = useRouter();

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

  async function salvarVenda() {
    setSalvando(true);

    if (!pessoaId) {
        alert("Informe o cliente.");
        return;
    }

    if (!dataVenda) {
        alert("Informe a data da venda.");
        return;
    }

    if (itens.length === 0) {
        alert("Adicione pelo menos um item.");
        return;
    }

    const pessoaSelecionada =
        pessoas.find(
        (pessoa) =>
            pessoa.id === pessoaId
        );


    const url = venda
        ? `/api/vendas/${venda.id}`
        : "/api/vendas";

        const method = venda
        ? "PUT"
        : "POST";

        const response = await fetch(
        url,
        {
            method,

        headers: {
            "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
            dataVenda,
            cliente: pessoaSelecionada?.nome,
            formaPagamento,
            observacao,

            valorTotal:
            totalPedido,

            itens,
        }),
        }
    );

    if (response.ok) {
        setDataVenda(
            new Date()
                .toISOString()
                .split("T")[0]
            );
        setFormaPagamento("PIX");
        setProdutoId("");
        setQuantidade(1);
        setItens([]);
        setObservacao("");
        setSalvando(false);
        onClose();

        router.refresh();
        }
        else {
            alert(
                "Erro ao salvar a venda."
            );
            setSalvando(false);
        }
        setSalvando(false);
    }

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="!max-w-[1100px] w-[95vw]">

        <DialogHeader>

          <DialogTitle className="mb-0 block text-lx font-bold uppercase text-stone-500">
            {venda
                ? "Editar Venda"
                : "Nova Venda"}
            </DialogTitle>

        </DialogHeader>

        <div className="grid grid-cols-15 gap-2">

            <div className="col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Data da Venda
                </label>

                <input
                    type="date"
                    value={dataVenda}
                    onChange={(e) =>
                        setDataVenda(e.target.value)
                    }
                    className="w-full rounded-xl border p-3"
                />
            </div>

            <div className="col-span-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Cliente
                </label>

                <select
                    value={pessoaId}
                    onChange={(e) =>
                        setPessoaId(e.target.value)
                    }
                    className="w-full rounded-xl border p-3"
                    >

                    <option value="">
                        Selecione o cliente
                    </option>

                    {pessoas.map((pessoa) => (

                        <option
                        key={pessoa.id}
                        value={pessoa.id}
                        >
                        {pessoa.nome}
                        </option>

                    ))}

                    </select>
            </div>

            <div className="col-span-3">

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

            <div className="rounded-2xl justify-end bg-stone-100 px-4 py-2 text-right col-span-5">

                <div className="text-xs uppercase tracking-wider text-stone-500">
                Total do Pedido
                </div>

                <div className="mt-0 text-2xl font-bold">

                R$ {totalPedido.toLocaleString(
                    "pt-BR",
                    {
                    minimumFractionDigits: 2,
                    }
                )}

                </div>

            </div>

        </div>
        
        <div className="mt-0 rounded-xl border p-2">

            <h3 className="mb-1 font-semibold">
                ITENS:
            </h3>

            <div className="grid grid-cols-12 gap-4">

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
                
                <div className="col-span-2 gap-4 flex justify-end w-full">
                    <button
                        type="button"
                        onClick={adicionarItem}
                        className="
                            rounded-xl
                            bg-orange-700
                            px-1
                            py-1
                            mt-6
                            text-white
                            w-full
                            "
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
       

        <div className="rounded-xl border p-2">

            <div className="mb-2 grid grid-cols-12 gap-2 border-b pb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">

                <div className="col-span-5">
                Produto(s) Selecionado(s)
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

                    <div className="py-0 text-center text-sm text-stone-500">
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
                        py-1
                        px-2
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

        <div className="mt-0">

            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Observação
            </label>

            <textarea
                rows={1}
                value={observacao}
                onChange={(e) =>
                    setObservacao(e.target.value)
                }
                className="w-full rounded-xl border p-3"
            />
        </div>

        <div className="mt-0 flex justify-end gap-4">

            <button
                onClick={onClose}
            >
                Cancelar
            </button>

            <button
              onClick={salvarVenda}
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

      </DialogContent>

    </Dialog>
  );
}