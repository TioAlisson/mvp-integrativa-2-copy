export default function CardDash() {
  return (
    <div className="shadow-[1px_1px_10px_rgba(0,0,0,0.15)] rounded-md px-4 py-2 h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2>Total Sales</h2>
          <h3>200</h3>
        </div>
        <div>
          <span className="text-green-500">up 1.2%</span>
          <p>This Month</p>
        </div>
      </div>
    </div>
  );
}
