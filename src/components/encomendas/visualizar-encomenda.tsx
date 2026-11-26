"use client";

import { Eye } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  encomenda: {
    id: string;
    codigo: number;
    cliente: string;
    status: string;
    dataEntrega: Date | null;
    observacao: string | null;

    itens: {
      id: string;
      quantidade: number;

      produto: {
        nome: string;
      };
    }[];
  };
}

export function VisualizarEncomenda({
  encomenda,
}: Props) {

  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        className="
          text-stone-500
          hover:text-blue-600
        "
      >
        <Eye size={16} />
      </button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-w-3xl">

          <DialogHeader>
            <DialogTitle>
              Encomenda #
              {String(
                encomenda.codigo
              ).padStart(3, "0")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <div className="grid gap-4">

                <div className="rounded-xl border p-4">
                    <div className="text-xs uppercase text-stone-500">
                    Cliente
                    </div>

                    <div className="mt-1 font-medium">
                    {encomenda.cliente}
                    </div>
                </div>

                <div className="rounded-xl border p-4">
                    <div className="text-xs uppercase text-stone-500">
                    Status
                    </div>

                    <div className="mt-1 font-medium">
                    {encomenda.status}
                    </div>
                </div>

                </div>

            <div>
              <strong>Data Entrega:</strong>{" "}
              {encomenda.dataEntrega
                ? new Date(
                    encomenda.dataEntrega
                  ).toLocaleDateString(
                    "pt-BR"
                  )
                : "-"}
            </div>

            <div>
              <strong>Observação:</strong>{" "}
              {encomenda.observacao ??
                "-"}
            </div>

            <hr />

            <div>

              <h3 className="font-semibold">
                Itens
              </h3>

              <div className="space-y-2 mt-2">

                {encomenda.itens?.length ? (

                    encomenda.itens.map(
                        (item) => (
                            <div
                                key={item.id}
                                className="
                                    flex
                                    justify-between
                                    rounded-lg
                                    border
                                    px-4
                                    py-2
                                "
                                >
                                <span>
                                    {item.produto.nome}
                                </span>

                                <span>
                                    {item.quantidade}x
                                </span>
                                </div>
                        )
                    )

                    ) : (

                    <div>
                        Nenhum item encontrado.
                    </div>

                    )}

              </div>

            </div>

          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}