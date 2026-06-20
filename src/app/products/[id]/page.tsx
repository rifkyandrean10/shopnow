import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-3xl border"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6">
            Stock: {product.stock}
          </div>
        </div>
      </div>
    </main>
  );
}