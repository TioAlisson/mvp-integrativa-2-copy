import React from "react";

export interface CardDashProps {
  id?: number; 
  titulo: string;
  valor: number;
  cor?: string;
  variacao?: string;
  periodo?: string; 
}

export default function CardDash({
  titulo,
  valor,
  variacao = "up 1.2%",
  periodo = "Este mês",
}: CardDashProps) {
  return (
    <div
      className={`shadow-[1px_1px_10px_rgba(0,0,0,0.15)] rounded-md px-8 py-7 h-full flex flex-col justify-between duration-200`}
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-gray-700 text-sm font-medium">{titulo}</h2>
          <h3 className="text-2xl font-semibold text-gray-900">{valor}</h3>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-green-500 text-sm font-medium">{variacao}</span>
        <p className="text-gray-500 text-xs">{periodo}</p>
      </div>
    </div>
  );
}
