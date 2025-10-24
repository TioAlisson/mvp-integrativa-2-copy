import { createClient } from '@/lib/supabase/server'
import { Processo, ProcessoFromDB } from '@/types/processo'

// Tipos para a estrutura de categorias
export interface Categoria {
  id: number
  name: string
  subcategorias: Subcategoria[]
}

export interface Subcategoria {
  id: number
  name: string
  categoria_id: number
}

/**
 * BUSCA TODAS AS CATEGORIAS COM SUAS SUBCATEGORIAS
 * Útil para montar menus e filtros dinamicamente
 */
export async function getCategorias(): Promise<Categoria[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categorias')
    .select(`
      id,
      name,
      subcategorias (
        id,
        name,
        categoria_id
      )
    `)
    .order('name', { ascending: true })

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    throw new Error('Falha ao carregar categorias')
  }

  return data as Categoria[]
}

/**
 * BUSCA TODOS OS PROCESSOS COM JOIN
 * 
 * A query usa o padrão de relacionamentos do Supabase:
 * - `subcategorias(name, categorias(name))` faz o JOIN automático
 * - Retorna dados aninhados que precisamos transformar
 */
export async function getProcessos(): Promise<Processo[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('processos')
    .select(`
      id,
      created_at,
      titulo,
      descricao,
      status,
      responsavel,
      ultima_atualizacao,
      ferramentas_usadas,
      passo_a_passo,
      subcategoria_id,
      subcategorias!inner (
        id,
        name,
        categorias!inner (
          id,
          name
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar processos:', error)
    throw new Error('Falha ao carregar processos')
  }

  if (!data) return []

  // Transforma os dados do DB para o formato do front-end
  return data.map((item) => mapProcessoFromDB(item as unknown as ProcessoFromDB))
}

/**
 * BUSCA UM PROCESSO POR ID
 */
export async function getProcessoById(id: string): Promise<Processo | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('processos')
    .select(`
      id,
      created_at,
      titulo,
      descricao,
      status,
      responsavel,
      ultima_atualizacao,
      ferramentas_usadas,
      passo_a_passo,
      subcategoria_id,
      subcategorias!inner (
        id,
        name,
        categorias!inner (
          id,
          name
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar processo:', error)
    return null
  }

  if (!data) return null

  return mapProcessoFromDB(data as unknown as ProcessoFromDB)
}

/**
 * FUNÇÃO DE MAPEAMENTO/TRANSFORMAÇÃO
 * 
 * Converte os dados aninhados do Supabase para a interface plana do front-end
 */
function mapProcessoFromDB(dbData: ProcessoFromDB): Processo {
  // Validação de segurança para dados relacionados
  if (!dbData.subcategorias) {
    throw new Error(`Processo ${dbData.id} não tem subcategoria vinculada`)
  }

  if (!dbData.subcategorias.categorias) {
    throw new Error(`Subcategoria ${dbData.subcategorias.name} não tem categoria vinculada`)
  }

  return {
    id: dbData.id,
    titulo: dbData.titulo,
    descricao: dbData.descricao || '',
    subCategoria: dbData.subcategorias.name,
    status: (dbData.status || '') as Processo['status'],
    responsavel: dbData.responsavel || '',
    ultimaAtualizacao: dbData.ultima_atualizacao || dbData.created_at,
    setor: dbData.subcategorias.categorias.name, // JOIN através do relacionamento!
    ferramentasUsadas: dbData.ferramentas_usadas || [],
    passoAPasso: Array.isArray(dbData.passo_a_passo) 
      ? dbData.passo_a_passo 
      : [],
    // Campos opcionais - você pode adicionar lógica aqui se necessário
    preRequisitos: undefined,
    linksUteis: undefined,
    palavrasChave: undefined,
    publicoAlvo: undefined,
  }
}