"use client";

import { useState } from "react";

import { VendaModal } from "@/components/vendas/venda-modal";

interface Produto {
  id: string;
  nome: string;
  valor: number;
}

interface Props {
  produtos: Produto[];
}

export default function VendasClient({
  produtos,
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
          rounded-full
          bg-orange-700
          px-6
          py-3
          text-white
        "
      >
        + Nova Venda
      </button>

      <VendaModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        produtos={produtos}
      />
    </>
  );
}