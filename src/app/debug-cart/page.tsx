import { prisma } from "@/lib/prisma";

export default async function DebugCart() {
  const items = await prisma.cartItem.findMany({
    include: {
      product: true,
    },
  });

  return (
    <pre>
      {JSON.stringify(items, null, 2)}
    </pre>
  );
}