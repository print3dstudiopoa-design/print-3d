"use client";

import { useState } from "react";

import { PessoaModal } from "@/components/pessoas/pessoa-modal";

export default function PessoasClient() {
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
          hover:bg-orange-800
        "
      >
        + Nova Pessoa
      </button>

      <PessoaModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}