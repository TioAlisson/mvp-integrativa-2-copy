import Link from "next/link";
import useScreen from "../hooks/useScreen";
import Calendar from "./icons/Calendar";

interface NavProps {
  pathname: string;
}

export default function Nav({ pathname }: NavProps) {
  const data = new Date();

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const dayOfWeek = capitalizeFirst(
    data.toLocaleDateString('pt-BR', { weekday: 'long' })
  );
  const dayNumber = data.getDate();
  const month = capitalizeFirst(
    data.toLocaleDateString('pt-BR', { month: 'long' })
  );
  const year = data.getFullYear();

  const routeNameMap: Record<string, string> = {
    '/': 'Dashboard',
    '/processos': 'Processos',
    '/integracoes': 'Integrações',
    '/configuracoes': 'Configurações'
  };

  const currentPageTitle = routeNameMap[pathname] || 'Em construção...';
  const isLargeScreen = useScreen(410, 'min');

  return (
    <nav className="py-2 flex justify-between mb-12 mt-[72px] lg:mt-0">
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-1">{currentPageTitle}</h1>
        <p className={`text-gray-600 ${isLargeScreen ? "" : "text-[15px]"}`}>
          {dayOfWeek}, {dayNumber} de {month} {year}
        </p>
      </div>
      <div className="flex gap-4 sm:gap-5 items-center -z-10 lg:z-0">
        <div>
          <Link href="#" className="w-10 h-10 bg-white shadow-[1px_1px_10px_rgba(0,0,0,0.10)] rounded-full flex items-center justify-center font-semibold">
            <div className="relative">
              <Calendar width={18}/>
              <span className="absolute top-0 right-0 block bg-red-500 w-[5px] h-[5px] rounded-full mt-px -me-px"></span>
            </div>
          </Link>
        </div>
        <div>
          <p className="w-10 h-10 bg-white text-lg text-black shadow-[1px_1px_10px_rgba(0,0,0,0.10)] rounded-full flex items-center justify-center font-semibold">U</p>
        </div>
        <div className="hidden sm:block">
          <h2 className="font-semibold">User Testing</h2>
          <p className="text-gray-600">Admin</p>
        </div>
      </div>
    </nav>
  );
};