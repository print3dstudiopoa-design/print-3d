"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { DespesaModal } from "./despesa-modal";

interface Props {
  despesa: {
    id: string;
    codigo: number;
    descricao: string;
    valor: number;
    data: string;
    observacao: string | null;
    categoria: string;
  };
}

export function EditarDespesa({
  despesa,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => {
          console.log("clicou editar");
          setOpen(true);
        }}
      >
        <Pencil
          size={16}
          className="
            text-stone-500
            hover:text-orange-700
          "
        />
      </button>

      <DespesaModal
        open={open}
        onClose={() => setOpen(false)}
        despesa={despesa}
      />
    </>
  );
}