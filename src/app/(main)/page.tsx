import CardDash from "./CardDash";;
import Insights from "./Insights";
import MappedProcessesChart from "./MappedProcessesChart";
import ProcessHealthChart from "./ProcessHealthChart";
import ProcessTable from "./ProcessTable";


export default function Home() {

  const cards = [
    {
      id: 1,
      titulo: 'Total de Processos',
      valor: 128,
    },
    {
      id: 2,
      titulo: 'Quantidade de Funcionários',
      valor: 34,
    },
    {
      id: 3,
      titulo: 'Novos Processos',
      valor: 12,
    },

  ];

  return (
    <>
      <div className="grid grid-cols-12 lg:gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="shadow-[1px_1px_10px_rgba(0,0,0,0.15)] rounded-xl p-6 border-t-8 bg-white border-secondary-500 mt-12 lg:mt-0 min-h-[260px]">
            <h1 className="text-black font-semibold mb-6">Summary</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card) => (
                <CardDash
                  key={card.id}
                  titulo={card.titulo}
                  valor={card.valor}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Insights />
        </div>
      </div>
      <div className="grid grid-cols-12 mt-10 lg:gap-8">
        <div className="col-span-12 lg:col-span-6">
          <ProcessHealthChart />
        </div>
        <div className="col-span-12 lg:col-span-6 mt-5 lg:mt-0">
          <MappedProcessesChart />
        </div>
      </div>
      <div className="mt-8">
        <ProcessTable />
      </div>
    </>
  );
}
