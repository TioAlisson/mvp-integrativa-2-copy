'use client';

// 1. Importe o useState, o ícone e o Modal
import { useState } from 'react';
import { Plus } from 'lucide-react'; // ou o caminho para seu ícone


import Tabs from "./Tabs";
import TaskInfo from "./TaskInfo";
import type { Processo } from '@/types/processo';
import card from "../processos/card.json";
import NovoProcessoModal from '../NovoProcessoModal';

type SubcategoryType = { name: string; };
type MenuItemType = { name: string; subcategories: SubcategoryType[]; };

const menuItems: MenuItemType[] = [
  {
    name: 'Informática',
    subcategories: [{ name: 'Redes' }, { name: 'Dev' }],
  },
  {
    name: 'Administração',
    subcategories: [{ name: 'Gestão' }],
  },
];

export default function Processos() {
  // 3. Adicione o estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<string>(menuItems[0].name);
  const initialSubTab = menuItems[0]?.subcategories[0]?.name ?? null;
  const [activeSubTab, setActiveSubTab] = useState<string | null>(initialSubTab);

  const handleMainTabClick = (tabName: string) => {
    setActiveTab(tabName);
    const selectedTab = menuItems.find(item => item.name === tabName);
    if (selectedTab && selectedTab.subcategories && selectedTab.subcategories.length > 0) {
      setActiveSubTab(selectedTab.subcategories[0].name);
    } else {
      setActiveSubTab(null);
    }
  };

  const handleSubTabClick = (mainTabName: string, subTabName: string) => {
    setActiveTab(mainTabName);
    setActiveSubTab(subTabName);
  };

  const todosProcessos = card as Processo[];

  const processosFiltrados = todosProcessos.filter(processo => {
    return processo.setor === activeTab && processo.subCategoria === activeSubTab;
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Painel de Processos Administrativos</h1>
          <p className="text-zinc-500">
            Acompanhe todos os processos ativos, em análise, sugestões e obsoletos da sua equipe.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer hidden lg:flex justify-center w-fit uppercase font-semibold rounded-xl px-5 lg:px-8 py-3 border-2 border-secondary-500 shadow-[0_8px_0_0_#4274CC] transition-all ease-in-out duration-500 hover:shadow-[0_4px_0_0_#4274CC] hover:translate-y-2 gap-4 group"
        >
          <Plus width={20} className="group-hover:rotate-180 duration-700" />
          Cadastrar Novo Processo
        </button>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex mx-auto mb-8 justify-center lg:hidden w-fit uppercase font-semibold rounded-xl px-5 lg:px-8 py-3 border-2 border-secondary-500 shadow-[0_8px_0_0_#4274CC] transition-all ease-in-out duration-500 hover:shadow-[0_4px_0_0_#4274CC] hover:translate-y-2 gap-4 group"
      >
        <Plus width={20} className="group-hover:rotate-135 duration-700" />
        Cadastrar Novo Processo
      </button>

      <Tabs
        menuItems={menuItems}
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onMainTabClick={handleMainTabClick}
        onSubTabClick={handleSubTabClick}
      />

      <TaskInfo processos={processosFiltrados} />
      <NovoProcessoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}