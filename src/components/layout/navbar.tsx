// src/components/layout/navbar.tsx
"use client";

import Link from "next/link"; // Diperbaiki: dari "next/link"
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">ShopNow</span>
        </Link>

        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden sm:inline-block">
                Halo, {session.user?.name || session.user?.email}
              </span>
              {(session.user as any)?.role === "SELLER" && (
                <Link href="/seller">
                  <Button variant="outline" size="sm">Dasbor Penjual</Button>
                </Link>
              )}
              <Button onClick={() => signOut()} variant="destructive" size="sm">
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => signIn()} size="sm">
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}