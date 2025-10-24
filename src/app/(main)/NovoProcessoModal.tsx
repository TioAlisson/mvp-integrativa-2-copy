// components/NovoProcessoModal.tsx
'use client';

import { useState, FormEvent } from 'react';
import Plus from '../components/icons/Plus';

type Passo = {
  titulo: string;
  detalhe: string;
};

// Props que o modal vai aceitar
type NovoProcessoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const mockCategorias = [
  {
    id: 1,
    name: 'Informática',
    subcategories: [
      { id: 10, name: 'Redes' },
      { id: 11, name: 'Dev' }
    ]
  },
  {
    id: 2,
    name: 'Administração',
    subcategories: [
      { id: 20, name: 'Gestão' }
    ]
  }
];
// --- Fim dos Dados Fictícios ---


export default function NovoProcessoModal({ isOpen, onClose }: NovoProcessoModalProps) {
  
  // Estado para os passos dinâmicos
  const [passos, setPassos] = useState<Partial<Passo>[]>([
    { titulo: '', detalhe: '' } // Começa com um passo vazio
  ]);

  // --- Funções para gerenciar os passos (Puro React) ---
  
  const handleStepChange = (index: number, field: 'titulo' | 'detalhe', value: string) => {
    const newPassos = [...passos];
    newPassos[index] = { ...newPassos[index], [field]: value };
    setPassos(newPassos);
  };

  const addStep = () => {
    setPassos([...passos, { titulo: '', detalhe: '' }]);
  };

  const removeStep = (index: number) => {
    // Não permite remover o último passo
    if (passos.length <= 1) return;
    const newPassos = passos.filter((_, i) => i !== index);
    setPassos(newPassos);
  };

  // --- Função de Envio do Formulário (Teste Front-end) ---
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Apenas para teste: Coleta os dados e exibe no console
    const formData = new FormData(event.currentTarget);
    const data = {
      titulo: formData.get('titulo'),
      descricao: formData.get('descricao'),
      subcategoria_id: formData.get('subcategoria_id'),
      responsavel: formData.get('responsavel'),
      ferramentas_usadas: formData.get('ferramentas_usadas'),
      passos: passos // Adiciona o array de passos do estado
    };

    console.log("--- DADOS DO FORMULÁRIO (FRONT-END) ---", data);
    alert('Formulário enviado! Verifique o console (F12).');
    
    // Limpa e fecha o modal
    onClose();
    setPassos([{ titulo: '', detalhe: '' }]);
    (event.target as HTMLFormElement).reset();
  };

  // Não renderiza nada se o modal estiver fechado
  if (!isOpen) {
    return null;
  }

  // --- O JSX do Modal (Estilizado com Tailwind) ---
  return (
    // Overlay (fundo escuro)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose} // Fecha o modal ao clicar no fundo
    >
      {/* Conteúdo do Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar dentro
      >
        {/* Botão de Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
        >
          <Plus width={18} /> 
        </button>

        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Cadastrar Novo Processo</h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Título */}
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="font-semibold text-zinc-700">Título do Processo</label>
            <input type="text" id="titulo" name="titulo" required className="rounded-lg border-zinc-300 shadow-sm" />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="font-semibold text-zinc-700">Descrição</label>
            <textarea id="descricao" name="descricao" rows={3} className="rounded-lg border-zinc-300 shadow-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Categoria/Subcategoria (com dados fictícios) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subcategoria_id" className="font-semibold text-zinc-700">Categoria</label>
              <select id="subcategoria_id" name="subcategoria_id" required className="rounded-lg border-zinc-300 shadow-sm">
                <option value="" disabled>Selecione...</option>
                {mockCategorias.map(cat => (
                  <optgroup label={cat.name} key={cat.id}>
                    {cat.subcategories.map(sub => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Responsável */}
            <div className="flex flex-col gap-2">
              <label htmlFor="responsavel" className="font-semibold text-zinc-700">Responsável</label>
              <input type="text" id="responsavel" name="responsavel" className="rounded-lg border-zinc-300 shadow-sm" />
            </div>
          </div>

          {/* Ferramentas */}
          <div className="flex flex-col gap-2">
            <label htmlFor="ferramentas_usadas" className="font-semibold text-zinc-700">Ferramentas Usadas</label>
            <input type="text" id="ferramentas_usadas" name="ferramentas_usadas" placeholder="Separe por vírgulas (ex: FortiClient, E-mail)" className="rounded-lg border-zinc-300 shadow-sm" />
          </div>
          
          {/* --- Seção Dinâmica de Passos --- */}
          <fieldset className="rounded-lg border border-zinc-300 p-4">
            <legend className="px-2 font-semibold text-zinc-700">Passo a Passo</legend>
            <div className="space-y-4">
              
              {passos.map((passo, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 p-4 rounded-md bg-zinc-50 border border-zinc-200">
                  <span className="font-bold text-lg text-secondary-500">#{index + 1}</span>
                  <div className="grow space-y-2">
                    <input
                      type="text"
                      placeholder="Título do Passo"
                      value={passo.titulo || ''}
                      onChange={(e) => handleStepChange(index, 'titulo', e.target.value)}
                      required
                      className="w-full rounded-lg border-zinc-300 shadow-sm"
                    />
                    <textarea
                      placeholder="Detalhe do Passo"
                      value={passo.detalhe || ''}
                      onChange={(e) => handleStepChange(index, 'detalhe', e.target.value)}
                      required
                      rows={2}
                      className="w-full rounded-lg border-zinc-300 shadow-sm"
                    />
                  </div>
                  {passos.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeStep(index)}
                      className="shrink-0 text-red-500 hover:text-red-700 self-center"
                      title="Remover Passo"
                    >
                      <Plus width={18} /> 
                    </button>
                  )}
                </div>
              ))}
              
              {/* Botão de Adicionar Passo */}
              <button 
                type="button" 
                onClick={addStep}
                className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-secondary-500 py-3 font-semibold text-secondary-500 transition-all hover:bg-secondary-50"
              >
                <Plus width={18} /> Adicionar Novo Passo
              </button>
            </div>
          </fieldset>

          {/* Botão de Envio */}
          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="w-full lg:w-fit uppercase font-semibold rounded-xl px-8 py-3 text-white bg-secondary-500 shadow-[0_8px_0_0_#4274CC] transition-all ease-in-out duration-500 hover:shadow-[0_4px_0_0_#4274CC] hover:translate-y-2"
            >
              Salvar Processo (Teste)
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}