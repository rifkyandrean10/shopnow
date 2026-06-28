import ProductCard from "@/components/product/product-card";
import { prisma } from "@/lib/prisma";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-bold">
              Featured Products
            </h2>

            <p className="mt-3 text-muted-foreground">
              Most loved products this month
            </p>
          </div>
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
      </div>
    </section>
  );
}
