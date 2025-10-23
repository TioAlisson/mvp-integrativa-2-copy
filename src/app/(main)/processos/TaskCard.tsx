'use client'

import Plus from '@/app/components/icons/Plus';

import type { Processo } from '@/types/processo';

interface ProcessCardProps {
  processo: Processo;
  isExpanded: boolean; 
  onToggleExpand: () => void; 
}

export default function ProcessCard({ 
  processo, 
  isExpanded,     
  onToggleExpand   
}: ProcessCardProps) {
  const {
    titulo,
    descricao,
    responsavel,
    ultimaAtualizacao,
    subCategoria,
    setor,
    ferramentasUsadas,
    passoAPasso,
  } = processo;

  const dataFormatada = new Date(ultimaAtualizacao).toLocaleDateString('pt-BR');
  return (
    <div className="flex flex-col shadow-[1px_1px_10px_rgba(0,0,0,0.15)] rounded-xl">
      <div className="p-6 rounded-b-xl flex flex-col grow">
        <div className="grow">
          <div className="flex justify-between flex-wrap gap-2 mb-3">
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-semibold">
              {subCategoria}
            </span>

            <button
              onClick={onToggleExpand} 
              className={`transition-transform duration-300 ease-in-out cursor-pointer ${isExpanded ? 'rotate-45' : 'rotate-0'
                }`}
              aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}
            >
              <Plus width={14} />
            </button>
          </div>

          <h1 className="font-bold text-xl text-black mt-4 mb-3 min-h-[60px] line-clamp-2">{titulo}</h1>

          <h2
            className={`mb-4 text-gray-700 overflow-hidden transition-all duration-1000 ease-in-out 
            ${!isExpanded ? 'max-h-12 opacity-100 line-clamp-2' : 'max-h-[600px] opacity-100 pt-1'}`}
          >
            {descricao}
          </h2>

          <div className="text-sm mb-4 text-gray-600">
            {passoAPasso.length > 0 && (
              <span className={`block ${!isExpanded ? 'truncate' : ''}`}>
                <span className="text-secondary-500 font-semibold">
                  Passo 1
                </span>{' '}: {passoAPasso[0].titulo}
                {passoAPasso[0].detalhe && ` - ${passoAPasso[0].detalhe}`}
              </span>
            )}

            <div
              className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[600px] opacity-100 pt-1' : 'max-h-0 opacity-0'
                }`}
            >
              {passoAPasso.slice(1).map((passo, index) => (
                <span key={index} className="block my-2">
                  <span className="text-secondary-500 font-semibold">
                    Passo {index + 2}:
                  </span>{' '}: {passo.titulo}
                  {passo.detalhe && ` - ${passo.detalhe}`}
                </span>
              ))}
            </div>
          </div>

          <h3 className="mb-2 text-sm">
            Responsável: <span className="font-medium">{responsavel}</span>
          </h3>

          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-800">
              Ferramentas:
            </h4>
            <p
              className={`text-sm text-gray-600 ${!isExpanded ? 'line-clamp-2 min-h-10 mt-1' : 'whitespace-normal'
                }`}
            >
              {ferramentasUsadas.join(', ')}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3 mt-4">
          <p>
            Setor: <span className="font-medium text-gray-700">{setor}</span>
          </p>
          <p>
            Atualizado em:{' '}
            <span className="font-medium text-gray-700">{dataFormatada}</span>
          </p>
        </div>
      </div>
    </div>
  );
}