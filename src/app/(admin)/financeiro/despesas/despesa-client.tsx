"use client";
import { useState } from "react";
import { DespesaModal } from "@/components/despesas/despesa-modal";

export default function DespesasClient() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-orange-700 px-6 py-3 text-white hover:bg-orange-800">
        + Nova Despesa
      </button>

      <DespesaModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}