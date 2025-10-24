// TaskInfo.tsx
'use client';

import ProcessCard from "./TaskCard";
import type { Processo } from '@/types/processo';
import { useState } from 'react';

interface TaskInfoProps {
  processos: Processo[];
}

export default function TaskInfo({ processos }: TaskInfoProps) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedCardId(prevId => (prevId === id ? null : id));
  };

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