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
  ShoppingCart,
  Receipt,
  Calculator,
  BarChart3,
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

    children: [
      {
        label: "Vendas",
        href: "/financeiro/vendas",
         icon: ShoppingCart,
      },

      {
        label: "Despesas",
        href: "/financeiro/despesas",
         icon: Receipt,
      },

      {
        label: "Calculadora",
        href: "/financeiro/calculadora",
         icon: Calculator,
      },

      {
        label: "Relatórios",
        href: "/financeiro/relatorios",
         icon: BarChart3,
      },
    ],
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
          style={{
            width: "180px",
            height: "auto",
          }}
        />


        <p className="mt-2 text-xs text-center uppercase tracking-widest text-orange-700">
          Sistema de Gestão
        </p>
      </div>

      <nav className="flex flex-col gap-1 p-3">
          {menu.map((item) => {

            if (item.children) {

              return (

                <div
                  key={item.label}
                  className="mt-4"
                >

                  <div className="px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">

                    {item.label}

                  </div>

                  <div className="mt-2 flex flex-col gap-1">

                    {item.children.map(
                      (child) => (

                        <Link
                          key={child.href}
                          href={child.href}
                          className={`
                            flex items-center gap-3
                            rounded-lg px-4 py-3 text-sm transition
                            ${
                              pathname === child.href
                                ? "bg-orange-200 text-orange-900 font-semibold"
                                : "hover:bg-slate-100"
                            }
                          `}
                        >
                          <child.icon size={20} />

                          <span>
                            {child.label}
                          </span>

                        </Link>

                      )
                    )}

                  </div>

                </div>

              );
            }

            return (

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
                <item.icon size={20} />

                <span>
                  {item.label}
                </span>

              </Link>

            );
          })}
      </nav>
    </aside>
  );
}