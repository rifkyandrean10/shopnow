import ProductCard from "@/components/product/product-card";
import SearchBar from "@/components/product/search-bar";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const { search } =
    await searchParams;

  const products =
    await prisma.product.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},
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
        <SearchBar />
      </div>

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
    </main>
  );
}