import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import ProductCard from "@/components/product/product-card";
import AddToCartButton from "@/components/product/add-to-cart-button";
import AddToWishlistButton from "@/components/product/add-to-wishlist-button";

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts =
    await prisma.product.findMany({
      where: {
        NOT: {
          id: product.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-14 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-[32px] border shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div>
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          <p className="text-sm text-gray-400">
            Product ID
          </p>

          <p className="mb-6 font-mono text-sm">
            {product.id}
          </p>

          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-semibold">
              4.8
            </span>

            <span className="text-gray-500">
              (124 Reviews)
            </span>
          </div>

          <p className="mt-6 text-4xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </p>

          <p className="mt-8 leading-8 text-gray-600">
            {product.description}
          </p>

          <div className="mt-8">
            <span className="rounded-full bg-slate-100 px-5 py-2">
              Stock : {product.stock}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-4">
            <AddToCartButton
              productId={product.id}
            />

            <AddToWishlistButton
              productId={product.id}
            />
          </div>

          {/* Features */}
          <div className="mt-12 rounded-3xl border p-6">
            <div className="space-y-4">
              <div>
                🚚 Free Shipping
              </div>

              <div>
                🔒 Secure Checkout
              </div>

              <div>
                ↩️ 30-Day Return Policy
              </div>

              <div>
                ⭐ Premium Quality
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}

      <section className="mt-24">
        <h2 className="mb-8 text-3xl font-bold">
          Related Products
        </h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map(
            (item) => (
              <ProductCard
                key={item.id}
                product={{
                  ...item,
                  rating: 4.8,
                }}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}