import Plus from "@/app/components/icons/Plus";
import Link from "next/link";

export default function Configuracoes() {

  const user = [
    { label: "Full Name", value: "User Testing" },
    { label: "Email", value: "userTesting@gmail.com" },
    { label: "Phone", value: "49999616212" }
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">Configurações da Conta</h1>
      <p className="text-zinc-500 mb-6">
        Gerencie suas informações pessoais, foto de perfil, preferências e notificações.
      </p>
      <div className="mt-10 lg:w-[65%] bg-gray-50 p-6 lg:p-12 shadow-[1px_1px_10px_rgba(0,0,0,0.10)] rounded-xl">
        <div className="flex-col sm:flex-row flex items-center gap-6 sm:gap-20 lg:gap-10">
          <p className="w-20 h-20 lg:w-24 lg:h-24 bg-white text-3xl lg:text-5xl text-black shadow-[1px_1px_10px_rgba(0,0,0,0.10)] rounded-full flex items-center justify-center font-semibold">U</p>
          <div className="flex flex-col">
            <Link
              href="#"
              className="font-semibold text-lg border border-black/30 rounded-xl px-6 py-2 transition duration-500 ease-in-out
            hover:bg-black/90 hover:text-white w-fit mx-auto sm:mx-0">
              Upload new photo
            </Link>
            <p className="mt-6 text-gray-600 text-center sm:text-base sm:text-start text-lg">At least 800x800 px recommended. <br />JPG or PNG is allowed</p>
          </div>
        </div>
        <div className="mt-20 shadow-[1px_1px_10px_rgba(0,0,0,0.15)] rounded-xl p-5 sm:p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <Link href="#" className="font-semibold border border-black/30 rounded-md px-4 py-2 flex gap-2 group">
              <Plus width={14} className="group-hover:rotate-135 duration-700" />
              Edit
            </Link>
          </div>
          <div className="flex-col gap-4 sm:gap-0 sm:flex-row flex justify-between mt-8">
            {user.map((item, index) => (
              <div key={index}>
                <h3 className="text-gray-600">{item.label}</h3>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <span className="block w-full h-1 bg-black/10 mt-8 mb-9 rounded-4xl"></span>
        <div className="shadow-[1px_1px_10px_rgba(0,0,0,0.15)] rounded-xl p-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-8">Preferências</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-5 sm:items-center">
            <div>
              <h3 className="font-semibold">Notificações por Email</h3>
              <p className="text-gray-500">Receba atualizações sobre processos</p>
            </div>
            <Link href="#" className="font-semibold border border-black/30 rounded-md px-4 py-2 flex gap-2 group
            transition duration-500 ease-in-out hover:bg-black/90 hover:text-white w-fit">
              Configurar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}