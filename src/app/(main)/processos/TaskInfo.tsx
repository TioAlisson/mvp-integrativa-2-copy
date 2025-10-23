// TaskInfo.tsx
'use client';

import ProcessCard from "./TaskCard";
import type { Processo } from '@/types/processo';
import { useState } from 'react'; // Este useState é para o accordion

// 1. REMOVIDO: import card from "../processos/card.json";

// 2. Interface de Props para receber a lista filtrada
interface TaskInfoProps {
  processos: Processo[];
}

// 3. Recebe 'processos' como prop
export default function TaskInfo({ processos }: TaskInfoProps) {
  // 4. REMOVIDO: const processos = card as Processo[];

  // 5. Este estado é local e correto. Controla o accordion.
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedCardId(prevId => (prevId === id ? null : id));
  };

  // 6. Mensagem para quando a lista estiver vazia
  if (processos.length === 0) {
    return (
      <div className="grid grid-cols-12 gap-8 mt-16 items-start">
        <p className="col-span-12 text-center text-gray-500 py-10">
          Nenhum processo encontrado para esta seleção.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 ls:gap-8 mt-16">
      {processos.map((processo) => (
        <div key={processo.id} className="col-span-12 md:col-span-6 lg:col-span-4">
          <ProcessCard
            processo={processo}
            isExpanded={processo.id === expandedCardId}
            onToggleExpand={() => handleToggleExpand(processo.id)}
          />
        </div>
      ))}
    </div>
  );
}