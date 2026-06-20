"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const menus = [
  {
    name: "Dashboard",
    href: "/seller",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/seller/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/seller/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/seller/customers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/seller/settings",
    icon: Settings,
  },
];

function SidebarContent() {
  return (
    <>
      <h2 className="mb-10 text-2xl font-bold">
        ShopNow
      </h2>

      <nav className="space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-100"
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-72 border-r bg-white p-6 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="rounded-xl border bg-white p-3 shadow">
              <Menu size={20} />
            </button>
          </SheetTrigger>

          <SheetContent side="left">
            <div className="mt-8">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}