"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  id: string;
}

export function ExcluirPessoa({
  id,
}: Props) {
  const router = useRouter();

  async function excluir() {

    await fetch(
      `/api/pessoas/${id}`,
      {
        method: "DELETE",
      }
    );

    router.refresh();
  }

  return (
    <AlertDialog>

      <AlertDialogTrigger>

        <button
          className="
            text-stone-500
            hover:text-red-600
          "
        >
          <Trash2 size={16} />
        </button>

      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Excluir Pessoa
          </AlertDialogTitle>

          <AlertDialogDescription>
            Tem certeza que deseja excluir esta pessoa?
            <br/>
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={excluir}
            className="
              bg-red-600
              hover:bg-red-700
            "
          >
            Excluir
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}