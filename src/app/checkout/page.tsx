import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { checkout } from "@/lib/actions";
import { formatPrice } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function CheckoutPage() {
  const items = await prisma.cartItem.findMany({
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <ShoppingBag className="mx-auto mb-6 h-14 w-14 text-gray-400" />
        <h1 className="text-4xl font-bold">Keranjang masih kosong</h1>
        <p className="mt-4 text-muted-foreground">
          Tambahkan produk ke keranjang sebelum checkout.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          Lihat Produk
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Checkout</h1>
        <p className="mt-4 text-muted-foreground">
          Lengkapi data pengiriman untuk membuat pesanan.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <form
          action={checkout}
          className="space-y-6 rounded-2xl border bg-white p-8 lg:col-span-2"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Nama lengkap</span>
              <input
                name="customerName"
                required
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                placeholder="Nama penerima"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                name="customerEmail"
                required
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                placeholder="email@example.com"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Nomor telepon</span>
            <input
              name="phone"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              placeholder="08xxxxxxxxxx"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Alamat pengiriman</span>
            <textarea
              name="address"
              required
              rows={5}
              className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-black"
              placeholder="Nama jalan, nomor rumah, kota, kode pos"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Metode pembayaran</span>
            <select
              name="paymentMethod"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              defaultValue="COD"
            >
              <option value="COD">Bayar di tempat</option>
              <option value="BANK_TRANSFER">Transfer bank</option>
              <option value="EWALLET">E-wallet</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
          >
            Buat Pesanan
          </button>
        </form>

        <aside className="h-fit rounded-2xl border bg-white p-8">
          <h2 className="text-2xl font-bold">Ringkasan Pesanan</h2>

          <div className="mt-6 space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.quantity} x {formatPrice(item.product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
