"use client";

import { useRouter } from "next/navigation";

export default function AddToCartButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();

  async function handleAdd() {
    await fetch("/api/products/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    router.refresh();

    alert("Added to cart");
  }

  return (
    <button
      onClick={handleAdd}
      className="rounded-xl bg-blue-600 px-6 py-3 text-white"
    >
      Add To Cart
    </button>
  );
}