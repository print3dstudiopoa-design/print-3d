"use client";

import { useState } from "react";
import { EncomendaModal } from "@/components/encomendas/encomenda-modal";

interface Props {
  produtos: Produto[];
}

interface Produto {
  id: string;
  nome: string;
  valor: number;
  tempo: number;
  filamento: number;
}

export default function EncomendasClient({
  produtos,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          rounded-full
          bg-orange-700
          px-6
          py-3
          text-white
        "
      >
        + Nova Encomenda
      </button>

      <EncomendaModal
        open={open}
        onClose={() => setOpen(false)}
        produtos={produtos}
      />
    </>
  );

}