"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { VendaModal } from "./venda-modal";

type Produto = {
  id: string;
  nome: string;
  valor: number;
};

type Pessoa = {
  id: string;
  nome: string;
};

type Venda = {
  id: string;
  cliente: string;
  formaPagamento: string;
  observacao: string | null;
};

interface Props {
  venda: Venda;

  produtos: Produto[];

  pessoas: Pessoa[];
}

export function EditarVenda({
  venda,
  produtos,
  pessoas,
}: Props) {

  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          text-stone-500
          hover:text-orange-600
        "
      >
        <Pencil size={16} />
      </button>

      <VendaModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        venda={venda}
        produtos={produtos}
        pessoas={pessoas}
      />
    </>
  );
}