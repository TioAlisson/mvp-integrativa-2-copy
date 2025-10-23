import IntegrationCardInfo from "./IntegrationCardInfo";

export default function Integracoes() {
  return (
    <>
     <h1 className="text-3xl font-bold text-zinc-900 mb-2">Integrações disponíveis</h1>
      <p className="text-zinc-500 mb-6">
        Visualize e conecte-se com suas ferramentas favoritas para agilizar seu fluxo de trabalho.
      </p>
      <IntegrationCardInfo />
    </>
  );
}