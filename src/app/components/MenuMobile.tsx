'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Calendar from './icons/Calendar';
import GlobeWeb from './icons/GlobeWeb';
import { usePathname } from 'next/navigation';

interface MenuMobileProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MenuMobile({ isOpen, toggleMenu }: MenuMobileProps) {
  const menuItems = [
    { name: 'Dashboard', href: '/', icon: <Calendar /> },
    { name: 'Processos', href: '/processos', icon: <GlobeWeb /> },
    { name: 'Integrações', href: '/integracoes', icon: <Calendar /> },
  ];

  const toolItems = [
    { name: 'Settings', href: '/configuracoes', icon: <Calendar /> },
    { name: 'Logout', href: '/login', icon: <GlobeWeb /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggleMenu]);

  const baseLinkStyle = 'ps-4 py-2 transition-colors ease-in-out flex items-center gap-3 rounded-sm';
  const normalLinkStyle = 'hover:bg-secondary-500 hover:text-white';
  const activeLinkStyle = "bg-secondary-500 text-white";
  const sideTitle = "uppercase text-sm font-semibold text-gray-600"
  const sideCaption = "flex flex-col gap-4 ms-4 mt-4 pe-8"
   const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 right-0 ${isOpen ? 'bg-zinc-600/80 w-full h-dvh' : ''}`}
      onClick={() => toggleMenu()}
    >
      <div
        className={`absolute top-0 right-0 p-6 shadow-lg rounded-md z-40 h-dvh transition-all duration-500 ${isOpen ? 'menu menuOpen' : 'menu menuClosed'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 mt-10 pb-12">
          <nav>
            <div>
              <h2 className={sideTitle}>Menu</h2>
              <ul className={sideCaption}>
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`${baseLinkStyle} ${isActive ? activeLinkStyle : normalLinkStyle
                          }`}
                      >
                        {item.icon}
                        <p>{item.name}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className={sideTitle}>Tools</h2>
              <ul className={sideCaption}>
                {toolItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`${baseLinkStyle} ${isActive ? activeLinkStyle : normalLinkStyle
                          }`}
                      >
                        {item.icon}
                        <p>{item.name}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
