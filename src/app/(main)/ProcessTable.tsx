import data from "./processos/card.json";

function StatusBadge({ status }: { status: string }) {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full text-white";

  const statusClasses: Record<string, string> = {
    "Ativo": "bg-green-500",
    "Em Análise": "bg-yellow-500",
    "Obsoleto": "bg-gray-500",
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status] || "bg-gray-400"}`}>
      {status}
    </span>
  );
}

function formatarData(dataString: string) {
  const data = new Date(dataString);
  if (isNaN(data.getTime())) return dataString; // caso venha em formato inválido
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export default function ProcessTable() {
  const headers = ["Setor", "Categoria", "Título", "Responsável", "Atualizado", "Status"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-5">Lista de Processos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((processo) => (
              <tr key={processo.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{processo.setor}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{processo.subCategoria}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{processo.titulo}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{processo.responsavel}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {formatarData(processo.ultimaAtualizacao)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  <StatusBadge status={processo.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
