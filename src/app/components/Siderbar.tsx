'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Calendar from './icons/Calendar';
import GlobeWeb from './icons/GlobeWeb';
import Image from 'next/image';
import Logo from "../../../public/logo.png"

const menuItems = [
    { name: 'Dashboard', href: '/', icon: <Calendar /> },
    { name: 'Processos', href: '/processos', icon: <GlobeWeb /> },
    { name: 'Integrações', href: '/integracoes', icon: <Calendar /> },
];

const toolItems = [
    { name: 'Settings', href: '/configuracoes', icon: <Calendar /> },
    { name: 'Logout', href: '/login', icon: <GlobeWeb /> },
];

const baseLinkStyle = 'ps-4 py-2 transition-colors ease-in-out flex items-center gap-3 rounded-sm';
const normalLinkStyle = 'hover:bg-secondary-500 hover:text-white';
const activeLinkStyle = "bg-secondary-500 text-white";
const sideTitle = "uppercase text-sm font-semibold text-gray-600"
const sideCaption = "flex flex-col gap-4 ms-4 mt-4"

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:block h-screen bg-white pt-6 sticky top-0 left-0">
            <div className="ps-6 ">
                <div className="flex gap-2">
                    <Image src={Logo} alt="Logo" width={50} />
                    <h1>Empresa</h1>
                </div>
                <div className="my-8">
                    <h2 className="font-semibold text-2xl">Welcome, <span className="font-bold">Empresa</span></h2>
                    <p>Here your overview</p>
                </div>
            </div>
            <span className="border w-full block mb-8"></span>
            <nav className="ps-6 pe-8">
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
    );
}