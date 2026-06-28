import { prisma } from "@/lib/prisma";
import CartActions from "@/components/cart/cart-actions";
import Link from "next/link";

export default async function CartPage() {
  const items = await prisma.cartItem.findMany({
    include: {
      product: true,
    },
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-6xl p-10">
      <h1 className="mb-10 text-5xl font-bold">
        Shopping Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 rounded-3xl border p-6"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-40 w-40 rounded-2xl object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {item.product.description}
                  </p>

                  <p className="mt-4 text-xl font-semibold text-blue-600">
                    Rp{" "}
                    {item.product.price.toLocaleString()}
                  </p>
                </div>

                <CartActions
                  id={item.id}
                  quantity={item.quantity}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-3xl border p-8">
          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between">
            <span>Items</span>
            <span>{items.length}</span>
          </div>

          <div className="mt-4 flex justify-between">
            <span>Total</span>

            <span className="font-bold text-blue-600">
              Rp {total.toLocaleString()}
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-8 block w-full rounded-xl bg-black py-4 text-center text-white transition hover:bg-gray-800"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
