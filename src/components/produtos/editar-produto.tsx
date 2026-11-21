"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { ProdutoModal } from "./produto-modal";

interface Props {
  produto: {
    id: string;
    codigo: number;
    nome: string;
    tempoEstimadoMinutos: number;
    filamentoGramas: number;
    corPadrao: string | null;
    valorPadrao: number;
    observacao: string | null;
  };
}

export function EditarProduto({
  produto,
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

      <ProdutoModal
        open={open}
        onClose={() => setOpen(false)}
        produto={produto}
      />
    </>
  );
}