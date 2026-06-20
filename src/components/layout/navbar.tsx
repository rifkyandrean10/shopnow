import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-black" />

          <div>
            <h1 className="text-xl font-bold">
              ShopNow
            </h1>

            <p className="text-xs text-muted-foreground">
              Premium Store
            </p>
          </div>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="font-medium transition hover:text-blue-600"
          >
            Products
          </a>

          <a
            href="#"
            className="font-medium transition hover:text-blue-600"
          >
            Categories
          </a>

          <a
            href="#"
            className="font-medium transition hover:text-blue-600"
          >
            Deals
          </a>
        </nav>

        {/* Search */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 py-2 shadow-sm">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search products..."
              className="w-64 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Heart
            size={22}
            className="cursor-pointer transition hover:scale-110"
          />

          <ShoppingCart
            size={22}
            className="cursor-pointer transition hover:scale-110"
          />

          <User
            size={22}
            className="cursor-pointer transition hover:scale-110"
          />

          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}