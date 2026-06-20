import { prisma } from "@/lib/prisma";

export default async function Page() {
  const products =
    await prisma.product.findMany();

  const first = products[0];

  const byId =
    await prisma.product.findUnique({
      where: {
        id: first.id,
      },
    });

  return (
    <pre>
      {JSON.stringify(
        {
          first,
          byId,
        },
        null,
        2
      )}
    </pre>
  );
}