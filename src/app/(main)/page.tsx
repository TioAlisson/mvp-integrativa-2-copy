import CardDash from "./CardDash";
import Insights from "./Insights";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-8 items-stretch">
        <div className="col-span-8">
          <div className="shadow-[1px_1px_10px_rgba(0,0,0,0.15)] rounded-xl p-6 border-t-8 bg-white border-secondary-500 mt-12 lg:mt-0 h-full">
            <h1 className="text-black font-semibold mb-6">Summary</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              <CardDash />
              <CardDash />
              <CardDash />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <Insights />
        </div>
      </div>
    </>
  );
}
