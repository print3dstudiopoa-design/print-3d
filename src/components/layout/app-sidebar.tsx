"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menu = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Produtos",
    href: "/produtos",
  },
  {
    label: "Pessoas",
    href: "/pessoas",
  },
  {
    label: "Encomendas",
    href: "/encomendas",
  },
  {
    label: "Financeiro",
    href: "/financeiro",
  },
  {
    label: "Ideias",
    href: "/ideias",
  },
  {
    label: "Configurações",
    href: "/configuracoes",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r bg-white">
      <div className="border-b p-4">
        <Image
          src="/branding/logo-print3d.png"
          alt="PRInt 3D"
          width={180}
          height={70}
          priority
        />


        <p className="mt-2 text-xs text-center text-slate-500">
          Sistema de Gestão
        </p>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-4 py-3 text-sm transition ${
              pathname === item.href
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}