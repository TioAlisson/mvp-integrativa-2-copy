'use client';

import { useState } from 'react';

import Tabs from "./Tabs";
import TaskInfo from "./TaskInfo";
import type { Processo } from '@/types/processo';
import card from "../processos/card.json";


type SubcategoryType = { name: string; };
type MenuItemType = { name: string; subcategories: SubcategoryType[]; };

const menuItems: MenuItemType[] = [
  {
    name: 'Informática',
    subcategories: [
      { name: 'Redes' },
      { name: 'Dev' }
    ],
  },
  {
    name: 'Administração',
    subcategories: [
      { name: 'Gestão' }
    ],
  },
];


export default function Processos() {
  const [activeTab, setActiveTab] = useState<string>(menuItems[0].name);
  const initialSubTab = menuItems[0]?.subcategories[0]?.name ?? null;
  const [activeSubTab, setActiveSubTab] = useState<string | null>(initialSubTab);

  // Esta função continua a mesma
  // Ela é chamada ao clicar na ABA PRINCIPAL (ex: "Informática")
  const handleMainTabClick = (tabName: string) => {
    setActiveTab(tabName);
    const selectedTab = menuItems.find(item => item.name === tabName);

    // Define a sub-aba como a primeira da lista automaticamente
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
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">Painel de Processos Administrativos</h1>
      <p className="text-zinc-500 mb-6">
        Acompanhe todos os processos ativos, em análise, sugestões e obsoletos da sua equipe.
      </p>
      
      <Tabs
        menuItems={menuItems}
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onMainTabClick={handleMainTabClick}
        onSubTabClick={handleSubTabClick} 
      />
      <TaskInfo processos={processosFiltrados} />
    </>
  );
}