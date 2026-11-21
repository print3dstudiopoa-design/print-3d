export interface Produto {
  id: string;

  codigo: number;

  nome: string;

  tempoEstimado: number;

  filamentoGramas: number | null;

  corPadrao: string | null;

  observacao: string | null;

  valorPadrao: number | null;

  createdAt: Date;

  updatedAt: Date;
}