"use client";

import { useRouter } from "next/navigation";

interface Props {
  id: string;
  quantity: number;
}

export default function CartActions({
  id,
  quantity,
}: Props) {
  const router = useRouter();

  async function update(qty: number) {
    if (qty < 1) return;

    await fetch(`/api/products/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: qty,
      }),
    });

    router.refresh();
  }

  async function remove() {
    await fetch(`/api/products/cart/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={() => update(quantity - 1)}
        className="h-10 w-10 rounded-lg border"
      >
        -
      </button>

      <span className="w-8 text-center font-bold">
        {quantity}
      </span>

      <button
        onClick={() => update(quantity + 1)}
        className="h-10 w-10 rounded-lg border"
      >
        +
      </button>

      <button
        onClick={remove}
        className="ml-6 rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        Remove
      </button>
    </div>
  );
}