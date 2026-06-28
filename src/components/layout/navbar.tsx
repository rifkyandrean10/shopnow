import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Navbar() {
  const cartCount = await prisma.cartItem.count();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-3xl font-bold"
        >
          ShopNow
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/">Home</Link>

          <Link href="/products">
            Products
          </Link>

          <Link href="/wishlist">
            Wishlist
          </Link>

          <Link
            href="/cart"
            className="relative"
          >
            <ShoppingCart size={26} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}