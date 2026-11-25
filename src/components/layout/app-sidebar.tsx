"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  DollarSign,
  Lightbulb,
  Settings,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },

  {
    label: "Produtos",
    href: "/produtos",
    icon: Package,
  },

  {
    label: "Pessoas",
    href: "/pessoas",
    icon: Users,
  },

  {
    label: "Encomendas",
    href: "/encomendas",
    icon: ClipboardList,
  },

  {
    label: "Financeiro",
    href: "/financeiro",
    icon: DollarSign,
  },

  {
    label: "Ideias",
    href: "/ideias",
    icon: Lightbulb,
  },

  {
    label: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-4">
        <Image
          src="/branding/logo-print3d.png"
          alt="PRInt 3D"
          width={180}
          height={70}
          priority
        />


        <p className="mt-2 text-xs text-center uppercase tracking-widest text-orange-700">
          Sistema de Gestão
        </p>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        {menu.map((item) => (
          <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3
                rounded-lg px-4 py-3 text-sm transition
                ${
                  pathname === item.href
                    ? "bg-orange-200 text-orange-900 font-semibold"
                    : "hover:bg-slate-100"
                }
              `}
            >
              <item.icon size={22} />

              <span>
                {item.label}
              </span>

            </Link>

        ))}
      </nav>
    </aside>
  );
}