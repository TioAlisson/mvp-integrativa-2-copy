export type Prioridade = 'alta' | 'media' | 'baixa' | 'não definida';
export type Status =
  | 'nao iniciado'
  | 'em andamento'
  | 'em espera'
  | 'revisao'
  | 'concluido'
  | 'cancelado'
  | 'não definido';

export interface Process {
  id: string;
  titulo: string;
  descricao?: string;
  autor?: string;
  prioridade: Prioridade;
  status: Status;
  data_inicio?: string | null;
  data_fim?: string | null; 
}

// CORREÇÃO: Renomeado de 'ProcesssInput' para 'ProcessInput'
// CORREÇÃO: Tipos de prioridade e status agora usam os tipos literais
export type ProcessInput = Omit<Partial<Process>, 'id'> & {
  titulo: string;
  prioridade?: Prioridade; // Usar o tipo Prioridade
  status?: Status;       // Usar o tipo Status
};