"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Pessoa {
  id: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  cidade: string | null;
  bairro: string | null;
  cpf: string | null;
  observacao: string | null;
}

interface PessoaModalProps {
  open: boolean;
  onClose: () => void;
  pessoa?: Pessoa;
}

export function PessoaModal({
  open,
  onClose,
  pessoa,
}: PessoaModalProps) {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [cpf, setCpf] = useState("");
  const [observacao, setObservacao] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (pessoa) {
      setNome(pessoa.nome ?? "");
      setTelefone(pessoa.telefone ?? "");
      setEmail(pessoa.email ?? "");
      setCidade(pessoa.cidade ?? "");
      setBairro(pessoa.bairro ?? "");
      setCpf(pessoa.cpf ?? "");
      setObservacao(pessoa.observacao ?? "");
    } else {
      setNome("");
      setTelefone("");
      setEmail("");
      setCidade("");
      setBairro("");
      setCpf("");
      setObservacao("");
    }
  }, [pessoa, open]);

  async function salvarPessoa() {

    setSalvando(true);

    const url = pessoa
      ? `/api/pessoas/${pessoa.id}`
      : "/api/pessoas";

    const metodo = pessoa
      ? "PUT"
      : "POST";

    const response = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        nome,
        telefone,
        email,
        cidade,
        bairro,
        cpf,
        observacao,
      }),
    });

    if (response.ok) {
      onClose();
      router.refresh();
      setSalvando(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="!w-[70vw] !max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-2 block text-lx font-bold uppercase text-stone-500">
            {pessoa
              ? "Editar Pessoa"
              : "Nova Pessoa"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-1 ">
          <div  className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Nome
            </label>

            <input
                value={nome}
                onChange={(e) =>
                    setNome(e.target.value.toUpperCase())
                }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
              <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                CPF
              </label>

              <input
                value={cpf}
                onChange={(e) =>
                  setCpf(e.target.value)
                }
                className="w-full rounded-xl border p-3"
              />
          </div>
        </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Telefone
              </label>

              <input
                value={telefone}
                onChange={(e) =>
                  setTelefone(e.target.value)
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-0 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                E-mail
              </label>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

          </div>         

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Cidade
              </label>

              <input
                value={cidade}
                onChange={(e) =>
                  setCidade(e.target.value.toUpperCase())
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Bairro
              </label>

              <input
                value={bairro}
                onChange={(e) =>
                  setBairro(e.target.value.toUpperCase())
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Observação
            </label>

            <textarea
              rows={2}
              value={observacao}
              onChange={(e) =>
                setObservacao(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="px-4 py-2"
            >
              Cancelar
            </button>


            <button
              onClick={salvarPessoa}
              disabled={salvando}
              className="
                rounded-xl
                bg-orange-700
                px-5
                py-2
                text-white
                disabled:opacity-60
              "
            >
              {salvando
                ? "Salvando..."
                : "Salvar"}
            </button>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}