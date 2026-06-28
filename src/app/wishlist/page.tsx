import Link from "next/link";
import { Heart } from "lucide-react";

import ProductCard from "@/components/product/product-card";
import RemoveWishlistButton from "@/components/wishlist/remove-wishlist-button";
import { prisma } from "@/lib/prisma";

export default async function WishlistPage() {
  const items = await prisma.wishlist.findMany({
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h1 className="text-5xl font-bold">
          Wishlist
        </h1>

        <p className="mt-4 text-muted-foreground">
          Products you saved for later.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.id}>
              <ProductCard
                product={{
                  ...item.product,
                  rating: 4.8,
                }}
              />

              <RemoveWishlistButton id={item.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <Heart className="mx-auto mb-5 h-12 w-12 text-gray-400" />
          <h2 className="text-2xl font-bold">
            Wishlist masih kosong
          </h2>

          <p className="mt-3 text-muted-foreground">
            Simpan produk favoritmu agar mudah ditemukan lagi.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          >
            Lihat Produk
          </Link>
        </div>
      )}
    </main>
  );
}
