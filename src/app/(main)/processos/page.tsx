import { getProcessos, getCategorias } from '@/lib/queries/processos'
import ProcessosClient from './ProcessosClient'

// Server Component - Busca os dados
export default async function ProcessosPage() {
  try {
    // Busca os processos e categorias do banco em paralelo
    const [processos, categorias] = await Promise.all([
      getProcessos(),
      getCategorias()
    ])

    // Verifica se os dados foram carregados
    if (!categorias || categorias.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Erro ao Carregar Categorias
            </h2>
            <p className="text-gray-600 mb-4">
              Não foi possível carregar as categorias do banco de dados.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Verifique se:
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li>✓ As tabelas  existem</li>
              <li>✓ Há dados inseridos nessas tabelas</li>
              <li>✓ As variáveis de ambiente estão configuradas</li>
            </ul>
          </div>
        </div>
      )
    }

    // Passa os dados para o Client Component
    return <ProcessosClient processos={processos} categorias={categorias} />
  } catch (error) {
    console.error('Erro ao carregar página de processos:', error)
    
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao Carregar Dados
          </h2>
          <p className="text-gray-600 mb-4">
            Ocorreu um erro ao buscar os dados do banco.
          </p>
          <pre className="text-xs text-left bg-gray-100 p-4 rounded overflow-auto">
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </pre>
        </div>
      </div>
    )
  }
}

// Opcional: Configuração de cache/revalidação
export const revalidate = 0 // Desabilita cache para sempre buscar dados frescos