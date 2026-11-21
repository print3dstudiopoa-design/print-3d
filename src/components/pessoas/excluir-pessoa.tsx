"use client";

import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

interface Props {
  id: string;
}

export function ExcluirPessoa({
  id,
}: Props) {
  const router = useRouter();

  async function excluir() {
    const confirmou = window.confirm(
      "Deseja excluir esta pessoa?"
    );

    if (!confirmou) return;

    await fetch(
      `/api/pessoas/${id}`,
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
        className="
          text-stone-500
          hover:text-red-600
        "
      />
    </button>
  );
}