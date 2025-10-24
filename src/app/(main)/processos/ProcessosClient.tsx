'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Processo } from '@/types/processo';
import { Categoria } from '@/lib/queries/processos';
import Tabs from "./Tabs";
import TaskInfo from "./TaskInfo";
import NovoProcessoModal from './NewProcessoModal';


type SubcategoryType = { name: string; };
type MenuItemType = { name: string; subcategories: SubcategoryType[]; };

interface ProcessosClientProps {
  processos: Processo[];
  categorias: Categoria[];
}

export default function ProcessosClient({ processos, categorias }: ProcessosClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processoParaEditar, setProcessoParaEditar] = useState<Processo | null>(null);

  // Converte categorias do banco para o formato esperado pelo Tabs
  // Adiciona validação para evitar erro se categorias for undefined
  const menuItems: MenuItemType[] = useMemo(() => {
    if (!categorias || categorias.length === 0) {
      return [];
    }
    
    return categorias.map(categoria => ({
      name: categoria.name,
      subcategories: (categoria.subcategorias || []).map(sub => ({ 
        name: sub.name 
      }))
    }));
  }, [categorias]);

  const [activeTab, setActiveTab] = useState<string>(
    menuItems[0]?.name || 'Informática'
  );
  
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

  // Filtra processos baseado na aba ativa
  const processosFiltrados = useMemo(() => {
    return processos.filter(processo => {
      return processo.setor === activeTab && processo.subCategoria === activeSubTab;
    });
  }, [processos, activeTab, activeSubTab]);

  // Handlers para abrir modal em modo criar/editar
  const handleNovoProcesso = () => {
    setProcessoParaEditar(null);
    setIsModalOpen(true);
  };

  const handleEditarProcesso = (processo: Processo) => {
    setProcessoParaEditar(processo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProcessoParaEditar(null);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">
            Painel de Processos Administrativos
          </h1>
          <p className="text-zinc-500">
            Acompanhe todos os processos ativos, em análise, sugestões e obsoletos da sua equipe.
          </p>
        </div>
        <button
          onClick={handleNovoProcesso}
          className="cursor-pointer hidden lg:flex justify-center w-fit uppercase font-semibold rounded-xl px-5 lg:px-8 py-3 border-2 border-secondary-500 shadow-[0_8px_0_0_#4274CC] transition-all ease-in-out duration-500 hover:shadow-[0_4px_0_0_#4274CC] hover:translate-y-2 gap-4 group"
        >
          <Plus width={20} className="group-hover:rotate-180 duration-700" />
          Cadastrar Novo Processo
        </button>
      </div>

      <button
        onClick={handleNovoProcesso}
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

      <TaskInfo 
        processos={processosFiltrados} 
        onEdit={handleEditarProcesso}
      />
      
      <NovoProcessoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        categorias={categorias}
        processoParaEditar={processoParaEditar}
      />
    </>
  );
}