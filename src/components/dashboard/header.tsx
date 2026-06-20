"use client";

import { Bell, Search } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";

export default function DashboardHeader() {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back, Seller 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-xl border bg-white px-4 py-2 md:flex">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>

        <ThemeToggle />

        <button className="rounded-xl border bg-white p-3 transition hover:bg-slate-100">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}