import Link from "next/link";

import ProductCard from "@/components/product/product-card";
import SearchBar from "@/components/product/search-bar";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const { category, search } =
    await searchParams;

  const categories = await prisma.product.findMany({
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
    select: {
      category: true,
    },
  });

  const products =
    await prisma.product.findMany({
      where: {
        ...(search
          ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
          : {}),
        ...(category
          ? {
              category,
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h1 className="text-5xl font-bold">
          All Products
        </h1>

        <p className="mt-4 text-muted-foreground">
          Browse premium products
          from trusted sellers.
        </p>
      </div>

      <div className="mb-10">
        <SearchBar
          category={category}
          defaultValue={search}
        />
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href={search ? `/products?search=${encodeURIComponent(search)}` : "/products"}
          className={cn(
            "rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-slate-100",
            !category && "bg-black text-white hover:bg-black"
          )}
        >
          All
        </Link>

        {categories.map((item) => {
          const params = new URLSearchParams();

          if (search) {
            params.set("search", search);
          }

          params.set("category", item.category);

          return (
            <Link
              key={item.category}
              href={`/products?${params.toString()}`}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-slate-100",
                category === item.category && "bg-black text-white hover:bg-black"
              )}
            >
              {item.category}
            </Link>
          );
        })}
      </div>

      {products.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                rating: 4.8,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h2 className="text-2xl font-bold">
            Product not found
          </h2>

          <p className="mt-3 text-muted-foreground">
            Try another keyword or category.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          >
            Reset Filter
          </Link>
        </div>
      )}
    </main>
  );
}
