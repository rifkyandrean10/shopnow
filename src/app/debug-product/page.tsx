import { prisma } from "@/lib/prisma";

export default async function DebugProduct() {
  const products = await prisma.product.findMany();

  const product = await prisma.product.findFirst({
    where: {
      id: products[0]?.id,
    },
  });

  return (
    <pre>
      {JSON.stringify(
        {
          firstId: products[0]?.id,
          found: product,
        },
        null,
        2
      )}
    </pre>
  );
}