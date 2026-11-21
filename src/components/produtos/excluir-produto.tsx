"use client";

import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

interface Props {
  id: string;
}

export function ExcluirProduto({
  id,
}: Props) {
  const router = useRouter();

  async function excluir() {
    const confirmar = window.confirm(
      "Deseja excluir este produto?"
    );

    if (!confirmar) return;

    await fetch(
      `/api/produtos/${id}`,
      {
        method: "DELETE",
      }
    );

    router.refresh();
  }

  return (
    <button onClick={excluir}>
      <Trash2
        size={16}
        className="text-stone-500 hover:text-red-600"
      />
    </button>
  );
}