"use client";

import { useState } from "react";

import { ProdutoModal } from "@/components/produtos/produto-modal";

export default function ProdutosClient() {
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
        + Novo Produto
      </button>

      <ProdutoModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}