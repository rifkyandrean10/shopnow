import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
  }>;
}) {
  const { orderId } = await searchParams;

  const order = orderId
    ? await prisma.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    : null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-2xl border bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-600" />
        <h1 className="text-4xl font-bold">Pesanan berhasil dibuat</h1>
        <p className="mt-4 text-muted-foreground">
          Terima kasih. Pesananmu sedang diproses oleh seller.
        </p>

        {order && (
          <div className="mt-8 rounded-xl bg-gray-50 p-6 text-left">
            <div className="flex justify-between gap-6">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium">{order.id}</span>
            </div>

            <div className="mt-3 flex justify-between gap-6">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold">{formatPrice(order.total)}</span>
            </div>

            <div className="mt-6 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="rounded-xl border px-6 py-3 transition hover:bg-gray-50"
          >
            Belanja Lagi
          </Link>
          <Link
            href="/seller"
            className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Lihat Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
