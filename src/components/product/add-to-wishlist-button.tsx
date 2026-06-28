"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddToWishlistButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();

  async function handleWishlist() {
    await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    router.refresh();

    alert("Added to wishlist");
  }

  return (
    <button
      onClick={handleWishlist}
      className="rounded-xl border px-6 py-3 transition hover:bg-red-50"
    >
      <Heart className="inline mr-2" size={18} />
      Wishlist
    </button>
  );
}