export interface Processo {
  id: string;
  titulo: string;
  descricao: string;
  subCategoria: string;
  status: 'Ativo' | 'Em Análise' | 'Obsoleto';
  responsavel: string;
  ultimaAtualizacao: string;
  setor: string;
  ferramentasUsadas: string[];
  passoAPasso: {
    titulo: string;
    detalhe: string;
  }[];
  preRequisitos?: string[];
  linksUteis?: { nome: string; url: string }[];
  palavrasChave?: string[];
  publicoAlvo?: string[];
}
