"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { PessoaModal } from "./pessoa-modal";

interface Props {
  pessoa: {
    id: string;
    nome: string;
    telefone: string | null;
    email: string | null;
    cidade: string | null;
    bairro: string | null;
    cpf: string | null;
    observacao: string | null;
  };
}

export function EditarPessoa({
  pessoa,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
      >
        <Pencil
          size={16}
          className="
            text-stone-500
            hover:text-orange-700
          "
        />
      </button>

      <PessoaModal
        open={open}
        onClose={() => setOpen(false)}
        pessoa={pessoa}
      />
    </>
  );
}
