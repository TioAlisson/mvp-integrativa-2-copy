"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "../components/Siderbar";
import Nav from "../components/Nav";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (

    <main className="grid grid-cols-12">
      <aside className="col-span-2">
        <Sidebar />
      </aside>
      <div className="col-span-12 lg:col-span-10 p-6">
        <Nav pathname={pathname ?? "/"} />
        {children}
      </div>
    </main>
  );
}
